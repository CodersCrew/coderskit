import React, { HTMLAttributes, ReactNode, ReactElement } from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { ThemeColorsKeys } from '../..';

export type LabelLayout = 'vertical' | 'horizontal'

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  labelLayout?: LabelLayout; 
  activeStep?: number;
  pendingSteps?: [];
}

export type StepState = 'success' | 'failure' | 'active' | 'pending';

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  number?: number;
  state?: StepState;
  size?: number;
  color?: ThemeColorsKeys;
  fontColor?: ThemeColorsKeys;
}

export const StepBase = styled.div<StepProps>(props => {
   const { colors } = props.theme;
   const color = colors[props.color!];
   const fontColor = colors[props.fontColor!];

  return {
    display: 'flex',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${color}`,
    backgroundColor: color,
    color: fontColor,
    width: props.size,
    height: props.size,
  };
});

const StepSuccess = styled(StepBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.white,
  };
});

const StepFailure = styled(StepBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.error,
    borderColor: colors.error,
    color: colors.white,
  };
});

const StepActive = styled(StepBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    color: colors.primary,
  };
});

const StepPending = styled(StepBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.white,
    borderColor: colors.fontDisabled,
    color: colors.fontDisabled,
  };
});


export const Step = (props: StepProps) => {
  const className = classnames(props.className, 'ck-step');

  const StepContainer = props.state === 'success'? StepSuccess : props.state === 'failure' ? StepFailure : props.state === 'active' ? StepActive : props.state === 'pending' ? StepPending : StepBase;
  
  return (
    <StepContainer {...props} className={className}>
      {props.children}
    </StepContainer>
  );
};

const StepsWrapper = styled.div<StepsProps>(props => {

  return {
    display: 'flex',
  }
});


export const Steps = ({children, ...props}: StepsProps) => {
  const className = classnames(props.className, 'ck-steps');

  const childrenStatus = React.Children.map(children, (child, index) => {
  
    if (index === props.activeStep) {
      return React.cloneElement(child as ReactElement, { state: 'active' });
    } else if (index > props.activeStep!) {
      return React.cloneElement(child as ReactElement, { state: 'pending' });
    }
    return child;
  });

    return (
      <StepsWrapper {...props} className={className}>
        {childrenStatus}
      </StepsWrapper>
    );
};


Step.defaultProps = {
  fontColor: 'white',
  color: 'primary',
  size: 32,
  children: '',
};

Steps.defaultProps = {
  activeStep: 2
};