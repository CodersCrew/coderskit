import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { boolean, text } from '@storybook/addon-knobs';
import { Radio } from 'coderskit';

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Radio',
    () => {
      const props = {
        disabled: boolean('disabled', false),
        label: text('label', 'Radio label'),
      };

      const { label, ...rest } = props;

      return (
        <Radio.Label>
          <Radio {...rest} /> {label}
        </Radio.Label>
      );
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=25%3A35',
      },
    },
  );
