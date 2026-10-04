import type { Preview } from '@storybook/react-vite'
import '../src/design-system/tokens.css'
import '../src/design-system/styles.css'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'Canvas', values: [{ name: 'Canvas', value: '#f5f3ed' }, { name: 'Paper', value: '#fffefa' }, { name: 'Forest', value: '#183d35' }] },
    viewport: { options: { mobile: { name: 'Mobile', styles: { width: '390px', height: '844px' } }, tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } }, desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } } } },
  },
}
export default preview
