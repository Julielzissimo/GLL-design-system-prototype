import './creator-tag.css'

export function CreatorTag({ name, avatarSrc, compact = false }: { name: string; avatarSrc?: string; compact?: boolean }) {
  const parts = name.trim().split(/\s+/)
  const initials = `${parts[0]?.[0] ?? '?'}${parts.length > 1 ? parts.at(-1)?.[0] ?? '' : ''}`.toLocaleUpperCase('pt-BR')
  return <span className={`gll-creator-tag${compact ? ' is-compact' : ''}`}>
    <span className="gll-creator-avatar" aria-hidden="true">
      {avatarSrc ? <img src={avatarSrc} alt="" width="40" height="40" loading="lazy" /> : initials}
    </span>
    <span className="gll-creator-copy"><small>Criado por</small><strong>{name}</strong></span>
  </span>
}
