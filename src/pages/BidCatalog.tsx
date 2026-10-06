import { useMemo, useState } from 'react'
import { type ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type SortingState } from '@tanstack/react-table'
import { Button, EmptyState, Input, StatusBadge, Surface } from '../design-system/components'
import { CreatorTag } from '../design-system/CreatorTag'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Search } from '../design-system/icons'
import { creatorAvatar, money, type Bid, type BidStatus } from '../data/demo'
import './bid-pages.css'

const statuses: BidStatus[] = ['Em análise', 'Descartada', 'Aprovada', 'Faturado', 'Desclassificado', 'Disputada']
const revenue = (bid: Bid) => bid.items?.length ? bid.items.reduce((sum, item) => sum + item.finalValue * item.quantity, 0) : bid.valor
const profit = (bid: Bid) => bid.items?.length ? bid.items.reduce((sum, item) => sum + (item.finalValue - item.cost) * item.quantity, 0) : null
const sessionLabel = (bid: Bid) => `${new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${bid.sessao}T12:00:00Z`))}, ${bid.sessionTime ?? '09:00'}`

export function BidCatalog({ bids, onOpen }: { bids: Bid[]; onOpen: (id: string) => void }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sessao', desc: true }])
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('Todos')
  const [guaranteeOnly, setGuaranteeOnly] = useState(false)
  const filtered = useMemo(() => bids.filter((bid) =>
    (!date || bid.sessao === date) && (status === 'Todos' || bid.status === status) &&
    (!guaranteeOnly || bid.hasGuaranteeDeposit),
  ), [bids, date, status, guaranteeOnly])
  const columns = useMemo<ColumnDef<Bid>[]>(() => [
    { accessorKey: 'edital', header: 'N° do edital', cell: ({ row }) => <div className="gll-bid-number"><strong>{row.original.edital}</strong><CreatorTag compact name={row.original.createdBy ?? row.original.responsavel} avatarSrc={creatorAvatar(row.original.createdBy ?? row.original.responsavel)} /></div> },
    { accessorKey: 'orgao', header: 'Órgão comprador', cell: ({ row }) => <span className="gll-bid-agency">{row.original.orgao}</span> },
    { accessorKey: 'sessao', header: 'Sessão', cell: ({ row }) => <span className="gll-tabular">{sessionLabel(row.original)}</span> },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    { id: 'items', header: 'Itens', accessorFn: (bid) => bid.items?.length ?? 0, cell: ({ row }) => row.original.items?.length ?? 0 },
    { id: 'revenue', header: 'Faturamento total', accessorFn: revenue, cell: ({ row }) => <strong className="gll-tabular">{money(revenue(row.original))}</strong> },
    { id: 'profit', header: 'Lucro total', accessorFn: (bid) => profit(bid) ?? -1, cell: ({ row }) => <span className="gll-tabular">{profit(row.original) === null ? '—' : money(profit(row.original) ?? 0)}</span> },
    { id: 'open', header: '', cell: ({ row }) => <Button variant="quiet" size="small" onClick={(event) => { event.stopPropagation(); onOpen(row.original.id) }} aria-label={`Abrir ${row.original.edital}`}><ArrowRight size={16} aria-hidden="true" /></Button>, enableSorting: false },
  ], [onOpen])
  const table = useReactTable({ data: filtered, columns, state: { sorting, globalFilter: search }, onSortingChange: setSorting, onGlobalFilterChange: setSearch, globalFilterFn: (row, _columnId, value) => [row.original.edital, row.original.orgao, row.original.modalidade, row.original.createdBy ?? row.original.responsavel, row.original.deliveryPlace ?? ''].join(' ').toLocaleLowerCase('pt-BR').includes(String(value).toLocaleLowerCase('pt-BR')), getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize: 8 } } })
  const clear = () => { setSearch(''); setDate(''); setStatus('Todos'); setGuaranteeOnly(false); table.setPageIndex(0) }
  return <><Surface className="gll-bid-filters"><div className="gll-bid-filter-grid">
    <label><span>Pesquisa dinâmica</span><span className="gll-bid-search"><Search size={17} aria-hidden="true" /><Input type="search" value={search} onChange={(event) => { setSearch(event.target.value); table.setPageIndex(0) }} placeholder="Órgão, modalidade, edital ou local" /></span></label>
    <label><span>Data da sessão</span><Input type="date" value={date} onChange={(event) => { setDate(event.target.value); table.setPageIndex(0) }} /></label>
    <label><span>Status</span><select className="gll-input" value={status} onChange={(event) => { setStatus(event.target.value); table.setPageIndex(0) }}><option>Todos</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label className="gll-bid-check"><input type="checkbox" checked={guaranteeOnly} onChange={(event) => { setGuaranteeOnly(event.target.checked); table.setPageIndex(0) }} /><span>Possui depósito de garantia?<small>Mostrar somente licitações confirmadas.</small></span></label>
    <Button variant="quiet" onClick={clear}>Limpar filtros</Button>
  </div></Surface>
    <Surface className="gll-table-surface"><div className="gll-table-scroll"><table className="gll-table gll-bid-table"><thead>{table.getHeaderGroups().map((group) => <tr key={group.id}>{group.headers.map((header) => <th key={header.id} aria-sort={header.column.getIsSorted() === 'asc' ? 'ascending' : header.column.getIsSorted() === 'desc' ? 'descending' : undefined}>{header.column.getCanSort() ? <button className="gll-sort-button" onClick={header.column.getToggleSortingHandler()} aria-label={`Ordenar por ${String(header.column.columnDef.header)}`}>{flexRender(header.column.columnDef.header, header.getContext())}{header.column.getIsSorted() === 'asc' ? <ArrowUp size={13} /> : header.column.getIsSorted() === 'desc' ? <ArrowDown size={13} /> : <span className="gll-sort-idle"><ArrowUp size={10} /><ArrowDown size={10} /></span>}</button> : flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map((row) => <tr key={row.id} className="gll-clickable-row" tabIndex={0} onClick={() => onOpen(row.original.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(row.original.id) } }}>{row.getVisibleCells().map((cell) => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table>{!table.getRowModel().rows.length && <EmptyState title="Nenhuma licitação encontrada" description="Ajuste os filtros ou cadastre um novo edital." />}</div><div className="gll-table-footer"><span>{table.getFilteredRowModel().rows.length} registros · página {table.getState().pagination.pageIndex + 1} de {Math.max(table.getPageCount(), 1)}</span><div><Button variant="quiet" size="small" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}><ArrowLeft size={15} /> Anterior</Button><Button variant="quiet" size="small" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Próxima <ArrowRight size={15} /></Button></div></div></Surface>
  </>
}
