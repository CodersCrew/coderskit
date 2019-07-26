import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Checkbox } from 'coderskit';

storiesOf('Atoms', module).add('Checkbox', () => {
  const props = {
    disabled: boolean('disabled', false),
    children: text('children', 'Checkbox label'),
    name: text('name', 'checkbox'),
  };

  const actions = {
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
  };

  return <Checkbox {...props} {...actions} />;
});
