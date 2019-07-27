import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Switch } from 'coderskit';

storiesOf('Atoms', module).add('Switch', () => {
  const props = {
    disabled: boolean('disabled', false),
    name: text('name', 'switch-name'),
    label: text('label', 'Switch label content'),
  };

  const actions = {
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
  };

  const { label, ...rest } = props;

  return (
    <Switch.Label>
      <Switch {...rest} {...actions} /> {label}
    </Switch.Label>
  );
});
