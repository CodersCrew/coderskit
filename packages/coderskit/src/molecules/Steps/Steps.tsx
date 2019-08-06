import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { ThemeColorsKeys } from '../..';

export type LabelLayout = 'vertical' | 'horizontal'

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  labelLayout?: LabelLayout; 
}

export type StepState = 'success' | 'failure';
export type StepVariant = 'outlined' | 'contained';

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  stepState?: StepState;
  variant?: StepVariant;
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
    color: fontColor,
    width: props.size,
    height: props.size,
  };
});

const StepContained = styled(StepBase)(props => {
  const { colors } = props.theme;
  const color = colors[props.color!];
  

  return {
    backgroundColor: color,
  };
});

const StepOutlined = styled(StepBase)(props => {
  const { colors } = props.theme;
  const color = colors[props.color!];

  return {
    backgroundColor: colors.white,
  };
});

export const Step = (props: StepProps) => {
  const className = classnames(props.className, 'ck-step');

  const StepContainer = props.variant === 'contained' ? StepContained : StepOutlined;

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


export const Steps = (props: StepsProps) => {
  const className = classnames(props.className, 'ck-steps');


    return (
      <StepsWrapper {...props} className={className}>
        {props.children}
      </StepsWrapper>
    );
};


Step.defaultProps = {
  size: 32,
  variant: 'contained',
  children: '',
  color: 'primary',
  fontColor: 'white'
};