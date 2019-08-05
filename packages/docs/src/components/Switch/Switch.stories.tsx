import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Switch } from 'coderskit';
import content from './Switch.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=25%3A66',
};

const readme = { content };

const switchGroup = 'Switch';
const labelGroup = '.Label';

const getSwitchProps = () => ({
  disabled: boolean('disabled', false, switchGroup),
  name: text('name', 'switch', switchGroup),
});

const getLabelProps = () => ({
  children: text('children', 'Switch label', labelGroup),
});

const getSwitchActions = () => ({
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
});

storiesOf('Atoms|Switch', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Only switch', () => {
    const props = getSwitchProps();
    const actions = getSwitchActions();

    return <Switch {...props} {...actions} />;
  })
  .add('Switch with label', () => {
    const props = getSwitchProps();
    const actions = getSwitchActions();
    const { children } = getLabelProps();

    return (
      <Switch.Label>
        <Switch {...props} {...actions} /> {children}
      </Switch.Label>
    );
  });
