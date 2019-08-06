import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text } from '@storybook/addon-knobs';
import { Divider } from 'coderskit';
import sidebar from './Divider.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=112%3A446',
};

const readme = { sidebar };

const getDividerProps = () => ({
  children: text('children', 'Label text'),
});

const getDividerWithoutTextProps = () => ({
  children: text('children', ''),
});

storiesOf('Atoms|Divider', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Divider with text', () => {
    const props = getDividerProps();
    const { children } = props;

    return <Divider>{children}</Divider>;
  })
  .add('Divider without text', () => {
    const props = getDividerWithoutTextProps();
    const { children } = props;

    return <Divider>{children}</Divider>;
  });
