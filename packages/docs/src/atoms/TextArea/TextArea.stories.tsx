import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { TextArea } from 'coderskit';

const textAreaGroup = 'TextArea';
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

const resize = {
  none: 'none',
  both: 'both',
  horizontal: 'horizontal',
  vertical: 'vertical',
};

storiesOf('Atoms', module).add('TextArea', () => {
  const props = {
    disabled: boolean('disabled', false, textAreaGroup),
    dimensions: select('dimensions', dimensions, 'default', textAreaGroup) as keyof typeof dimensions,
    resize: select('resize', resize, 'none', textAreaGroup) as keyof typeof resize,
    placeholder: text('placeholder', 'Placeholder', textAreaGroup),
    name: text('name', 'text-area-name', textAreaGroup),
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
    <TextArea.Field>
      <TextArea.Label htmlFor={props.name}>{labelProps.label}</TextArea.Label>
      <TextArea.Status {...statusProps}>
        <TextArea {...props} />
      </TextArea.Status>
      <TextArea.Message error={messageProps.error}>{messageProps.help}</TextArea.Message>
    </TextArea.Field>
  );
});
