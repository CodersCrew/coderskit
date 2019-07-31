import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { Avatar } from 'coderskit';

const variants = {
  photo: 'photo',
  text: 'text',
};

const sizes = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
};

const shapes = {
  circle: 'circle',
  square: 'square',
};

storiesOf('Atoms', module).add('Avatar', () => {
  const props = {
    variant: select('variant', variants, 'text') as keyof typeof variants,
    children: text('children', 'AJ'),
    size: select('size', sizes, 3) as keyof typeof sizes,
    shape: select('shape', shapes, 'circle') as keyof typeof shapes,
    image: text('image', 'https://randomuser.me/api/portraits/men/52.jpg'),
  };

  const { children, ...rest } = props;

  return <Avatar {...rest}>{children}</Avatar>;
});
