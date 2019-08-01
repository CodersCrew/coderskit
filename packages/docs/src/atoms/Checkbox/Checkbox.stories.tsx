import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import { boolean, text } from '@storybook/addon-knobs';
import { Checkbox } from 'coderskit';

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Checkbox',
    () => {
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
          <Checkbox {...rest} {...actions} /> {label}
        </Checkbox.Label>
      );
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=30%3A52',
      },
    },
  );
