import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, radios } from '@storybook/addon-knobs';
import { Radio, RadioGroup } from 'coderskit';

const layouts = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

storiesOf('Molecules', module)
  .addDecorator(withDesign)
  .add(
    'RadioGroup',
    () => {
      const props = {
        layout: radios('layout', layouts, 'vertical') as keyof typeof layouts,
        name: text('name', 'fruits'),
      };

      return (
        <RadioGroup {...props}>
          <Radio.Label>
            <Radio value="apple" /> Apple
          </Radio.Label>
          <Radio.Label>
            <Radio value="orange" /> Orange
          </Radio.Label>
          <Radio.Label>
            <Radio value="banana" /> Banana
          </Radio.Label>
        </RadioGroup>
      );
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=25%3A35',
      },
    },
  );
