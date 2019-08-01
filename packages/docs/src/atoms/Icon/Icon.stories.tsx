import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, number } from '@storybook/addon-knobs';
import { Icon, colors as themeColors } from 'coderskit';

const colors = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

const icons = {
  'grin-tears-solid.svg': 'grin-tears-solid.svg',
  'grin-tongue-solid.svg': 'grin-tongue-solid.svg',
  'kiss-solid.svg': 'kiss-solid.svg',
  'laugh-beam-solid.svg': 'laugh-beam-solid.svg',
  'smile-beam-solid.svg': 'smile-beam-solid.svg',
};

storiesOf('Atoms', module).add('Icon', () => {
  const props = {
    spin: boolean('spin', false),
    visible: boolean('visible', true),
    src: select('src', icons, 'smile-beam-solid.svg'),
    color: select('color', colors, 'primary') as keyof typeof colors,
    size: number('size', 16),
  };

  return <Icon {...props} />;
});
