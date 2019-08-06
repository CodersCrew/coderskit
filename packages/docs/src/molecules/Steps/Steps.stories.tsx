import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { Steps, Step } from 'coderskit';
import { Icon, colors as themeColors } from 'coderskit';

const labelLayouts = {
    horizontal: 'horizontal',
    vertical: 'vertical'
}

const stepVariants = {
  outlined: 'outlined',
  contained: 'contained'
}

const colors = { unset: 'unset', ...Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {}) };

storiesOf('Molecules', module).add('Step', () => {
  const props = {
    variant: select('variant', stepVariants, 'contained') as keyof typeof stepVariants,
    size: number('size', 32),
    children: number('children', 1),
    color: select('color', colors, 'unset') as keyof typeof colors,
    fontColor: select('fontColor', colors, 'unset') as keyof typeof colors,
  };

  const { children, ...rest } = props;
  const color = props.color === 'unset' ? undefined : props.color;
  const fontColor = props.fontColor === 'unset' ? undefined : props.fontColor;


  return (
    <Step {...rest} color={color} fontColor={fontColor}>
      {children}
    </Step>
  );
});

storiesOf('Molecules', module).add('Steps', () => {
  const props = {
    labelLayout: select('labelLayout', labelLayouts, 'vertical') as keyof typeof labelLayouts,
  };

  return (
    <Steps {...props}>
      <Step></Step>
      <Step></Step>
      <Step></Step>
      <Step></Step>
    </Steps>
  );

});