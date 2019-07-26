import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, select } from '@storybook/addon-knobs';
import { LinearProgress, colors as themeColors } from 'coderskit';

const lineCaps = {
  butt: 'butt',
  square: 'square',
  round: 'round',
};

const colors = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

storiesOf('Atoms', module).add('LinearProgress', () => {
  const props = {
    size: number('size', 8),
    strokeColor: select('strokeColor', colors, 'primary') as keyof typeof colors,
    trailColor: select('trailColor', colors, 'border') as keyof typeof colors,
    strokeLinecap: select('strokeLinecap', lineCaps, 'round') as keyof typeof lineCaps,
    className: text('className', 'customClassname'),
    percent: number('percent', 20),
  };

  return <LinearProgress {...props} />;
});
