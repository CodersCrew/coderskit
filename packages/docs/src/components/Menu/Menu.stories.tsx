import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { Menu, Item, Icon, Sub } from 'coderskit';
import content from './Menu.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=31%3A28',
};

const readme = { content };

const menuGroup = 'Menu';

const elements = {
  a: 'a',
  button: 'button',
  div: 'div',
  span: 'span',
};

const getMenuWithoutImageProps = () => ({
  as: select('as', elements, 'button', menuGroup) as keyof typeof elements,
  children: text('children', 'Menu', menuGroup),
  size: number('size', 32, undefined, menuGroup),
});

const getMenuProps = () => ({
  ...getMenuWithoutImageProps(),
  src: text('src', 'https://randomuser.me/api/portraits/men/52.jpg', menuGroup),
});

storiesOf('Atoms|Menu', module)
  .addParameters({ design, readme })
  .add('Menu', () => {
    const props = getMenuProps();
    const { children, ...rest } = props;

    return (
      <>
        <Menu>
          <Item src="check-solid.svg" label="Dashboard" />
          <Item src="person.svg" label="About as" />
          <Sub src="basket.svg" label="Products" />
          <Item src="message.svg" label="Contact" />
        </Menu>
      </>
    );
  });
