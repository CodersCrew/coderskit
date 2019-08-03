import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { boolean, text, radios } from '@storybook/addon-knobs';
import { Radio } from 'coderskit';
import content from './Radio.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=25%3A35',
};

const readme = { content };

const radioGroup = 'Radio';
const radioGroupGroup = '.Group';

const layouts = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

const getRadioProps = () => ({
  disabled: boolean('disabled', false, radioGroup),
  label: text('label', 'Radio label', radioGroup),
});

const getRadioGroupProps = () => ({
  layout: radios('layout', layouts, 'vertical', radioGroupGroup) as keyof typeof layouts,
  name: text('name', 'fruits', radioGroupGroup),
});

storiesOf('Atoms|Radio', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Default radio', () => {
    const props = getRadioProps();
    const { label, ...rest } = props;

    return (
      <Radio.Label>
        <Radio {...rest} /> {label}
      </Radio.Label>
    );
  })
  .add('Radio group', () => {
    const radioGroupProps = getRadioGroupProps();

    return (
      <Radio.Group {...radioGroupProps}>
        <Radio.Label>
          <Radio value="apple" /> Apple
        </Radio.Label>
        <Radio.Label>
          <Radio value="orange" /> Orange
        </Radio.Label>
        <Radio.Label>
          <Radio value="banana" /> Banana
        </Radio.Label>
      </Radio.Group>
    );
  });
