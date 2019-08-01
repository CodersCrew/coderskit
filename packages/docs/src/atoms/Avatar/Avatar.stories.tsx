import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { Avatar } from 'coderskit';

const variants = {
  photo: 'photo',
  text: 'text',
};

const shapes = {
  circle: 'circle',
  square: 'square',
};

storiesOf('Atoms', module).add('Avatar', () => {
  const props = {
    variant: select('variant', variants, 'text') as keyof typeof variants,
    shape: select('shape', shapes, 'circle') as keyof typeof shapes,
    size: number('size', 32),
    children: text('children', 'AJ'),
    image: text('image', 'https://randomuser.me/api/portraits/men/52.jpg'),
  };

  const { children, ...rest } = props;

  return <Avatar {...rest}>{children}</Avatar>;
});
