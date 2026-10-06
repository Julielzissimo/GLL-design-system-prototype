import type { Meta } from '@storybook/react-vite'
import { IconCatalog } from '../design-system/IconCatalog'

const meta = {
  title: 'GLL Design System/Foundations/Icons',
  component: IconCatalog,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof IconCatalog>

export default meta

export const Catalog = {}
