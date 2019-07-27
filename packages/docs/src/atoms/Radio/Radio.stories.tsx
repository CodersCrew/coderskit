import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Radio } from 'coderskit';

storiesOf('Atoms', module).add('Radio', () => {
  const props = {
    disabled: boolean('disabled', false),
    label: text('label', 'Radio label'),
  };

  const { label, ...rest } = props;

  return (
    <Radio.Label>
      <Radio {...rest} />
      <span>{label}</span>
    </Radio.Label>
  );
});
