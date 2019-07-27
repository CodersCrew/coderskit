import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Input } from 'coderskit';

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

storiesOf('Atoms', module).add('Input', () => {
  const props = {
    disabled: boolean('disabled', false),
    dimensions: select('dimensions', dimensions, 'default') as keyof typeof dimensions,
    type: select('type', types, 'text') as keyof typeof types,
    placeholder: text('placeholder', 'Placeholder'),
    name: text('name', 'input-name'),
  };

  const statusProps = {
    status: select('status', statuses, 'default') as keyof typeof statuses,
  };

  const fieldProps = {
    label: text('label', 'Label'),
    error: text('error', ''),
    help: text('help', 'Help message'),
  };

  return (
    <Input.Field {...fieldProps}>
      <Input.Status {...statusProps}>
        <Input {...props} />
      </Input.Status>
    </Input.Field>
  );
});
