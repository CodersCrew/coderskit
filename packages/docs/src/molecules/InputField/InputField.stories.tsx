import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text, number } from '@storybook/addon-knobs';
import { InputField } from 'coderskit';

const sizes = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const states = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading',
};

const types = {
  email: 'email',
  hidden: 'hidden',
  password: 'password',
  search: 'search',
  tel: 'tel',
  text: 'text',
  url: 'url',
};

storiesOf('Molecules', module).add('InputField', () => {
  const props = {
    disabled: boolean('disabled', false),
    label: text('label', 'Label'),
    error: text('error', 'Error message'),
    name: text('name', 'field'),
  };

  const input = {
    placeholder: text('placeholder', 'Placeholder'),
    state: select('state', states, 'default') as keyof typeof states,
    hasFeedback: boolean('hasFeedback', true),
    size: select('size', sizes, 'default') as keyof typeof sizes,
    type: select('type', types, 'text') as keyof typeof types,
    width: number('width', 240),
  };

  return <InputField {...props} input={input} />;
});
