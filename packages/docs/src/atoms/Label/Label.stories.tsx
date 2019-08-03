import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, boolean } from '@storybook/addon-knobs';
import { Label } from 'coderskit';
import content from './Label.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=602%3A0',
};

const readme = { content };

const getLabelProps = () => ({
  children: text('children', 'Type something'),
  disabled: boolean('disabled', false),
});

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Label', () => {
    const props = getLabelProps();
    const { children, ...rest } = props;

    return <Label {...rest}>{children}</Label>;
  });
