import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { Button, colors as themeColors } from 'coderskit';
import readme from './Button.md';

const variants = {
  contained: 'contained',
  outlined: 'outlined',
  text: 'text',
};

const sizes = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const elements = {
  a: 'a',
  button: 'button',
  div: 'div',
  span: 'span',
};

const colors = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

storiesOf('Atoms', module)
  .addParameters({
    readme: {
      content: readme,
    },
  })
  .add('Button', () => {
    const props = {
      disabled: boolean('disabled', false),
      variant: select('variant', variants, 'contained') as keyof typeof variants,
      color: select('color', colors, 'primary') as keyof typeof colors,
      size: select('size', sizes, 'default') as keyof typeof sizes,
      as: select('as', elements, 'button') as keyof typeof elements,
    };

    return <Button {...props}>Example Button</Button>;
  });
