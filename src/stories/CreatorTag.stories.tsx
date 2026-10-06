import type { Meta } from '@storybook/react-vite'
import { CreatorTag } from '../design-system/CreatorTag'
import { creatorAvatar } from '../data/demo'

const meta = { title: 'GLL Design System/Components/CreatorTag', component: CreatorTag } satisfies Meta<typeof CreatorTag>
export default meta

export const WithPhoto = { args: { name: 'Marina Costa', avatarSrc: creatorAvatar('Marina Costa') } }
export const InitialsFallback = { args: { name: 'Lucas Andrade' } }
export const Compact = { args: { name: 'Marina Costa', avatarSrc: creatorAvatar('Marina Costa'), compact: true } }
