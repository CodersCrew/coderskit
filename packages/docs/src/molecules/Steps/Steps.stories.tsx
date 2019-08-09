import React, { Children } from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { Steps, Step } from 'coderskit';
import { Icon, colors as themeColors } from 'coderskit';

const labelLayouts = {
    horizontal: 'horizontal',
    vertical: 'vertical'
}

const stepStates = {
  success: 'success',
  failure: 'failure',
  active: 'active',
  pending: 'pending',
  unset: 'unset'
}


const colors = { unset: 'unset', ...Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {}) };

const getStepProps = () => ({
    state: select('state', stepStates, 'unset') as keyof typeof stepStates,
    size: number('size', 32),
    color: select('color', colors, 'unset') as keyof typeof colors,
    fontColor: select('fontColor', colors, 'unset') as keyof typeof colors,
})


storiesOf('Steps', module)
  .add('Step with number', () => {

    const inheritedProps = getStepProps();
    
    const props = {
      ...inheritedProps,
      children: number('children', 1),
    };

    const color = props.color === 'unset' ? undefined : props.color;
    const fontColor = props.fontColor === 'unset' ? undefined : props.fontColor;
    const state = props.state === 'unset' ? undefined : props.state;

    const { children, ...rest } = props;

    return (
      <Step {...rest} color={color} fontColor={fontColor} state={state}>
        {children}
      </Step>
    );
  })
  .add('Step with icon', () => {

    const inheritedProps = getStepProps();
    
    const props = {
      ...inheritedProps,
      children: text('children', 'check-solid.svg'),
    };

    const color = props.color === 'unset' ? undefined : props.color;
    const fontColor = props.fontColor === 'unset' ? undefined : props.fontColor;
    const state = props.state === 'unset' ? undefined : props.state;

    const {children, ...rest } = props;

    return (
      <Step {...rest} color={color} fontColor={fontColor} state={state}>
        <Icon src={children} />
      </Step>
    );
  });

storiesOf('Steps', module).add('StepGroup', () => {
  const props = {
    labelLayout: select('labelLayout', labelLayouts, 'vertical') as keyof typeof labelLayouts,
  };

  return (
    <Steps {...props}>
      <Step state="success">
        <Icon src="check-solid.svg" />
      </Step>
      <Step state="failure">
        <Icon src="times-solid.svg" />
      </Step>
      <Step></Step>
      <Step></Step>
    </Steps>
  );

});