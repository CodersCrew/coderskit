import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { Steps, Step } from 'coderskit';

const labelLayouts = {
    horizontal: 'horizontal',
    vertical: 'vertical'
}


storiesOf('Molecules', module).add('Steps', () => {
  const props = {
    labelLayout: select('labelLayout', labelLayouts, 'vertical') as keyof typeof labelLayouts,
  };

  return (
    <Steps {...props}>
      <Step></Step>
      <Step></Step>
      <Step></Step>
      <Step></Step>
    </Steps>
  );

});