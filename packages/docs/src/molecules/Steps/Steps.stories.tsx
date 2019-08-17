import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { Steps, Step } from 'coderskit';
import { Icon, colors as themeColors } from 'coderskit';

const labelLayouts = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

const stepStates = {
  success: 'success',
  error: 'error',
  active: 'active',
  pending: 'pending',
  unset: 'unset',
};

const colors = { unset: 'unset', ...Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {}) };

const getStepProps = () => ({
  state: select('state', stepStates, 'unset', 'Step') as keyof typeof stepStates,
  size: number('size', 32, undefined, 'Step'),
  color: select('color', colors, 'unset', 'Step') as keyof typeof colors,
  fontColor: select('fontColor', colors, 'unset', 'Step') as keyof typeof colors,
  label: text('label', 'Step label', 'Label'),
  labelLayout: select('labelLayout', labelLayouts, 'vertical', 'Label') as keyof typeof labelLayouts,
});

const setValues = (props = getStepProps()) => {
    const color = props.color === 'unset' ? undefined : props.color;
    const fontColor = props.fontColor === 'unset' ? undefined : props.fontColor;
    const state = props.state === 'unset' ? undefined : props.state;
  return { color, fontColor, state }
}

storiesOf('Steps', module)
  .add('Step with number', () => {
    const inheritedProps = getStepProps();

    const props = {
      ...inheritedProps,
      children: number('children', 1, undefined, 'Step'),
    };

    const { color, fontColor, state } = setValues();
    const { label, children, labelLayout, ...rest } = props;

    return (
      <Step {...rest} labelLayout={labelLayout} state={state}> 
        <Step.Content color={color} fontColor={fontColor} state={state} >
          {children} 
        </Step.Content>
        <Step.Label state={state}>
          {label}
        </Step.Label> 
      </Step>
      
    );
  })
  .add('Step with icon', () => {
    const inheritedProps = getStepProps();

    const props = {
      ...inheritedProps,
      children: text('children', 'check-solid.svg', 'Step'),
    };

    const { color, fontColor, state } = setValues();
    const { label, children, labelLayout, ...rest } = props;

    return (
      <Step {...rest} labelLayout={labelLayout} state={state}> 
        <Step.Content color={color} fontColor={fontColor} state={state} >
          <Icon src={children} />
        </Step.Content>
        <Step.Label state={state}>
          {label}
        </Step.Label> 
      </Step>
    );
  })
.add('StepGroup', () => {
  const props = {
    labelLayout: select('labelLayout', labelLayouts, 'vertical') as keyof typeof labelLayouts,
  };

  const label = 'Step label';
  const { labelLayout } = props;

  return (
    <Steps labelLayout= {labelLayout}> 
        <Step state="success">
          <Step.Content state="success">
            <Icon src="check-solid.svg" />
          </Step.Content>
          <Step.Label>
            {label}
          </Step.Label>
        </Step>
        <Step state="error">
          <Step.Content state="error">
            <Icon src="times-solid.svg" />
          </Step.Content>
          <Step.Label>
            {label}
          </Step.Label>
        </Step>
        <Step>
          <Step.Content></Step.Content>
          <Step.Label>
            {label}
          </Step.Label>
        </Step>
        <Step>
          <Step.Content></Step.Content>
          <Step.Label>
            {label}
          </Step.Label>
        </Step>
    </Steps>
  );
});
