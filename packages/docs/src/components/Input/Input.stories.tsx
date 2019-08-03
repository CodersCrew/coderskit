import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Input, Label, FieldMessage } from 'coderskit';
import content from './Input.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=17%3A236',
};

const readme = { content };

const inputGroup = 'Input';
const statusGroup = '.Status';
const labelGroup = '.Label';
const messageGroup = '.Message';

const dimensions = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const statuses = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading',
};

const types = {
  password: 'password',
  text: 'text',
};

const getInputProps = () => ({
  disabled: boolean('disabled', false, inputGroup),
  dimensions: select('dimensions', dimensions, 'default', inputGroup) as keyof typeof dimensions,
  type: select('type', types, 'text', inputGroup) as keyof typeof types,
  placeholder: text('placeholder', 'Placeholder', inputGroup),
  name: text('name', 'input-name', inputGroup),
});

const getStatusProps = () => ({
  status: select('status', statuses, 'default', statusGroup) as keyof typeof statuses,
  noIcon: boolean('noIcon', false, statusGroup),
});

const getLabelProps = () => ({
  label: text('label', 'Label', labelGroup),
});

const getMessageProps = () => ({
  help: text('help', 'Help message', messageGroup),
  error: boolean('error', false, messageGroup),
});

storiesOf('Atoms|Input', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Default input', () => {
    const props = getInputProps();
    const statusProps = getStatusProps();
    const labelProps = getLabelProps();
    const messageProps = getMessageProps();

    return (
      <Input.Field>
        <Label htmlFor={props.name}>{labelProps.label}</Label>
        <Input.Status {...statusProps}>
          <Input {...props} />
        </Input.Status>
        <FieldMessage error={messageProps.error}>{messageProps.help}</FieldMessage>
      </Input.Field>
    );
  });