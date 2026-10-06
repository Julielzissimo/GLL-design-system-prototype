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
- `src/pages/`: catálogo de licitações, página de cadastro/edição e editor de itens.
- `src/App.tsx`: navegação, rotas e estado de demonstração.
- `src/stories/`: catálogo de componentes e foundations.

O frontend atual do GLL é uma SPA de HTML, CSS e JavaScript. Esta cópia em React serve à validação visual e funcional da nova linguagem; a migração do produto real requer uma etapa própria após aprovação.

## Acesso e documentação

- [Protótipo navegável](https://julielzissimo.github.io/GLL-design-system-prototype/#/design-system), incluindo a galeria de ícones.
- [Licitações no protótipo](https://julielzissimo.github.io/GLL-design-system-prototype/#/licitacoes), incluindo os cartões de autoria e a página de cadastro/edição.
- [Storybook](https://julielzissimo.github.io/GLL-design-system-prototype/storybook/), incluindo **Foundations / Icons**.
- [Auditoria do frontend atual](docs/AUDITORIA_FRONTEND.md).
- [Regras do Design System](docs/DESIGN_SYSTEM.md).
- [Iconografia e inventário completo](docs/ICONOGRAFIA.md).
- [Componentes, páginas e dados](docs/COMPONENTES_E_PAGINAS.md).
- [Referência funcional de licitações](docs/LICITACOES_REFERENCIA.md).
- [Plano de adoção no GLL real](docs/PLANO_DE_ADOCAO.md).

A branch `homolog` publica o protótipo e o Storybook em um GitHub Pages separado do GLL. Este repositório é referência para validação; não substitui o frontend real nem promove alterações para produção.
