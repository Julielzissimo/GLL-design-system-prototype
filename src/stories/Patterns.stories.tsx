import type { Meta } from '@storybook/react-vite'
import { ArrowRight } from 'lucide-react'
import { Badge, Button, PageHeader, Surface } from '../design-system/components'

const meta = { title: 'GLL Design System/Patterns' } satisfies Meta
export default meta

export const PageHeading = { render: () => <main className="gll-surface"><PageHeader kicker="OPERAÇÃO / LICITAÇÕES" title="Licitações" description="Acompanhe editais, prazos e decisões em um só lugar." actions={<Button>Nova licitação</Button>}/></main> }
export const DataTable = { render: () => <Surface className="gll-table-surface"><div className="gll-table-toolbar"><strong>Licitações cadastradas</strong><Button variant="secondary" size="small">Filtrar</Button></div><div className="gll-table-scroll"><table className="gll-table"><thead><tr><th>Edital</th><th>Órgão comprador</th><th>Status</th><th>Sessão</th></tr></thead><tbody><tr><td>PE 014/2026</td><td>Vale Sereno</td><td><Badge tone="warning">Em análise</Badge></td><td>08 out 2026</td></tr><tr><td>CP 006/2026</td><td>Consórcio do Horizonte</td><td><Badge tone="success">Aprovada</Badge></td><td>23 set 2026</td></tr></tbody></table></div></Surface> }
export const Navigation = { render: () => <main className="gll-surface"><div className="gll-breadcrumb"><span>GLL</span><ArrowRight size={13}/><strong>Licitações</strong><ArrowRight size={13}/><strong>PE 014/2026</strong></div><div className="gll-pattern-preview"><span>GLL / LICITAÇÕES / PE 014/2026</span><h3>Uma hierarquia para operar sem ruído.</h3><Button variant="secondary">Ação contextual <ArrowRight size={16}/></Button></div></main> }
