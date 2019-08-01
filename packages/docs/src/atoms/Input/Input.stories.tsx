import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Input } from 'coderskit';

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

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Input',
    () => {
      const props = {
        disabled: boolean('disabled', false, inputGroup),
        dimensions: select('dimensions', dimensions, 'default', inputGroup) as keyof typeof dimensions,
        type: select('type', types, 'text', inputGroup) as keyof typeof types,
        placeholder: text('placeholder', 'Placeholder', inputGroup),
        name: text('name', 'input-name', inputGroup),
      };

      const statusProps = {
        status: select('status', statuses, 'default', statusGroup) as keyof typeof statuses,
        noIcon: boolean('noIcon', false, statusGroup),
      };

      const labelProps = {
        label: text('label', 'Label', labelGroup),
      };

      const messageProps = {
        help: text('help', 'Help message', messageGroup),
        error: boolean('error', false, messageGroup),
      };

      return (
        <Input.Field>
          <Input.Label htmlFor={props.name}>{labelProps.label}</Input.Label>
          <Input.Status {...statusProps}>
            <Input {...props} />
          </Input.Status>
          <Input.Message error={messageProps.error}>{messageProps.help}</Input.Message>
        </Input.Field>
      );
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=17%3A236',
      },
    },
  );
