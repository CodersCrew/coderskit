import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import { boolean, text, radios } from '@storybook/addon-knobs';
import { Radio } from 'coderskit';
import content from './Radio.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=25%3A35',
};

const readme = { content };

const radioGroup = 'Radio';
const labelGroup = '.Label';
const radioGroupGroup = '.Group';

const layouts = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

const getRadioProps = () => ({
  disabled: boolean('disabled', false, radioGroup),
  name: text('name', 'radio', radioGroup),
});

const getLabelProps = () => ({
  children: text('children', 'Radio label', labelGroup),
});

const getRadioGroupProps = () => ({
  layout: radios('layout', layouts, 'vertical', radioGroupGroup) as keyof typeof layouts,
  name: text('name', 'fruits', radioGroupGroup),
});

const getRadioGroupActions = () => ({
  onChange: action('onChange'),
});

storiesOf('Atoms|Radio', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Only radio', () => {
    const props = getRadioProps();

    return <Radio {...props} />;
  })
  .add('Radio with label', () => {
    const props = getRadioProps();
    const { children } = getLabelProps();

    return (
      <Radio.Label>
        <Radio {...props} /> {children}
      </Radio.Label>
    );
  })
  .add('Radio group', () => {
    const props = getRadioGroupProps();
    const actions = getRadioGroupActions();

    return (
      <Radio.Group {...props} {...actions}>
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
