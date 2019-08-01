import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, boolean, number, text } from '@storybook/addon-knobs';
import { Button, Icon, colors as themeColors } from 'coderskit';
import { omit } from 'lodash-es';
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

const colors = { unset: 'unset', ...Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {}) };

const icons = {
  'grin-tears-solid.svg': 'grin-tears-solid.svg',
  'grin-tongue-solid.svg': 'grin-tongue-solid.svg',
  'kiss-solid.svg': 'kiss-solid.svg',
  'laugh-beam-solid.svg': 'laugh-beam-solid.svg',
  'smile-beam-solid.svg': 'smile-beam-solid.svg',
};

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=15%3A64',
};

const getButtonProps = () => ({
  children: text('children', 'Simple Button', 'Button'),
  disabled: boolean('disabled', false, 'Button'),
  variant: select('variant', variants, 'contained', 'Button') as keyof typeof variants,
  color: select('color', colors, 'unset', 'Button') as keyof typeof colors,
  size: select('size', sizes, 'default', 'Button') as keyof typeof sizes,
  as: select('as', elements, 'button', 'Button') as keyof typeof elements,
});

const getIconProps = () => ({
  spin: boolean('spin', false, 'Icon'),
  visible: boolean('visible', true, 'Icon'),
  src: select('src', icons, 'smile-beam-solid.svg', 'Icon'),
  color: select('iconColor', colors, 'unset', 'Icon') as keyof typeof colors,
  size: number('size', 16, undefined, 'Icon'),
});

storiesOf('Button', module)
  .addDecorator(withDesign)
  .add(
    'Button with text',
    () => {
      const { children, ...props } = getButtonProps();
      const color = props.color === 'unset' ? undefined : props.color;

      return (
        <Button {...props} color={color}>
          {children}
        </Button>
      );
    },
    {
      design,
      readme: {
        content: readme,
      },
    },
  )
  .add(
    'Button with icon',
    () => {
      const props = omit(getButtonProps(), ['children']);
      const iconProps = getIconProps();

      const color = props.color === 'unset' ? undefined : props.color;
      const iconColor: any = iconProps.color === 'unset' ? undefined : iconProps.color;

      return (
        <Button {...props} color={color}>
          <Icon {...iconProps} color={iconColor} />
        </Button>
      );
    },
    {
      design,
      readme: {
        content: readme,
      },
    },
  )
  .add(
    'Button with text and icon',
    () => {
      const { children, ...props } = getButtonProps();
      const iconProps = getIconProps();

      const color = props.color === 'unset' ? undefined : props.color;
      const iconColor: any = iconProps.color === 'unset' ? undefined : iconProps.color;

      return (
        <Button {...props} color={color}>
          <Icon {...iconProps} color={iconColor} />
          {children}
        </Button>
      );
    },
    {
      design,
      readme: {
        content: readme,
      },
    },
  );
