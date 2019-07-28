import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { Avatar } from 'coderskit';

const variants = {
  img: 'img',
  text: 'text',
};

const sizes = {
  tiny: 'tiny',
  small: 'small',
  default: 'default',
  large: 'large',
};

const shapes = {
  circle: 'circle',
  square: 'square',
};

storiesOf('Atoms', module).add('Avatar', () => {
  const props = {
    variant: select('variant', variants, 'text') as keyof typeof variants,
    children: text('children', 'AJ'),
    size: select('size', sizes, 'default') as keyof typeof sizes,
    shape: select('shape', shapes, 'circle') as keyof typeof shapes,
  };

  const { children, ...rest } = props;

  return <Avatar {...rest}>{children}</Avatar>;
});
