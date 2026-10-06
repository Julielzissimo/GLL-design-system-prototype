import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Bell, BookOpen,
  BriefcaseBusiness, Check, CheckCircle2, ChevronDown, ChevronRight,
  CircleHelp, ClipboardList, Columns3, FileCheck2, FileText,
  LayoutDashboard, Menu, MoreHorizontal, Package, Plus, Search,
  Settings2, SlidersHorizontal, Users, X,
  type LucideIcon,
} from 'lucide-react'

export {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Bell, BookOpen,
  BriefcaseBusiness, Check, CheckCircle2, ChevronDown, ChevronRight,
  CircleHelp, ClipboardList, Columns3, FileCheck2, FileText,
  LayoutDashboard, Menu, MoreHorizontal, Package, Plus, Search,
  Settings2, SlidersHorizontal, Users, X,
}

export const iconCategories = ['Navegação', 'Ações', 'Estados', 'Conteúdo'] as const
export type IconCategory = typeof iconCategories[number]

export type IconDefinition = {
  name: string
  label: string
  category: IconCategory
  usage: string
  Icon: LucideIcon
}

/** Inventário dos ícones efetivamente usados pelo protótipo e pelo Storybook. */
export const iconCatalog: readonly IconDefinition[] = [
  { name: 'LayoutDashboard', label: 'Visão geral', category: 'Navegação', usage: 'Entrada do painel na sidebar.', Icon: LayoutDashboard },
  { name: 'BriefcaseBusiness', label: 'Licitações', category: 'Navegação', usage: 'Área de licitações e registros.', Icon: BriefcaseBusiness },
  { name: 'ClipboardList', label: 'Orçamentos', category: 'Navegação', usage: 'Área de orçamentos.', Icon: ClipboardList },
  { name: 'FileCheck2', label: 'Declarações', category: 'Navegação', usage: 'Área de declarações.', Icon: FileCheck2 },
  { name: 'Users', label: 'Usuários', category: 'Navegação', usage: 'Área de usuários.', Icon: Users },
  { name: 'Package', label: 'Fornecedores', category: 'Navegação', usage: 'Área de fornecedores e seus registros.', Icon: Package },
  { name: 'BookOpen', label: 'Biblioteca', category: 'Navegação', usage: 'Modelos e Design System.', Icon: BookOpen },
  { name: 'Settings2', label: 'Configurações', category: 'Navegação', usage: 'Ajustes do espaço de trabalho.', Icon: Settings2 },
  { name: 'Menu', label: 'Abrir menu', category: 'Navegação', usage: 'Abre a navegação em telas pequenas.', Icon: Menu },
  { name: 'ChevronRight', label: 'Avançar', category: 'Navegação', usage: 'Indica percurso ou próximo nível.', Icon: ChevronRight },
  { name: 'ChevronDown', label: 'Expandir', category: 'Navegação', usage: 'Indica opções recolhidas ou menu.', Icon: ChevronDown },
  { name: 'ArrowLeft', label: 'Voltar', category: 'Navegação', usage: 'Retorna da tela de detalhe.', Icon: ArrowLeft },
  { name: 'ArrowRight', label: 'Acessar', category: 'Navegação', usage: 'Abre detalhe ou próxima etapa.', Icon: ArrowRight },
  { name: 'Plus', label: 'Adicionar', category: 'Ações', usage: 'Cria um registro.', Icon: Plus },
  { name: 'Search', label: 'Buscar', category: 'Ações', usage: 'Busca em campos e tabelas.', Icon: Search },
  { name: 'SlidersHorizontal', label: 'Filtrar', category: 'Ações', usage: 'Ajusta filtros de listagem.', Icon: SlidersHorizontal },
  { name: 'Columns3', label: 'Colunas', category: 'Ações', usage: 'Mostra ou oculta colunas da tabela.', Icon: Columns3 },
  { name: 'MoreHorizontal', label: 'Mais opções', category: 'Ações', usage: 'Abre ações contextuais.', Icon: MoreHorizontal },
  { name: 'X', label: 'Fechar', category: 'Ações', usage: 'Fecha painel, diálogo ou mensagem.', Icon: X },
  { name: 'Check', label: 'Selecionado', category: 'Estados', usage: 'Confirma uma seleção ou etapa.', Icon: Check },
  { name: 'CheckCircle2', label: 'Concluído', category: 'Estados', usage: 'Confirma resultado positivo.', Icon: CheckCircle2 },
  { name: 'CircleHelp', label: 'Ajuda', category: 'Estados', usage: 'Identifica orientação contextual.', Icon: CircleHelp },
  { name: 'Bell', label: 'Notificações', category: 'Estados', usage: 'Acesso a avisos do painel.', Icon: Bell },
  { name: 'ArrowUp', label: 'Ordem crescente', category: 'Estados', usage: 'Direção de ordenação na tabela.', Icon: ArrowUp },
  { name: 'ArrowDown', label: 'Ordem decrescente', category: 'Estados', usage: 'Direção de ordenação na tabela.', Icon: ArrowDown },
  { name: 'Activity', label: 'Atividade', category: 'Conteúdo', usage: 'Resumo de movimentação.', Icon: Activity },
  { name: 'FileText', label: 'Documento', category: 'Conteúdo', usage: 'Arquivos, modelos e documentos.', Icon: FileText },
]
