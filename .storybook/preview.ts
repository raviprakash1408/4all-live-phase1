import '../src/styles/global.css';

// import type { Preview } from '@storybook/nextjs';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    title: 'Your Storybook Title',
    docs: {
      theme: themes.dark,
      title: 'Your Storybook Title',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
const addDecorator = () => {
  document.title = 'Your Custom Title'; // Replace with your desired title
};
addDecorator();
export default preview;
