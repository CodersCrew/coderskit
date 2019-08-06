import 'storybook-chromatic';
import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addReadme } from 'storybook-readme';
import { StylesProvider } from 'coderskit';

addParameters({
  options: {
    panelPosition: 'right',
  },
});

const req = require.context('../src', true, /.stories.tsx$/);

const withGlobal = story => (
  <StylesProvider>
    <div style={{ width: '100%', height: '100%', paddingLeft: 32 }}>
      {story()}
    </div>
  </StylesProvider>
);

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(addReadme);
addDecorator(withGlobal);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
