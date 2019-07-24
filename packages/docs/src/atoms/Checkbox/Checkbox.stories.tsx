import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Checkbox } from 'coderskit';

storiesOf('Atoms', module).add('Checkbox', () => {
  const props = {
    disabled: boolean('disabled', false),
    children: text('children', 'Checkbox label'),
  };

  return <Checkbox {...props} />;
});
