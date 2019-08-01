import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, boolean } from '@storybook/addon-knobs';
import { Button, Icon, colors as themeColors } from 'coderskit';
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
  .addDecorator(withDesign)
  .add(
    'Button',
    () => {
      const props = {
        disabled: boolean('disabled', false),
        variant: select('variant', variants, 'contained') as keyof typeof variants,
        color: select('color', colors, 'primary') as keyof typeof colors,
        size: select('size', sizes, 'default') as keyof typeof sizes,
        as: select('as', elements, 'button') as keyof typeof elements,
      };

      const iconColor = props.variant === 'contained' ? 'white' : props.color;

      return (
        <div style={{ display: 'flex' }}>
          <Button {...props}>Simple Button</Button>
          <Button {...props} style={{ marginLeft: 24 }}>
            <Icon src="smile-beam-solid.svg" color={iconColor} style={{ marginRight: 8 }} />
            Button with icon
          </Button>
          <Button {...props} style={{ marginLeft: 24 }}>
            <Icon src="smile-beam-solid.svg" color={iconColor} />
          </Button>
        </div>
      );
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=15%3A64',
      },
    },
  );
