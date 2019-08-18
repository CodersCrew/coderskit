import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, boolean, number, text } from '@storybook/addon-knobs';
import { Button, Icon, colors as themeColors } from 'coderskit';
import { omit } from 'lodash-es';
import sidebar from './Button.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=15%3A64',
};

const readme = { sidebar };

const buttonGroup = 'Button';
const iconGroup = 'Icon';

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

const getButtonProps = () => ({
  children: text('children', 'Simple Button', buttonGroup),
  disabled: boolean('disabled', false, buttonGroup),
  variant: select('variant', variants, 'contained', buttonGroup) as keyof typeof variants,
  color: select('color', colors, 'unset', buttonGroup) as keyof typeof colors,
  size: select('size', sizes, 'default', buttonGroup) as keyof typeof sizes,
  as: select('as', elements, 'button', buttonGroup) as keyof typeof elements,
});

const getIconProps = () => ({
  spin: boolean('spin', false, iconGroup),
  visible: boolean('visible', true, iconGroup),
  src: select('src', icons, 'smile-beam-solid.svg', iconGroup),
  color: select('iconColor', colors, 'unset', iconGroup) as keyof typeof colors,
  size: number('size', 16, undefined, iconGroup),
});

storiesOf('Atoms|Button', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Button with text', () => {
    const { children, ...props } = getButtonProps();
    const color = props.color === 'unset' ? undefined : props.color;

    return (
      <Button {...props} color={color}>
        {children}
      </Button>
    );
  })
  .add('Button with icon', () => {
    const props = omit(getButtonProps(), ['children']);
    const iconProps = getIconProps();

    const color = props.color === 'unset' ? undefined : props.color;
    const iconColor: any = iconProps.color === 'unset' ? undefined : iconProps.color;

    return (
      <Button {...props} color={color}>
        <Icon {...iconProps} color={iconColor} />
      </Button>
    );
  })
  .add('Button with text and icon', () => {
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
  });
