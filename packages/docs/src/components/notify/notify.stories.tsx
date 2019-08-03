import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, text, number } from '@storybook/addon-knobs';
import { Button, notify } from 'coderskit';
import content from './notify.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=26%3A186',
};

const readme = { content };

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

const getNotificationProps = () => ({
  message: text('message', 'Sample notification'),
  duration: number('duration', 10),
  variant: select('variant', variants, 'contained') as keyof typeof variants,
  kind: select('kind', kinds, 'default') as keyof typeof kinds,
});

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('notify', () => {
    const props = getNotificationProps();
    const { message, duration, ...rest } = props;

    const handleClick = () => {
      // @ts-ignore
      notify(message, { duration }, rest);
    };

    return <Button onClick={handleClick}>Notify me</Button>;
  });
