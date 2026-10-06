# Licitações: referência funcional e escopo do protótipo

## Referência consultada

Esta implementação foi comparada com a branch `homolog` do repositório separado `GLL-frontend`, commit `452a69289890f1c1981153bafab623cfcd4a9857`. A referência de interface está em `web/index.html`, o comportamento em `web/app.js` e a apresentação em `web/styles.css`. A consulta foi somente leitura. Nenhum arquivo do produto original foi alterado por este protótipo.

A licitação real é criada e editada em **página própria**. Por isso, a ação “Nova licitação” abre `#/licitacoes/nova` e a seleção de um edital abre `#/licitacoes/:id`. O protótipo não usa um modal para o formulário do edital. O editor de um **item do orçamento** continua em diálogo, como na referência.

## Correspondência dos fluxos

| Recurso observado no GLL | Como validar no protótipo |
| --- | --- |
| Lista de editais e autoria com foto ou iniciais | `#/licitacoes`: a primeira coluna mostra número do edital e `CreatorTag` com “Criado por”, retrato fictício ou iniciais. |
| Pesquisa dinâmica e filtros | Busque por edital, órgão, modalidade, autor ou local. Filtre por data da sessão, status e depósito de garantia. Ordene pelas colunas; a paginação do protótipo facilita o exame dos registros fictícios. |
| Dados do edital | Na página nova ou de edição: número, órgão comprador, data e hora da sessão, prazo da proposta, local de entrega, link da sessão pública, tipo, status e depósito de garantia. Número, órgão e sessão são obrigatórios. |
| Link da sessão | Cadastre uma URL HTTP(S) válida; após salvar, a página oferece acesso e remoção. O destino abre em outra aba. |
| Mudança de status | As opções respeitam as transições da referência. Para mudar um status existente, informe um motivo; a página registra origem, destino, motivo, autora fictícia e horário no histórico. `Faturado` é somente leitura. |
| Orçamento vinculado | Localize orçamentos disponíveis por ID ou órgão, vincule, troque ou limpe a seleção. “Criar novo orçamento” gera um orçamento fictício vinculado ao edital aberto. |
| Itens e indicadores | A aba **Orçamento** lista itens e calcula faturamento, lucro e margem com base em lance final, custo e quantidade. É possível cadastrar, editar, excluir e exportar os itens em CSV local. |
| Dados técnicos do item | O editor de item inclui número, descrição, modelo, fabricante, texto técnico, links de fornecedores, especificações, valores, quantidade, item vencido quando o status permitir, e simulação de margem. Há aviso antes de descartar alterações. |
| Arquivos do edital | Selecione até quatro arquivos, com até 20 MB cada. Remova ou baixe arquivos enquanto a sessão da página permanecer aberta. |
| Documentações | A aba **Documentações** mantém tipo, descrição e indicação de documento existente; permite criar, editar e excluir entradas fictícias. |
| Falhas | A aba **Histórico de Falhas** aparece no status `Desclassificado` e permite registrar tipo, descrição e plano de ação fictícios. |
| Ações do edital | “Novo Edital” abre a página vazia; “Salvar Edital” valida e atualiza a sessão; “Excluir Edital” exige confirmação e retira o registro da lista da sessão. |

## Dados e limites

- Todos os registros, nomes e valores são fictícios. O retrato de Marina Costa foi gerado para o protótipo; não é foto de uma pessoa do GLL.
- O estado é mantido apenas na memória do navegador. Ao recarregar, a demonstração volta aos dados iniciais. Os arquivos selecionados não são enviados a servidor.
- O CSV é gerado localmente. Não há integração com Supabase, autenticação, permissões, notificações externas, PDF ou e-mail.
- A estrutura e as regras visuais aqui propostas são uma referência de melhoria. A implementação no GLL real requer trabalho posterior em `homolog`, validação funcional e aprovação antes de qualquer promoção.

## Caminho de manutenção

Os dados e tipos fictícios estão em `src/data/demo.ts`; a autoria reutilizável está em `src/design-system/CreatorTag.tsx`; a lista em `src/pages/BidCatalog.tsx`; o formulário e as abas em `src/pages/BidWorkspace.tsx`; os itens em `src/pages/QuotationItemsPanel.tsx`; as rotas e o estado em `src/App.tsx`. O Storybook contém **GLL Design System / Components / CreatorTag** e **GLL Design System / Patterns / Licitacoes**.
