import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Switch } from 'coderskit';
import content from './Switch.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=24%3A28',
};

const readme = { content };

const getSwitchProps = () => ({
  disabled: boolean('disabled', false),
  name: text('name', 'switch-name'),
  label: text('label', 'Switch label content'),
});

const getSwitchActions = () => ({
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
});

storiesOf('Atoms|Switch', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Default switch', () => {
    const props = getSwitchProps();
    const actions = getSwitchActions();

    const { label, ...rest } = props;

    return (
      <Switch.Label>
        <Switch {...rest} {...actions} /> {label}
      </Switch.Label>
    );
  });
