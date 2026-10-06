const scale = [
  ['16 px', 'Texto principal'],
  ['14 px', 'Campos, ações e dados'],
  ['12–13 px', 'Informação auxiliar'],
  ['44 px', 'Altura do controle'],
] as const

export function TypographyScale() {
  return <div className="gll-type-rules" aria-label="Escala de leitura do GLL">
    {scale.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
  </div>
}
