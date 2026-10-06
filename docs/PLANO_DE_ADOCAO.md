# Adoção do protótipo no GLL

## Estado dos artefatos

| Artefato | Papel | Situação |
| --- | --- | --- |
| `GLL-design-system-prototype`, branch `homolog` | Referência visual e funcional isolada, com dados fictícios. | Publicado separadamente para validação. |
| `GLL-frontend`, branch `homolog` | Aplicação real em HTML, CSS e JavaScript. | Não alterada por este protótipo. |
| `GLL-backend`, branch `homolog` | Dados, autenticação e políticas. | Não alterado por este protótipo. |
| Branches `main` do GLL | Produção. | Exigem aprovação explícita após a validação em homologação. |

O protótipo não pode ser copiado sobre o frontend como substituição direta. A auditoria em [AUDITORIA_FRONTEND.md](AUDITORIA_FRONTEND.md) descreve a diferença de arquitetura: o GLL real usa JavaScript nativo; esta referência usa React 19.

## Caminho recomendado após validação visual

1. **Fechar a referência visual.** Validar cores, tipografia, densidade, navegação, estados e ícones com as telas fictícias. Registrar ajustes de componentes no Storybook e em [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
2. **Definir a estratégia técnica do frontend real.** Decidir se a migração para React será gradual por áreas ou completa. Antes de codificar, inventariar rotas, integrações Supabase, permissões, estados e fluxos reais para manter equivalência funcional.
3. **Levar as foundations à branch `homolog` do frontend.** Criar tokens semânticos e uma camada de compatibilidade com os estilos atuais. Remover duplicações apenas depois de verificar dependências das telas existentes.
4. **Migrar componentes por família.** Começar por ações, campos, feedback e ícones; depois navegação, overlays, tabelas e padrões de página. Cada componente compartilhado deve ter stories e estados de interação. A fonte de estilos deve ser o Design System, não CSS novo por tela.
5. **Integrar dados e regras reais.** Substituir os dados fictícios por consultas autorizadas. Verificar autenticação, papel, ownership e políticas RLS para cada ação. Restrições visuais não substituem autorização no Supabase.
6. **Validar e publicar em homologação.** Executar verificações proporcionais, comparar os fluxos legados com os migrados e validar a implantação acessível na web. Corrigir regressões antes de qualquer promoção.
7. **Promover somente após aprovação.** Na promoção para `main`, atualizar `docs/especificacao-tecnica/ESPECIFICACAO_TECNICA_GLL.md` e os documentos técnicos afetados no mesmo fluxo. Depois sincronizar `main` de volta para `homolog` em frontend e backend, preservando histórico e validando a nova implantação.

## Critérios para transformar a referência em implementação

- Componentes compartilhados têm API, variantes e estados documentados, incluindo foco, desabilitado, erro, carregamento e vazio conforme o caso.
- Ícones usados estão no inventário de [ICONOGRAFIA.md](ICONOGRAFIA.md), com significado consistente e rótulo acessível para ações sem texto.
- Páginas críticas preservam navegação, leitura, criação e edição autorizadas, mensagens de erro e comportamento responsivo.
- Tabelas preservam ordenação, filtros, paginação, seleção, visibilidade de colunas e ações quando exigidos pelo fluxo real.
- O Storybook descreve as peças reutilizáveis; testes e revisão visual cobrem os fluxos integrados.
- A entrega em `homolog` está publicada e conferida por URL antes de pedir aprovação de produção.

## Limites atuais da referência

Os registros, pessoas, valores e mensagens são fictícios. Alterações feitas na interface vivem somente na sessão do navegador. O protótipo não possui autenticação, persistência, geração de documentos, envio de mensagens ou políticas RLS. A aparência e os padrões podem orientar a implementação; fluxos simulados precisam de especificação e integração no produto real.
