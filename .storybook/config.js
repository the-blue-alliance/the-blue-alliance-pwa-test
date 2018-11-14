import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'The Blue Alliance Storybook',
});

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
