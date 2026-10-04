# Auditoria do frontend GLL em `homolog`

Referência inspecionada: `Julielzissimo/GLL-frontend`, branch `homolog`, commit `64c51c2` em 04/10/2026. Esta auditoria descreve a base existente; o protótipo está em outro repositório.

## Arquitetura encontrada

| Tema | Estado atual |
| --- | --- |
| Framework e React | SPA de HTML, CSS e JavaScript nativos. React não é usado. |
| Estilização | `web/styles.css` para a aplicação, `web/design-system/tokens.css` para tokens e `web/design-system/design-system.css` para catálogo. |
| Tailwind / shadcn / Radix | Não instalados. A adoção no produto exigiria migração arquitetural. |
| Storybook | Storybook 10 com `@storybook/html-vite`, Docs e A11y; stories de Foundations, Components e Patterns. |
| Ícones | Coleção SVG própria em `web/design-system/components.js`, SVGs avulsos e glifos Unicode nas telas. Não existe biblioteca oficial. |
| Rotas | Query string `?page=...` e History API. |
| Dados | Supabase nos ambientes publicados; IndexedDB no modo local. |

## Inventário dos padrões

| Família | Implementação observada |
| --- | --- |
| Buttons | `primary-action`, `quiet-action`, `danger-action`, `text-action`, `icon-button` e variações locais compactas. |
| Inputs e selects | HTML nativo com labels envolventes, grids de formulário e `form-error`. |
| Modais | Elementos `<dialog>` nativos com estruturas e larguras específicas por fluxo. |
| Cards | `section-band`, cards de status, painéis de fornecedor, proposta e configuração. |
| Tabelas | HTML nativo; listas extensas usam containers roláveis. Não há TanStack Table. |
| Alerts e toasts | Alert no catálogo e toast global no aplicativo; mensagens catalogadas em `components.js`. |
| Badges e tags | `status-pill`, papel de usuário, tags de fornecedor e variantes de cards. |
| Tooltips | Implementações pontuais com `title` ou atributos locais; sem API compartilhada madura. |
| Sidebar e dropdowns | Sidebar própria com grupos expansíveis; dropdowns específicos por tela. |
| Formulários | Validação JavaScript local; React Hook Form e Zod não são utilizados. |

## Inconsistências visuais

- O CSS legado contém famílias de cores próximas e muitas cores literais, mesmo com os tokens existentes.
- Tamanhos tipográficos, paddings e raios variam entre fluxos similares.
- Badges, cabeçalhos, filtros e cards repetem soluções com medidas e APIs diferentes.
- A mistura de glifos Unicode e SVGs causa variação entre plataformas.
- Modais de cadastro, confirmação e visualização não seguem uma escala única.
- O Storybook documenta parte dos padrões, enquanto muitas telas continuam estilizadas localmente.

O inventário já existente em `docs/inconsistencias-design.md` do frontend registra cerca de 210 expressões de cor e 21 valores de radius no CSS legado. Esta auditoria confirma a oportunidade de consolidar os componentes por uso, após validação visual.

## Compatibilidade da arquitetura proposta

O protótipo isolado usa React, Radix UI, Lucide, TanStack Table v8, React Hook Form e Zod. A aparência vem de tokens e componentes próprios do GLL. O padrão de composição é compatível com a abordagem do shadcn/ui, mas instalar seus componentes diretamente no frontend atual não resolveria as inconsistências: o produto precisaria migrar de HTML/JS para React. Por isso, este trabalho valida primeiro a linguagem visual e os padrões de interação fora da aplicação real.

Nenhuma migration, política RLS, autenticação ou integração Supabase foi alterada.
