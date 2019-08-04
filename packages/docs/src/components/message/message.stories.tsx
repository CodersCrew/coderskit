import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, text, number } from '@storybook/addon-knobs';
import { message, Button } from 'coderskit';
import content from './message.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=26%3A186',
};

const readme = { content };

const childrenGroup = '1. Children';
const configGroup = '2. Config';

const variants = {
  contained: 'contained',
  outlined: 'outlined',
};

const kinds = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const getMessageChildren = () => ({
  children: text('children', 'Sample notification', childrenGroup),
});

const getMessageConfig = () => ({
  duration: number('duration', 10000, undefined, configGroup),
  variant: select('variant', variants, 'contained', configGroup) as keyof typeof variants,
  kind: select('kind', kinds, 'default', configGroup) as keyof typeof kinds,
});

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('message', () => {
    const { children } = getMessageChildren();
    const config = getMessageConfig();

    return <Button onClick={() => message(children, config)}>Click me</Button>;
  });
