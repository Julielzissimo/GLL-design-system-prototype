import { useState } from 'react'
import { Input, Surface } from './components'
import { ArrowRight, iconCatalog, iconCategories, Search, type IconCategory } from './icons'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export function IconCatalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<IconCategory | 'Todos'>('Todos')
  const search = normalize(query.trim())
  const visible = iconCatalog.filter((item) =>
    (category === 'Todos' || item.category === category) &&
    (!search || normalize(`${item.name} ${item.label} ${item.usage}`).includes(search)),
  )

  return <Surface id="ds-icones" className="gll-icon-catalog">
    <div className="gll-icon-catalog-heading">
      <div>
        <span className="gll-kicker">FOUNDATION / ICONOGRAFIA</span>
        <h2>Ícones</h2>
        <p className="gll-muted">Inventário dos {iconCatalog.length} ícones Lucide utilizados no protótipo. Busque pelo nome ou filtre pelo papel na interface.</p>
      </div>
      <span className="gll-icon-count">{visible.length} exibidos</span>
    </div>
    <div className="gll-icon-toolbar">
      <div className="gll-icon-search">
        <Search size={17} aria-hidden="true" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar ícone ou uso" aria-label="Buscar ícones" />
      </div>
      <div className="gll-icon-categories" role="group" aria-label="Filtrar ícones por categoria">
        {(['Todos', ...iconCategories] as const).map((item) =>
          <button key={item} type="button" className="gll-icon-filter" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>,
        )}
      </div>
    </div>
    {visible.length > 0 ? <div className="gll-icon-grid">
      {visible.map(({ name, label, category: itemCategory, usage, Icon }) =>
        <article className="gll-icon-card" key={name}>
          <span className="gll-icon-sample"><Icon size={24} strokeWidth={1.8} aria-hidden="true" /></span>
          <div><strong>{label}</strong><code>{name}</code><small>{itemCategory}</small></div>
          <p>{usage}</p>
        </article>,
      )}
    </div> : <p className="gll-icon-empty" role="status">Nenhum ícone corresponde à busca. Revise o termo ou escolha outra categoria.</p>}
    <div className="gll-icon-guidance" aria-label="Regras de iconografia">
      <div><strong>Tamanhos</strong><span>16 px em controles compactos, 20 px em ações e 24 px em destaques.</span></div>
      <div><strong>Traço e cor</strong><span>Traço de 1,8 px, com cor herdada do texto e contraste do contexto.</span></div>
      <div><strong>Significado</strong><span>Ícones decorativos usam <code>aria-hidden</code>; ações sem texto recebem nome acessível.</span></div>
    </div>
    <a className="gll-text-link gll-icon-doc-link" href="https://github.com/Julielzissimo/GLL-design-system-prototype/blob/homolog/docs/ICONOGRAFIA.md">Consultar inventário e regras completas <ArrowRight size={15} aria-hidden="true" /></a>
  </Surface>
}
