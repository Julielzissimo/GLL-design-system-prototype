import { useState, type ChangeEvent, type FormEvent } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as Tabs from '@radix-ui/react-tabs'
import { Alert, Button, Dialog, EmptyState, Field, Input, PageHeader, Select, StatusBadge, Surface, Textarea } from '../design-system/components'
import { CreatorTag } from '../design-system/CreatorTag'
import { ArrowLeft, ArrowRight, FileText } from '../design-system/icons'
import { creatorAvatar, money, type Bid, type BidAttachment, type BidDocument, type BidFailure, type BidStatus, type Budget } from '../data/demo'
import { QuotationItemsPanel } from './QuotationItemsPanel'
import './bid-pages.css'

const statuses: BidStatus[] = ['Em análise', 'Descartada', 'Aprovada', 'Faturado', 'Desclassificado', 'Disputada']
const transitions: Record<BidStatus, BidStatus[]> = {
  'Em análise': ['Descartada', 'Aprovada', 'Desclassificado', 'Disputada'],
  'Descartada': ['Em análise', 'Disputada'],
  'Aprovada': ['Em análise', 'Faturado', 'Desclassificado', 'Disputada'],
  'Faturado': ['Aprovada'],
  'Desclassificado': ['Em análise', 'Disputada'],
  'Disputada': ['Em análise', 'Descartada', 'Aprovada', 'Desclassificado'],
}
const schema = z.object({
  edital: z.string().trim().min(1, 'Preencha o N° do Edital.'),
  orgao: z.string().trim().min(1, 'Preencha o Órgão Comprador.'),
  sessionDatetime: z.string().min(1, 'Preencha a Data e Hora da Sessão.'),
  proposalDeadline: z.string(), deliveryPlace: z.string(), publicSessionLink: z.string().refine((value) => !value || /^https?:\/\//i.test(value) && URL.canParse(value), 'Informe um link HTTP ou HTTPS válido.'),
  bidType: z.string().refine((value) => ['Pregão eletrônico', 'Dispensa'].includes(value), 'Selecione Pregão Eletrônico ou Dispensa.'),
  status: z.enum(statuses as [BidStatus, ...BidStatus[]]), statusReason: z.string(), hasGuaranteeDeposit: z.boolean(),
})
type BidFields = z.infer<typeof schema>
type Props = {
  bid?: Bid; bids: Bid[]; budgets: Budget[]; onSave: (bid: Bid) => void; onPatch: (id: string, patch: Partial<Bid>) => void;
  onDelete: (id: string) => void; onCreateBudget: (id: string) => string;
  onBack: () => void; onNew: () => void; onNotify: (message: string) => void;
}
const nextId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`
const dateTimeValue = (bid?: Bid) => bid ? `${bid.sessao}T${bid.sessionTime ?? '09:00'}` : ''

export function BidWorkspace({ bid, bids, budgets, onSave, onPatch, onDelete, onCreateBudget, onBack, onNew, onNotify }: Props) {
  const [attachments, setAttachments] = useState<BidAttachment[]>(bid?.attachments ?? [])
  const [attachmentError, setAttachmentError] = useState('')
  const [quotationId, setQuotationId] = useState(bid?.quotationId ?? '')
  const [quotationOpen, setQuotationOpen] = useState(false)
  const [quotationSearchId, setQuotationSearchId] = useState('')
  const [quotationSearchAgency, setQuotationSearchAgency] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [tab, setTab] = useState('items')
  const readOnly = bid?.status === 'Faturado'
  const form = useForm<BidFields>({ resolver: zodResolver(schema), defaultValues: { edital: bid?.edital ?? '', orgao: bid?.orgao ?? '', sessionDatetime: dateTimeValue(bid), proposalDeadline: bid?.proposalDeadline ?? '', deliveryPlace: bid?.deliveryPlace ?? '', publicSessionLink: bid?.publicSessionLink ?? '', bidType: bid?.modalidade ?? 'Pregão eletrônico', status: bid?.status ?? 'Em análise', statusReason: '', hasGuaranteeDeposit: bid?.hasGuaranteeDeposit ?? false } })
  const { register, handleSubmit, setValue, watch, setError, formState: { errors, isSubmitting } } = form
  const currentStatus = watch('status')
  const publicSessionLink = watch('publicSessionLink')
  const statusChanged = !!bid && currentStatus !== bid.status
  const linkedBudget = budgets.find((budget) => budget.id === quotationId)
  const items = bid?.items ?? []
  const total = items.reduce((sum, item) => sum + item.finalValue * item.quantity, 0)
  const profit = items.reduce((sum, item) => sum + (item.finalValue - item.cost) * item.quantity, 0)
  const margin = total > 0 && items.every((item) => item.cost > 0 && item.finalValue > 0) ? `${(profit / total * 100).toFixed(1).replace('.', ',')}%` : '—'

  const addAttachments = (event: ChangeEvent<HTMLInputElement>) => {
    const files = [...(event.target.files ?? [])]
    event.target.value = ''
    if (attachments.length + files.length > 4) { setAttachmentError('Cada edital pode ter no máximo 4 arquivos.'); return }
    const oversized = files.find((file) => file.size > 20 * 1024 * 1024)
    if (oversized) { setAttachmentError(`O arquivo ${oversized.name} deve ter no máximo 20 MB.`); return }
    setAttachmentError('')
    setAttachments((current) => [...current, ...files.map((file) => ({ id: nextId('file'), name: file.name, size: file.size, file }))])
  }
  const downloadAttachment = (attachment: BidAttachment) => {
    const url = URL.createObjectURL(attachment.file)
    const anchor = document.createElement('a')
    anchor.href = url; anchor.download = attachment.name; anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const save = (values: BidFields) => {
    if (readOnly) { onNotify('Este edital está faturado e disponível apenas para visualização.'); return }
    if (statusChanged && !transitions[bid!.status].includes(values.status)) { setError('status', { message: 'Esta transição de status não é permitida.' }); return }
    if (statusChanged && !values.statusReason.trim()) { setError('statusReason', { message: 'Informe o motivo da alteração de status.' }); return }
    const [sessao, sessionTime] = values.sessionDatetime.split('T')
    const id = bid?.id ?? nextId('lic-demo')
    const history = statusChanged ? [...(bid?.statusHistory ?? []), { id: nextId('status'), from: bid!.status, to: values.status, reason: values.statusReason.trim(), by: 'Marina Costa', at: new Date().toISOString() }] : bid?.statusHistory ?? []
    onSave({ ...bid, id, edital: values.edital.trim(), orgao: values.orgao.trim(), objeto: bid?.objeto ?? linkedBudget?.title ?? `Edital ${values.edital.trim()} de ${values.orgao.trim()}`, modalidade: values.bidType, status: values.status, sessao, sessionTime, proposalDeadline: values.proposalDeadline, deliveryPlace: values.deliveryPlace.trim(), publicSessionLink: values.publicSessionLink.trim(), hasGuaranteeDeposit: values.hasGuaranteeDeposit, quotationId, valor: bid?.valor ?? 0, responsavel: bid?.responsavel ?? 'Marina Costa', createdBy: bid?.createdBy ?? 'Marina Costa', documentos: bid?.documentos ?? 0, attachments, statusHistory: history })
    setValue('statusReason', '')
  }
  const selectedBudgets = budgets.filter((budget) => !budget.bidId && !bids.some((candidate) => candidate.quotationId === budget.id) && budget.id.toLocaleLowerCase('pt-BR').includes(quotationSearchId.toLocaleLowerCase('pt-BR')) && budget.agency.toLocaleLowerCase('pt-BR').includes(quotationSearchAgency.toLocaleLowerCase('pt-BR')))
  return <>
    <button className="gll-back" onClick={onBack}><ArrowLeft size={16} /> Voltar para licitações</button>
    <PageHeader kicker="GESTÃO / LICITAÇÃO" title={bid ? bid.edital : 'Novo edital'} description={bid ? bid.orgao : 'Preencha os dados para cadastrar uma nova licitação.'} actions={bid && <StatusBadge status={bid.status} />} />
    {bid && <div className="gll-bid-workspace-head"><div><small>EDITAL ABERTO</small><strong>{bid.edital}</strong><span>{bid.orgao}</span></div><CreatorTag name={bid.createdBy ?? bid.responsavel} avatarSrc={creatorAvatar(bid.createdBy ?? bid.responsavel)} /></div>}
    <Surface className="gll-bid-editor"><div className="gll-bid-section-title"><div><span className="gll-bid-section-icon"><FileText size={20} /></span><h2>Dados do Edital</h2></div><span>{bid?.edital ?? 'Novo edital'}</span></div>
      {readOnly && <Alert title="Somente leitura" tone="warning">Este edital está faturado. Os dados permanecem disponíveis para consulta.</Alert>}
      <form id="bid-editor-form" onSubmit={handleSubmit(save)} className="gll-bid-editor-form"><div className="gll-bid-form-grid">
        <Field htmlFor="bid-number" label="N° do Edital" required error={errors.edital?.message}><Input id="bid-number" disabled={readOnly} aria-invalid={!!errors.edital} {...register('edital')} /></Field>
        <Field htmlFor="bid-agency" label="Órgão Comprador" required error={errors.orgao?.message}><Input id="bid-agency" disabled={readOnly} aria-invalid={!!errors.orgao} {...register('orgao')} /></Field>
        <Field htmlFor="bid-session" label="Data e Hora da Sessão" required error={errors.sessionDatetime?.message}><Input id="bid-session" type="datetime-local" disabled={readOnly} aria-invalid={!!errors.sessionDatetime} {...register('sessionDatetime')} /></Field>
        <Field htmlFor="bid-deadline" label="Data Limite Proposta"><Input id="bid-deadline" type="datetime-local" disabled={readOnly} {...register('proposalDeadline')} /></Field>
        <Field htmlFor="bid-place" label="Local de Entrega"><Input id="bid-place" disabled={readOnly} {...register('deliveryPlace')} /></Field>
        <Field htmlFor="bid-session-link" label="Link da Sessão Pública" error={errors.publicSessionLink?.message}>{publicSessionLink && /^https?:\/\//i.test(publicSessionLink) && URL.canParse(publicSessionLink) ? <div className="gll-bid-linked-action"><span><strong>Sessão pública cadastrada</strong><small>Abra a página da disputa em uma nova aba.</small></span><a className="gll-button gll-button--secondary gll-button--small" href={publicSessionLink} target="_blank" rel="noopener noreferrer">Acessar sessão <ArrowRight size={14} /></a><Button type="button" size="small" variant="quiet" disabled={readOnly} onClick={() => setValue('publicSessionLink', '')}>Remover</Button></div> : <Input id="bid-session-link" type="url" placeholder="https://..." disabled={readOnly} aria-invalid={!!errors.publicSessionLink} {...register('publicSessionLink')} />}</Field>
        <fieldset className="gll-bid-type"><legend>Tipo <span aria-hidden="true">*</span></legend><label><input type="radio" value="Pregão eletrônico" disabled={readOnly} {...register('bidType')} /> Pregão Eletrônico</label><label><input type="radio" value="Dispensa" disabled={readOnly} {...register('bidType')} /> Dispensa</label>{bid && !['Pregão eletrônico', 'Dispensa'].includes(bid.modalidade) && <small>Tipo anterior: {bid.modalidade}. Escolha uma opção para atualizar.</small>}{errors.bidType && <small className="gll-error" role="alert">{errors.bidType.message}</small>}</fieldset>
        <Field htmlFor="bid-status" label="Status" error={errors.status?.message}><Select id="bid-status" disabled={readOnly} {...register('status')}>{statuses.map((value) => <option key={value} value={value} disabled={!!bid && value !== bid.status && !transitions[bid.status].includes(value)}>{value}</option>)}</Select></Field>
        <label className="gll-bid-check gll-bid-check-wide"><input type="checkbox" disabled={readOnly} {...register('hasGuaranteeDeposit')} /><span>Possui depósito de garantia?<small>Confirma depósito em dinheiro para participar da licitação.</small></span></label>
        {statusChanged && <div className="gll-bid-wide"><Field htmlFor="bid-status-reason" label="Motivo da alteração de status" required error={errors.statusReason?.message}><Textarea id="bid-status-reason" rows={2} maxLength={500} disabled={readOnly} {...register('statusReason')} /></Field></div>}
        <Field htmlFor="bid-quotation" label="Orçamento"><div className="gll-bid-quotation-control"><Input id="bid-quotation" readOnly value={linkedBudget ? `${linkedBudget.id} · ${linkedBudget.title}` : quotationId} placeholder="Selecionar orçamento" onClick={() => bid && setQuotationOpen(true)} aria-haspopup="dialog" /><Button type="button" variant="secondary" disabled={!bid || readOnly} onClick={() => setQuotationOpen(true)}>Localizar</Button>{quotationId && <Button type="button" variant="quiet" disabled={readOnly} onClick={() => setQuotationId('')}>Limpar</Button>}</div></Field>
        <div className="gll-bid-attachments"><label htmlFor="bid-files" className="gll-label">Arquivos do Edital</label><Input id="bid-files" type="file" multiple disabled={readOnly || attachments.length >= 4} onChange={addAttachments} /><small className="gll-help">{attachments.length} de 4 arquivos anexados. Máximo de 20 MB por arquivo.</small>{attachmentError && <small role="alert" className="gll-error">{attachmentError}</small>}{attachments.length ? <div className="gll-bid-attachment-list">{attachments.map((file) => <div key={file.id}><span><strong>{file.name}</strong><small>{(file.size / 1024).toFixed(0)} KB</small></span><Button type="button" variant="quiet" size="small" onClick={() => downloadAttachment(file)}>Baixar</Button><Button type="button" variant="quiet" size="small" disabled={readOnly} onClick={() => setAttachments((current) => current.filter((item) => item.id !== file.id))}>Remover</Button></div>)}</div> : <small className="gll-muted">Nenhum arquivo anexado.</small>}</div>
      </div><div className="gll-bid-editor-actions">{bid && <Button type="button" variant="danger" disabled={readOnly} onClick={() => setDeleteOpen(true)}>Excluir Edital</Button>}<span /><Button type="button" variant="quiet" onClick={() => { if (bid) onNew(); else { form.reset(); setAttachments([]); setQuotationId(''); setAttachmentError('') } }}>Novo Edital</Button><Button type="submit" disabled={readOnly || isSubmitting}>Salvar Edital</Button></div></form>
    </Surface>
    {bid && <><div className="gll-bid-metrics"><Surface><small>ITENS</small><strong>{items.length}</strong></Surface><Surface><small>FATURAMENTO TOTAL</small><strong>{money(total)}</strong></Surface><Surface><small>LUCRO TOTAL</small><strong>{money(profit)}</strong></Surface><Surface><small>MARGEM DE LUCRO</small><strong>{margin}</strong></Surface></div>
      <Tabs.Root value={tab} onValueChange={setTab} className="gll-bid-tabs"><Tabs.List aria-label="Detalhes do edital"><Tabs.Trigger value="items">Orçamento</Tabs.Trigger><Tabs.Trigger value="documents">Documentações</Tabs.Trigger>{bid.status === 'Desclassificado' && <Tabs.Trigger value="failures">Histórico de Falhas</Tabs.Trigger>}</Tabs.List>
        <Tabs.Content value="items"><QuotationItemsPanel bid={bid} linkedBudget={linkedBudget} onPatch={onPatch} onFind={() => setQuotationOpen(true)} onCreate={() => { const id = onCreateBudget(bid.id); setQuotationId(id); onPatch(bid.id, { quotationId: id }); onNotify('Orçamento fictício criado e vinculado ao edital.') }} onNotify={onNotify} readOnly={readOnly} /></Tabs.Content>
        <Tabs.Content value="documents"><DocumentsPanel bid={bid} onPatch={onPatch} onNotify={onNotify} readOnly={readOnly} /></Tabs.Content>
        {bid.status === 'Desclassificado' && <Tabs.Content value="failures"><FailuresPanel bid={bid} onPatch={onPatch} onNotify={onNotify} readOnly={readOnly} /></Tabs.Content>}
      </Tabs.Root>
      <Surface className="gll-bid-history"><h2>Histórico de status</h2>{bid.statusHistory?.length ? bid.statusHistory.map((entry) => <div key={entry.id}><span><StatusBadge status={entry.from} /> <ArrowRight size={14} /> <StatusBadge status={entry.to} /></span><p>{entry.reason}</p><small>{entry.by} · {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(entry.at))}</small></div>) : <p className="gll-muted">Nenhuma alteração de status registrada.</p>}</Surface>
    </>}
    <Dialog open={quotationOpen} onOpenChange={setQuotationOpen} title="Localizar orçamento" description="Vincule um orçamento ainda disponível ao edital."><div className="gll-bid-form-grid"><Field htmlFor="budget-search-id" label="ID"><Input id="budget-search-id" type="search" value={quotationSearchId} onChange={(event) => setQuotationSearchId(event.target.value)} placeholder="Pesquisar por ID" /></Field><Field htmlFor="budget-search-agency" label="Órgão"><Input id="budget-search-agency" type="search" value={quotationSearchAgency} onChange={(event) => setQuotationSearchAgency(event.target.value)} placeholder="Pesquisar por órgão" /></Field></div><div className="gll-bid-budget-results">{selectedBudgets.map((budget) => <button key={budget.id} type="button" onClick={() => { setQuotationId(budget.id); if (bid) onPatch(bid.id, { quotationId: budget.id }); setQuotationOpen(false); onNotify('Orçamento vinculado ao edital.') }}><strong>{budget.id}</strong><span>{budget.agency}<small>{budget.title}</small></span><small>{money(budget.total)}</small></button>)}{!selectedBudgets.length && <p>Nenhum orçamento disponível corresponde aos filtros.</p>}</div></Dialog>
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Excluir edital?" description={`O edital ${bid?.edital ?? ''} deixará de aparecer no protótipo. A ação vale apenas para esta sessão.`} footer={<><Button variant="quiet" onClick={() => setDeleteOpen(false)}>Cancelar</Button><Button variant="danger" onClick={() => { if (bid) onDelete(bid.id); setDeleteOpen(false) }}>Excluir Edital</Button></>}><p>Confira o número do edital antes de continuar.</p></Dialog>
  </>
}

function DocumentsPanel({ bid, onPatch, onNotify, readOnly }: { bid: Bid; onPatch: Props['onPatch']; onNotify: Props['onNotify']; readOnly: boolean }) {
  const rows = bid.checklist ?? []
  const [selected, setSelected] = useState<string | null>(null)
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [hasDocument, setHasDocument] = useState(false)
  const clear = () => { setSelected(null); setType(''); setDescription(''); setHasDocument(false) }
  const load = (row: BidDocument) => { setSelected(row.id); setType(row.type); setDescription(row.description); setHasDocument(row.hasDocument) }
  const apply = (next: BidDocument[]) => onPatch(bid.id, { checklist: next, documentos: next.filter((row) => !row.hasDocument).length })
  const save = (event: FormEvent) => { event.preventDefault(); if (!type.trim()) return; const next = { id: selected ?? nextId('doc'), type: type.trim(), description: description.trim(), hasDocument }; apply(selected ? rows.map((row) => row.id === selected ? next : row) : [...rows, next]); clear(); onNotify('Documento salvo no checklist.') }
  return <Surface className="gll-bid-panel"><h2>Checklist de Documentações</h2>{!readOnly && <form className="gll-bid-subform" onSubmit={save}><div className="gll-bid-form-grid"><Field htmlFor="doc-type" label="Tipo de Documento" required><Input id="doc-type" required value={type} onChange={(event) => setType(event.target.value)} /></Field><label className="gll-bid-check"><input type="checkbox" checked={hasDocument} onChange={(event) => setHasDocument(event.target.checked)} /><span>Possui documento</span></label><div className="gll-bid-wide"><Field htmlFor="doc-description" label="Descrição"><Textarea id="doc-description" rows={2} value={description} onChange={(event) => setDescription(event.target.value)} /></Field></div></div><div className="gll-bid-editor-actions">{selected && <Button type="button" variant="danger" onClick={() => { apply(rows.filter((row) => row.id !== selected)); clear(); onNotify('Documento excluído do checklist.') }}>Excluir Documento</Button>}<span /><Button type="button" variant="quiet" onClick={clear}>Limpar Documento</Button><Button type="submit">Salvar Documento</Button></div></form>}{rows.length ? <div className="gll-table-scroll"><table className="gll-bid-subtable"><thead><tr><th>Tipo</th><th>Descrição</th><th>Possui?</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} tabIndex={readOnly ? undefined : 0} onClick={() => !readOnly && load(row)} onKeyDown={(event) => { if (!readOnly && event.key === 'Enter') load(row) }}><td>{row.type}</td><td>{row.description}</td><td>{row.hasDocument ? 'Sim' : 'Não'}</td></tr>)}</tbody></table></div> : <EmptyState title="Nenhum documento cadastrado" description="Adicione os documentos exigidos no edital." />}</Surface>
}

function FailuresPanel({ bid, onPatch, onNotify, readOnly }: { bid: Bid; onPatch: Props['onPatch']; onNotify: Props['onNotify']; readOnly: boolean }) {
  const rows = bid.failures ?? []
  const [selected, setSelected] = useState<string | null>(null)
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [actionPlan, setActionPlan] = useState('')
  const clear = () => { setSelected(null); setType(''); setDescription(''); setActionPlan('') }
  const load = (row: BidFailure) => { setSelected(row.id); setType(row.type); setDescription(row.description); setActionPlan(row.actionPlan) }
  const save = (event: FormEvent) => { event.preventDefault(); if (!type.trim() || !description.trim()) return; const next = { id: selected ?? nextId('failure'), type: type.trim(), description: description.trim(), actionPlan: actionPlan.trim() }; onPatch(bid.id, { failures: selected ? rows.map((row) => row.id === selected ? next : row) : [...rows, next] }); clear(); onNotify('Falha salva no histórico.') }
  return <Surface className="gll-bid-panel"><h2>Histórico de Falhas</h2>{!readOnly && <form className="gll-bid-subform" onSubmit={save}><div className="gll-bid-form-grid"><Field htmlFor="failure-type" label="Tipo de Falha" required><Input id="failure-type" required value={type} onChange={(event) => setType(event.target.value)} /></Field><div className="gll-bid-wide"><Field htmlFor="failure-description" label="Descrição" required><Textarea id="failure-description" required rows={2} value={description} onChange={(event) => setDescription(event.target.value)} /></Field></div><div className="gll-bid-wide"><Field htmlFor="failure-plan" label="Plano de ação"><Textarea id="failure-plan" rows={2} value={actionPlan} onChange={(event) => setActionPlan(event.target.value)} /></Field></div></div><div className="gll-bid-editor-actions">{selected && <Button type="button" variant="danger" onClick={() => { onPatch(bid.id, { failures: rows.filter((row) => row.id !== selected) }); clear(); onNotify('Falha removida do histórico.') }}>Excluir Falha</Button>}<span /><Button type="button" variant="quiet" onClick={clear}>Limpar Falha</Button><Button type="submit">Salvar Falha</Button></div></form>}{rows.length ? <div className="gll-table-scroll"><table className="gll-bid-subtable"><thead><tr><th>Tipo de Falha</th><th>Descrição</th><th>Plano de ação</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} tabIndex={readOnly ? undefined : 0} onClick={() => !readOnly && load(row)} onKeyDown={(event) => { if (!readOnly && event.key === 'Enter') load(row) }}><td>{row.type}</td><td>{row.description}</td><td>{row.actionPlan}</td></tr>)}</tbody></table></div> : <EmptyState title="Nenhuma falha cadastrada" description="Registre as ocorrências e o plano de ação do edital desclassificado." />}</Surface>
}
