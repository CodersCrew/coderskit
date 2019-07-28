import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { TextArea } from 'coderskit';

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

storiesOf('Atoms', module).add('TextArea', () => {
  const props = {
    disabled: boolean('disabled', false),
    dimensions: select('dimensions', dimensions, 'default') as keyof typeof dimensions,
    placeholder: text('placeholder', 'Placeholder'),
    name: text('name', 'text-area-name'),
  };

  const statusProps = {
    status: select('status', statuses, 'success') as keyof typeof statuses,
  };

  // const fieldProps = {
  //   label: text('label', 'Label'),
  //   error: text('error', ''),
  //   help: text('help', 'Help message'),
  // };

  return (
    <TextArea.Status {...statusProps}>
      <TextArea {...props} />
    </TextArea.Status>
  );
});
