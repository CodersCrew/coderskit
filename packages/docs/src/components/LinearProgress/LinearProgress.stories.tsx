import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, number, select } from '@storybook/addon-knobs';
import { LinearProgress, colors as themeColors } from 'coderskit';
import sidebar from './LinearProgress.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=33%3A27',
};

const readme = { sidebar };

const colors = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

const getLinearProgressProps = () => ({
  className: text('className', 'linear-progress-classname'),
  percent: number('percent', 20),
  size: number('size', 8),
  strokeColor: select('strokeColor', colors, 'primary') as keyof typeof colors,
  trailColor: select('trailColor', colors, 'border') as keyof typeof colors,
});

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('LinearProgress', () => {
    const props = getLinearProgressProps();

    if (typeof props.percent === 'object') {
      props.percent = 0;
    }

    return <LinearProgress {...props} />;
  });
