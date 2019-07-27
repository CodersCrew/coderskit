import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, select } from '@storybook/addon-knobs';
import { LinearProgress, colors as themeColors } from 'coderskit';

const colors = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

storiesOf('Atoms', module).add('LinearProgress', () => {
  const props = {
    size: number('size', 8),
    strokeColor: select('strokeColor', colors, 'primary') as keyof typeof colors,
    trailColor: select('trailColor', colors, 'border') as keyof typeof colors,
    className: text('className', 'linear-progress-classname'),
    percent: number('percent', 20),
  };

  if (typeof props.percent === 'object') {
    props.percent = 0;
  }

  return <LinearProgress {...props} />;
});
