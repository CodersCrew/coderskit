import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { Icon, IconProps } from '../..';
import { Label } from '../..';

export type LabelLayout = 'vertical' | 'horizontal'

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  labelLayout?: LabelLayout; 
}

export type StepState = 'success' | 'failure' | 'active' | 'pending';

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    stepState?: StepState;
}

export const StepContainer = styled.div<StepProps>(props => {
   const { colors } = props.theme;


  return {
    display: 'flex',
    borderRadius: '100%',
    border: `1px solid ${colors.primary}`,
    width: '32px',
    height: '32px',
  };
});

export const Step = (props: StepProps) => {
  const className = classnames(props.className, 'ck-step');

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