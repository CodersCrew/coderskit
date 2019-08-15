import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { Menu } from 'coderskit';
import sidebar from './Menu.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=157%3A551',
};

const readme = { sidebar };

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Menu', () => {
    return (
      <>
        <Menu>
          <Menu.Item src="check-solid.svg" label="Dashboard" />
          <Menu.Item src="person.svg" label="About as" />
          <Menu.Sub src="basket.svg" label="Products" chevron>
            <Menu.Item label="Hardware" />
            <Menu.Item label="Software" />
            <Menu.Item label="Other" />
          </Menu.Sub>
          <Menu.Item src="message.svg" label="Contact" />
        </Menu>
      </>
    );
  });
