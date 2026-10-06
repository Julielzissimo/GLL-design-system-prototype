# Componentes e páginas do protótipo

## Onde cada peça mora

- `src/design-system/tokens.css`: valores semânticos de cor, tipo, espaçamento, forma e dimensões.
- `src/design-system/components.tsx`: componentes reutilizáveis e suas APIs React.
- `src/design-system/icons.ts`: biblioteca oficial e inventário de ícones.
- `src/design-system/IconCatalog.tsx`: galeria interativa de ícones.
- `src/design-system/CreatorTag.tsx`: cartão compacto de autoria com foto ou iniciais.
- `src/design-system/styles.css`: aparência, estados de interação e regras responsivas.
- `src/App.tsx`: composição das páginas, navegação e estado de demonstração.
- `src/pages/BidCatalog.tsx`: listagem de licitações com dados de autoria.
- `src/pages/BidWorkspace.tsx`: página de cadastro e edição de edital.
- `src/pages/QuotationItemsPanel.tsx`: itens do orçamento e editor técnico.
- `src/data/demo.ts`: registros e formatos fictícios.
- `src/stories/`: catálogo de foundations, componentes e padrões isolados.

## Componentes compartilhados

| Família | Componentes | Contrato e estados principais |
| --- | --- | --- |
| Ações | `Button`, `IconButton` | Variantes `primary`, `secondary`, `quiet`, `danger`; tamanhos `default`, `small`, `icon`; `disabled`. `IconButton` exige `label` para nome acessível. |
| Superfícies e estrutura | `Surface`, `PageHeader` | Painel com borda e espaçamento; cabeçalho com contexto, título, descrição e ações. |
| Campos | `Field`, `Input`, `Select`, `Textarea` | Label persistente, ajuda, indicação de obrigatório, erro textual e `aria-invalid` no controle inválido. |
| Escolhas | `Checkbox`, `Radio`, `Switch` | Estados controlados, seleção por teclado e `disabled` onde disponível. |
| Estados | `Badge`, `StatusBadge`, `Tag`, `Alert` | Tons `neutral`, `success`, `warning`, `danger`, `info`; texto comunica o estado além da cor. `StatusBadge` mapeia status conhecidos. |
| Conteúdo assíncrono | `EmptyState`, `Loading`, `Skeleton`, `Toast` | Vazio com orientação; carregamento textual; esqueleto decorativo; confirmação dispensável. |
| Dados | `Table` | Camada visual da tabela; a lógica de listagem interativa usa TanStack Table na aplicação. |
| Sobreposições | `Dialog`, `Dropdown`, `DropdownItem`, `Tooltip` | Primitivas Radix para foco e interações de teclado. |
| Ícones | `IconCatalog`, `iconCatalog` | Galeria, filtro e catálogo único. Ver [ICONOGRAFIA.md](ICONOGRAFIA.md). |
| Autoria | `CreatorTag` | Exibe “Criado por”, nome e foto quando disponível; usa iniciais como alternativa. A variante `compact` cabe na célula do edital. |

O Storybook mostra as variantes e os padrões `PageHeading`, `DataTable`, `Navigation` e `TableSurface`. Algumas demonstrações isoladas são amostras visuais; a navegação e os formulários completos são exercitados nas páginas do aplicativo.

## Páginas navegáveis

As rotas usam o hash `#/` para funcionar no GitHub Pages sem reescrita de servidor.

| Rota | Conteúdo e validação possível |
| --- | --- |
| `#/visao-geral` | Indicadores, agenda, pendências e registros recentes. |
| `#/licitacoes` | Lista com cartões de autoria, busca dinâmica, filtros por data, status e depósito de garantia, ordenação e paginação; abre a página de cadastro ou a licitação selecionada. |
| `#/licitacoes/nova` | Página de cadastro com os campos do edital, validação e criação de registro fictício. |
| `#/licitacoes/:id` | Página de edição com status, orçamento, itens, documentações, falhas e histórico; retorno à lista. |
| `#/orcamentos` | Lista de orçamentos e acesso ao detalhe. |
| `#/orcamentos/:id` | Detalhe do orçamento selecionado. |
| `#/propostas` | Propostas comerciais com dados de demonstração. |
| `#/declaracoes` | Declarações e modelos de documentos. |
| `#/fornecedores` | Fornecedores fictícios. |
| `#/usuarios` | Pessoas e papéis exibidos para avaliação visual. |
| `#/configuracoes` | Cards de preferências e acesso ao Design System. |
| `#/design-system` | Foundations, exemplos de componentes, padrões e galeria pesquisável de ícones. |

## Dados e efeitos

Todos os dados são fictícios. Criação e mudanças de estado feitas no protótipo ficam na sessão do navegador e desaparecem ao recarregar. O cartão da usuária Marina Costa usa retrato gerado para esta demonstração; as demais pessoas usam iniciais. Anexos selecionados ficam na memória da sessão e podem ser baixados enquanto a página permanecer aberta. A exportação dos itens gera um CSV local. Não há login, autorização real, persistência, PDF, e-mail ou Supabase. Para detalhes da correspondência com o GLL atual, veja [LICITACOES_REFERENCIA.md](LICITACOES_REFERENCIA.md); para adoção no produto, siga [PLANO_DE_ADOCAO.md](PLANO_DE_ADOCAO.md).
