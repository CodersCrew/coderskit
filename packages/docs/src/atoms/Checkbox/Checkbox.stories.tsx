import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Checkbox } from 'coderskit';

storiesOf('Atoms', module).add('Checkbox', () => {
  const props = {
    disabled: boolean('disabled', false),
    name: text('name', 'checkbox'),
    label: text('label', 'Checkbox label content'),
  };

  const actions = {
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
  };

  const { label, ...rest } = props;

  return (
    <Checkbox.Label>
      <Checkbox {...rest} {...actions} />
      {label}
    </Checkbox.Label>
  );
});
