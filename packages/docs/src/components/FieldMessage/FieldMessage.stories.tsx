import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, boolean } from '@storybook/addon-knobs';
import { FieldMessage } from 'coderskit';
import content from './FieldMessage.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=600%3A796',
};

const readme = { content };

const getFieldMessageProps = () => ({
  children: text('children', 'Type something'),
  error: boolean('error', false),
});

storiesOf('Atoms|FieldMessage', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Default message', () => {
    const props = getFieldMessageProps();
    const { children, ...rest } = props;

    return <FieldMessage {...rest}>{children}</FieldMessage>;
  });