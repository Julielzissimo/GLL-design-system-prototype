# Iconografia do GLL Design System

## Fonte e escopo

Lucide React é a biblioteca única de ícones **deste protótipo**. O inventário executável está em `src/design-system/icons.ts`; a galeria pesquisável está na página `#/design-system`, seção **Ícones**, e no Storybook em **GLL Design System / Foundations / Icons**. Os identificadores abaixo são os nomes exportados pela biblioteca. Este documento descreve o conjunto usado pelo protótipo; não afirma que o frontend atual do GLL já o adota.

## Inventário

| Categoria | Componente | Significado e uso |
| --- | --- | --- |
| Navegação | `LayoutDashboard` | Entrada da visão geral na sidebar. |
| Navegação | `BriefcaseBusiness` | Licitações e área de trabalho. |
| Navegação | `ClipboardList` | Orçamentos. |
| Navegação | `FileCheck2` | Declarações e documentos da organização. |
| Navegação | `Users` | Usuários. |
| Navegação | `Package` | Fornecedores. |
| Navegação | `BookOpen` | Design System e biblioteca de padrões. |
| Navegação | `Settings2` | Configurações. |
| Navegação | `Menu` | Abre a sidebar em telas pequenas. |
| Navegação | `ChevronRight` | Próximo nível ou item navegável. |
| Navegação | `ChevronDown` | Expansão de seleção ou menu. |
| Navegação | `ArrowLeft` | Retorno de uma página de detalhe. |
| Navegação | `ArrowRight` | Acesso a detalhe ou avanço. |
| Ações | `Plus` | Criação de registro. |
| Ações | `Search` | Busca e representação de estado vazio. |
| Ações | `SlidersHorizontal` | Filtros. |
| Ações | `Columns3` | Visibilidade de colunas. |
| Ações | `MoreHorizontal` | Ações contextuais. |
| Ações | `X` | Fechamento de painel, diálogo ou mensagem. |
| Estados | `Check` | Item selecionado ou etapa confirmada. |
| Estados | `CheckCircle2` | Confirmação de resultado positivo. |
| Estados | `CircleHelp` | Orientação contextual. |
| Estados | `Bell` | Notificações. |
| Estados | `ArrowUp` | Ordenação crescente. |
| Estados | `ArrowDown` | Ordenação decrescente. |
| Conteúdo | `Activity` | Indicador de atividade. |
| Conteúdo | `FileText` | Documento, proposta e modelo textual. |

## Regras de aplicação

- Use 16 px em controles compactos, 20 px em ações comuns e 24 px em destaques ou amostras. A medida pode ajustar-se ao contexto, mas deve manter alinhamento com o texto e a área de toque do controle.
- Use `strokeWidth={1.8}` como referência visual. O SVG deve herdar `currentColor`; a cor comunica o papel do elemento, conforme os tokens semânticos.
- Preserve um significado por contexto. Um ícone é apoio ao texto, não substitui título, status ou instrução. Não comunique sucesso, erro ou alerta apenas por cor ou figura.
- Marque figuras decorativas com `aria-hidden="true"`. Para botões sem texto, dê um nome acessível por `aria-label`; o componente `IconButton` exige `label`.
- Não acrescente emoji, fonte de ícones, SVG avulso ou uma segunda biblioteca a uma nova tela. Se a Lucide não atender a um caso real, registre a exceção e revise a regra antes da adoção.
- Para adicionar um ícone, inclua-o em `icons.ts` com categoria, rótulo e uso; utilize a exportação central; verifique a galeria, o Storybook e atualize este inventário.

## Exemplo

```tsx
import { IconButton } from './design-system/components'
import { MoreHorizontal } from './design-system/icons'

<IconButton label="Mais opções" onClick={openMenu}>
  <MoreHorizontal size={20} strokeWidth={1.8} aria-hidden="true" />
</IconButton>
```

O exemplo mostra a API visual; `openMenu` representa a ação definida pela tela.
