# GLL Design System — proposta de validação

## Direção

Interface de trabalho para operações de licitação: legível, sóbria e organizada. A linguagem evita gradientes decorativos, excesso de pills, sombras fortes e blocos sem hierarquia. As superfícies lembram papel; o verde escuro identifica ação e navegação; o âmbar aparece apenas como acento.

## Fonte única

- `src/design-system/tokens.css`: cores, tipografia, escala espacial, formas, elevação e dimensões.
- `src/design-system/components.tsx`: ações, campos, escolhas, badges, tags, feedback, superfícies, tabela, overlays e cabeçalhos de página.
- `src/design-system/icons.ts`: exportações Lucide autorizadas, nomes, categorias e usos; [inventário de iconografia](ICONOGRAFIA.md).
- `src/design-system/IconCatalog.tsx`: galeria pesquisável presente na página Design System e no Storybook.
- `src/design-system/CreatorTag.tsx` e `creator-tag.css`: identificação de autoria usada na listagem e na página de edital.
- `src/design-system/styles.css`: regras de componentes, tabelas, navegação, padrões de página e responsividade.
- `src/pages/`: padrões navegáveis de listagem, cadastro e edição de licitações.
- `src/stories/`: Foundations, Components e Patterns renderizados pelo Storybook.

## Regras de uso

1. Use tokens semânticos. Não introduza cores ou radius isolados em novas telas.
2. Ações primárias usam um botão por contexto; ações secundárias são contornadas; ações discretas ficam junto ao conteúdo.
3. Campos têm label persistente, indicação textual de erro e `aria-invalid`. O asterisco sinaliza obrigatoriedade.
4. Estados combinam texto e cor. Erros e avisos devem indicar o que revisar.
5. Tabelas mostram dados legíveis em 14 px, com cabeçalhos de 13 px; cabeçalhos ordenam, filtros reduzem resultados, e a paginação fica no rodapé. Quando necessário, a tabela rola horizontalmente.
6. Diálogos usam Radix para foco e teclado. Dropdowns e tooltips usam as mesmas primitivas.
7. Navegação de detalhe preserva retorno e breadcrumb. Mobile usa painel lateral acionado por botão.
8. Toda variante compartilhada nova ou alterada deve aparecer no Storybook com estado normal, desabilitado ou inválido quando aplicável.
9. Ícones vêm do catálogo central. Ações apenas com ícone recebem rótulo acessível; figuras decorativas são ocultadas da árvore de acessibilidade.
10. A identificação “Criado por” usa `CreatorTag`. Mostre a foto quando existir e iniciais quando não existir; mantenha o nome legível em ambas as formas.
11. Cadastro e edição de licitação usam página própria. Preserve campos, histórico e abas no mesmo contexto de navegação.
12. Na escolha do tipo do edital, toda a opção selecionada recebe fundo azul claro; o rádio mantém seu indicador nativo azul. O foco de teclado aparece no contorno da opção. As cores desse estado estão em `--gll-selection-*`.

## Escala de leitura

| Papel | Tamanho proposto |
| --- | --- |
| Texto principal | 16 px; entrelinha de 1,5. |
| Texto de campos, ações, navegação e dados de tabela | 14 px, com rótulos persistentes de 13 px. |
| Cabeçalhos de tabela | 13 px. |
| Informação auxiliar e legendas | 12–13 px; evitar texto operacional abaixo de 12 px. |
| Controles principais | Altura mínima de 44 px; variantes pequenas de 38 px. |
| Cartão de autoria compacto | Altura mínima de 44 px, foto de 34 px e nome de 13 px. |

Os valores vivem em `src/design-system/tokens.css`, `styles.css`, `creator-tag.css` e `src/pages/bid-pages.css`. A página `#/design-system`, seção Tipografia, mostra a escala. O Storybook reproduz o mesmo exemplo em **Foundations / Typography**.

## Fundação técnica

Radix fornece comportamento acessível para diálogos, dropdowns, tabs e tooltips. CVA define variantes de botão no padrão usado por shadcn/ui, mas todos os componentes visuais têm identidade própria GLL. Lucide é a única biblioteca de ícones do protótipo. TanStack Table controla ordenação, filtros e paginação da lista de licitações. React Hook Form com Zod valida o cadastro e a edição fictícios de licitação.

## Breakpoints

- Acima de 1180 px: navegação lateral fixa e grades completas.
- Até 1180 px: grades menores e menos colunas visíveis em listas de pessoas.
- Até 780 px: menu em painel móvel e layout de uma coluna.
- Até 600 px: controles e cards ajustados para tela estreita; tabelas permanecem roláveis.

## Limites do protótipo

Todos os dados são fictícios e mantidos apenas na sessão do navegador. Não há login, persistência, geração de PDF, e-mail, Supabase ou permissões reais. Algumas ações mostram o resultado pretendido em mensagens de demonstração, enquanto os fluxos completos dependem da implementação posterior no produto. A publicação deste protótipo não promove mudanças ao `main` dos repositórios GLL.

## Documentação complementar

- [Iconografia](ICONOGRAFIA.md): inventário completo, tamanhos, semântica, acessibilidade e inclusão de novos ícones.
- [Componentes e páginas](COMPONENTES_E_PAGINAS.md): APIs compartilhadas, rotas e limites dos dados fictícios.
- [Plano de adoção](PLANO_DE_ADOCAO.md): passos e critérios para levar a linguagem visual à aplicação real.
- [Auditoria do frontend](AUDITORIA_FRONTEND.md): base técnica e inconsistências observadas antes do protótipo.
- [Referência de licitações](LICITACOES_REFERENCIA.md): correspondência entre a página real e os fluxos fictícios do protótipo.
