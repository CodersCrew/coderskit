import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import { boolean, text } from '@storybook/addon-knobs';
import { Checkbox } from 'coderskit';
import content from './Checkbox.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=30%3A52',
};

const readme = { content };

const checkboxGroup = 'Checkbox';
const labelGroup = '.Label';

const getCheckboxProps = () => ({
  disabled: boolean('disabled', false, checkboxGroup),
  name: text('name', 'checkbox', checkboxGroup),
});

const getChackboxWithLabelProps = () => ({
  ...getCheckboxProps(),
  children: text('children', 'Checkbox label content', labelGroup),
});

const getCheckboxActions = () => ({
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
});

storiesOf('Atoms|Checkbox', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Only checkbox', () => {
    const props = getCheckboxProps();
    const actions = getCheckboxActions();

    return <Checkbox {...props} {...actions} />;
  })
  .add('Checkbox with label', () => {
    const { children, ...props } = getChackboxWithLabelProps();
    const actions = getCheckboxActions();

    return (
      <Checkbox.Label>
        <Checkbox {...props} {...actions} /> {children}
      </Checkbox.Label>
    );
  });
