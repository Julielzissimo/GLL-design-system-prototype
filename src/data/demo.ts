export type BidStatus = 'Em análise' | 'Aprovada' | 'Descartada' | 'Faturado' | 'Disputada' | 'Desclassificado'
export type Bid = {
  id: string; edital: string; orgao: string; objeto: string; modalidade: string;
  status: BidStatus; sessao: string; valor: number; responsavel: string; documentos: number
}

export const initialBids: Bid[] = [
  { id: 'lic-01', edital: 'PE 014/2026', orgao: 'Município de Vale Sereno', objeto: 'Aquisição de computadores e monitores para unidades administrativas', modalidade: 'Pregão eletrônico', status: 'Em análise', sessao: '2026-10-08', valor: 184500, responsavel: 'Marina Costa', documentos: 2 },
  { id: 'lic-02', edital: 'PE 021/2026', orgao: 'Secretaria de Saúde de Santa Aurora', objeto: 'Fornecimento de mobiliário clínico e equipamentos auxiliares', modalidade: 'Pregão eletrônico', status: 'Disputada', sessao: '2026-10-11', valor: 97200, responsavel: 'Lucas Andrade', documentos: 0 },
  { id: 'lic-03', edital: 'CP 006/2026', orgao: 'Consórcio Intermunicipal do Horizonte', objeto: 'Materiais para infraestrutura de rede', modalidade: 'Concorrência', status: 'Aprovada', sessao: '2026-09-23', valor: 248900, responsavel: 'Marina Costa', documentos: 0 },
  { id: 'lic-04', edital: 'PE 033/2026', orgao: 'Município de Pedra Clara', objeto: 'Suprimentos de escritório para escolas municipais', modalidade: 'Pregão eletrônico', status: 'Em análise', sessao: '2026-10-15', valor: 68400, responsavel: 'Ana Ribeiro', documentos: 3 },
  { id: 'lic-05', edital: 'PE 018/2026', orgao: 'Fundação Cultural de Monte Azul', objeto: 'Equipamentos audiovisuais e acessórios', modalidade: 'Pregão eletrônico', status: 'Faturado', sessao: '2026-09-12', valor: 132600, responsavel: 'Lucas Andrade', documentos: 0 },
  { id: 'lic-06', edital: 'DL 052/2026', orgao: 'Instituto de Pesquisa de Rio Norte', objeto: 'Licenças de software e serviços de suporte', modalidade: 'Dispensa', status: 'Descartada', sessao: '2026-10-02', valor: 45800, responsavel: 'Ana Ribeiro', documentos: 0 },
  { id: 'lic-07', edital: 'PE 027/2026', orgao: 'Autarquia de Águas de Novo Campo', objeto: 'Peças de manutenção para estações elevatórias', modalidade: 'Pregão eletrônico', status: 'Em análise', sessao: '2026-10-19', valor: 216300, responsavel: 'Marina Costa', documentos: 1 },
  { id: 'lic-08', edital: 'CP 011/2026', orgao: 'Município de Lagoa Alta', objeto: 'Sistema de monitoramento e câmeras IP', modalidade: 'Concorrência', status: 'Desclassificado', sessao: '2026-09-28', valor: 308000, responsavel: 'Lucas Andrade', documentos: 0 },
  { id: 'lic-09', edital: 'PE 041/2026', orgao: 'Secretaria de Educação de Boa Vista do Sul', objeto: 'Tablets e carrinhos de recarga para salas de aula', modalidade: 'Pregão eletrônico', status: 'Aprovada', sessao: '2026-09-29', valor: 416800, responsavel: 'Ana Ribeiro', documentos: 0 },
  { id: 'lic-10', edital: 'PE 035/2026', orgao: 'Consórcio Regional de Serra Nova', objeto: 'Materiais elétricos e iluminação LED', modalidade: 'Pregão eletrônico', status: 'Disputada', sessao: '2026-10-22', valor: 119700, responsavel: 'Marina Costa', documentos: 1 },
  { id: 'lic-11', edital: 'DL 064/2026', orgao: 'Fundação Pública de Águas Claras', objeto: 'Serviços de manutenção de impressoras', modalidade: 'Dispensa', status: 'Em análise', sessao: '2026-10-26', valor: 38700, responsavel: 'Ana Ribeiro', documentos: 0 },
  { id: 'lic-12', edital: 'PE 048/2026', orgao: 'Município de Campo do Sol', objeto: 'Uniformes e equipamentos de proteção individual', modalidade: 'Pregão eletrônico', status: 'Faturado', sessao: '2026-09-18', valor: 154200, responsavel: 'Lucas Andrade', documentos: 0 },
]

