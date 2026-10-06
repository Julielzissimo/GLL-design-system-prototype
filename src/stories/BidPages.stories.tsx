import { useState } from 'react'
import type { Meta } from '@storybook/react-vite'
import { BidCatalog } from '../pages/BidCatalog'
import { BidWorkspace } from '../pages/BidWorkspace'
import { budgets as initialBudgets, initialBids, type Bid } from '../data/demo'

const meta = { title: 'GLL Design System/Patterns/Licitacoes' } satisfies Meta
export default meta

function BidFlow() {
  const [bids, setBids] = useState<Bid[]>(initialBids)
  const [budgets, setBudgets] = useState(initialBudgets)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const bid = bids.find((item) => item.id === selectedId)
  return <main style={{ maxWidth: 1320, margin: 'auto' }}>
    {message && <p className="gll-alert" role="status">{message}</p>}
    {selectedId === null ? <BidCatalog bids={bids} onOpen={setSelectedId} /> :
      <BidWorkspace key={selectedId} bid={bid} bids={bids} budgets={budgets}
        onSave={(next) => { setBids((current) => current.some((item) => item.id === next.id) ? current.map((item) => item.id === next.id ? next : item) : [next, ...current]); setSelectedId(next.id); setMessage('Edital salvo na demonstração.') }}
        onPatch={(id, patch) => setBids((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))}
        onDelete={(id) => { setBids((current) => current.filter((item) => item.id !== id)); setSelectedId(null); setMessage('Edital removido da demonstração.') }}
        onCreateBudget={(id) => { const budgetId = `ORC-DEMO-${budgets.length + 1}`; setBudgets((current) => [{ id: budgetId, bidId: id, agency: bid?.orgao ?? '', title: `Orçamento de ${bid?.edital ?? ''}`, items: 0, total: 0, updated: 'hoje', stage: 'Em elaboração' }, ...current]); return budgetId }}
        onBack={() => setSelectedId(null)} onNew={() => setSelectedId('nova')} onNotify={setMessage} />}
  </main>
}

export const FluxoNavegavel = { render: () => <BidFlow /> }
