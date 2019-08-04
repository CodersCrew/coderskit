import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { Avatar } from 'coderskit';
import content from './Avatar.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=31%3A28',
};

const readme = { content };

const avatarGroup = 'Avatar';

const shapes = {
  circle: 'circle',
  square: 'square',
};

const elements = {
  a: 'a',
  button: 'button',
  div: 'div',
  span: 'span',
};

const getAvatarWithoutImageProps = () => ({
  as: select('as', elements, 'button', avatarGroup) as keyof typeof elements,
  children: text('children', 'AJ', avatarGroup),
  shape: select('shape', shapes, 'circle', avatarGroup) as keyof typeof shapes,
  size: number('size', 32, undefined, avatarGroup),
});

const getAvatarProps = () => ({
  ...getAvatarWithoutImageProps(),
  src: text('src', 'https://randomuser.me/api/portraits/men/52.jpg', avatarGroup),
});

storiesOf('Atoms|Avatar', module)
  .addParameters({ design, readme })
  .add('Avatar with image', () => {
    const props = getAvatarProps();
    const { children, ...rest } = props;

    return (
      <>
        <Avatar {...rest}>{children}</Avatar>
        <Avatar {...rest} src={undefined}>
          {children}
        </Avatar>
      </>
    );
  })
  .add('Avatar without image', () => {
    const props = getAvatarWithoutImageProps();
    const { children, ...rest } = props;

    return <Avatar {...rest}>{children}</Avatar>;
  });