export const budgets = [
  { id: 'ORC-0264', bidId: 'lic-01', title: 'Equipamentos de informática', items: 18, total: 158420, updated: '03 out 2026', stage: 'Em elaboração' },
  { id: 'ORC-0261', bidId: 'lic-02', title: 'Mobiliário clínico', items: 12, total: 84650, updated: '02 out 2026', stage: 'Pronto para proposta' },
  { id: 'ORC-0258', bidId: 'lic-03', title: 'Infraestrutura de rede', items: 26, total: 219870, updated: '29 set 2026', stage: 'Aprovado' },
  { id: 'ORC-0255', bidId: 'lic-04', title: 'Papelaria escolar', items: 34, total: 58240, updated: '01 out 2026', stage: 'Em elaboração' },
  { id: 'ORC-0248', bidId: 'lic-09', title: 'Tecnologia para salas de aula', items: 15, total: 389100, updated: '27 set 2026', stage: 'Aprovado' },
]

export const initialSuppliers = [
  { id: 'for-01', name: 'Norte Equipamentos', category: 'Tecnologia', contact: 'contato@norteequipamentos.exemplo', city: 'Serra Nova', products: 24, status: 'Ativo' },
  { id: 'for-02', name: 'Casa Técnica Comércio', category: 'Mobiliário', contact: 'vendas@casatecnica.exemplo', city: 'Vale Sereno', products: 18, status: 'Ativo' },
  { id: 'for-03', name: 'Ponto & Papel', category: 'Papelaria', contact: 'comercial@pontoepapel.exemplo', city: 'Monte Azul', products: 63, status: 'Ativo' },
  { id: 'for-04', name: 'Circuito Soluções', category: 'Infraestrutura', contact: 'atendimento@circuito.exemplo', city: 'Novo Campo', products: 12, status: 'Em revisão' },
]

export const proposals = [
  { id: 'PROP-108', bidId: 'lic-03', title: 'Infraestrutura de rede', value: 219870, status: 'Finalizada', updated: '01 out 2026' },
  { id: 'PROP-107', bidId: 'lic-02', title: 'Mobiliário clínico', value: 84650, status: 'Rascunho', updated: '03 out 2026' },
  { id: 'PROP-105', bidId: 'lic-09', title: 'Tecnologia para salas de aula', value: 389100, status: 'Finalizada', updated: '29 set 2026' },
]

export const declarations = [
  { id: 'dec-01', title: 'Declaração de inexistência de impedimentos', scope: 'Organização', updated: '02 out 2026' },
  { id: 'dec-02', title: 'Compromisso de fornecimento', scope: 'Organização', updated: '30 set 2026' },
  { id: 'dec-03', title: 'Atendimento às condições do edital', scope: 'Edital específico', updated: '27 set 2026' },
]

export const people = [
  { name: 'Marina Costa', role: 'Administrador', email: 'marina@gll-demo.exemplo', initials: 'MC', bids: 5, status: 'Ativo' },
  { name: 'Lucas Andrade', role: 'Analista', email: 'lucas@gll-demo.exemplo', initials: 'LA', bids: 4, status: 'Ativo' },
  { name: 'Ana Ribeiro', role: 'Analista', email: 'ana@gll-demo.exemplo', initials: 'AR', bids: 3, status: 'Ativo' },
]

export const money = (amount: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(amount)
export const shortDate = (date: string) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))
