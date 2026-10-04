# GLL Design System — protótipo

Protótipo isolado do GLL, com dados inteiramente fictícios. Não acessa o Supabase nem os repositórios de produção.

## Desenvolvimento

```sh
npm install
npm run dev
npm run storybook
```

## Organização

- `src/design-system/`: tokens, componentes e estilos oficiais propostos.
- `src/data/`: dados fictícios e modelos do protótipo.
- `src/pages/`: padrões de páginas navegáveis.
- `src/stories/`: catálogo de componentes e foundations.

O frontend atual do GLL é uma SPA de HTML, CSS e JavaScript. Esta cópia em React serve à validação visual e funcional da nova linguagem; a migração do produto real requer uma etapa própria após aprovação.

Leia a [auditoria](docs/AUDITORIA_FRONTEND.md) e as [regras do Design System](docs/DESIGN_SYSTEM.md). A branch `homolog` publica o protótipo e o Storybook em um GitHub Pages separado do GLL.
