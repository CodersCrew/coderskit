import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { FieldMessage } from 'coderskit';

storiesOf('Atoms', module).add('FieldMessage', () => {
  const props = {
    children: text('children', 'Type something'),
    error: boolean('error', false),
  };

  const { children, ...rest } = props;

  return <FieldMessage {...rest}>{children}</FieldMessage>;
});
