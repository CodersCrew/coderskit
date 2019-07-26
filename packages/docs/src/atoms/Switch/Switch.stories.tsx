import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Omit } from 'utility-types';
import { Switch, SwitchProps } from 'coderskit';

const Comp = (props: Omit<SwitchProps, 'checked'>) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (value: boolean, e: any, id: string) => {
    props.onChange(value, e, id);
    setChecked(value);
  };

  return <Switch {...props} checked={checked} onChange={handleChange} />;
};

storiesOf('Atoms', module).add('Switch', () => {
  const props = {
    children: text('children', 'Some radio label'),
    name: text('name', 'switch-name'),
    disabled: boolean('disabled', false),
  };

  const actions = {
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
  };

  return <Comp {...props} {...actions} />;
});
