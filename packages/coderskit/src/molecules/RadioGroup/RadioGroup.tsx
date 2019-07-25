import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { RadioProps } from '../..';

export type RadioGroupLayout = 'vertical' | 'horizontal';

export interface RadioGroupProps extends React.HTMLAttributes<any> {
  name: string;
  children: React.ReactElement<RadioProps>[];
  layout?: RadioGroupLayout;
  spaceBetween?: number;
}

const RadioGroupContainer = styled.div<RadioGroupProps>(props => {
  const { layout, spaceBetween } = props;
  const isHorizontal = layout === 'horizontal';

  return {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',

    '.ck-radio + .ck-radio': {
      marginTop: !isHorizontal ? spaceBetween : 0,
      marginLeft: isHorizontal ? spaceBetween : 0,
    },
  };
});

export const RadioGroup = (props: RadioGroupProps) => {
  const { children, name } = props;
  const className = classnames(props.className, 'ck-radio-group');
  const childrenWithNames = React.Children.map(children, child => React.cloneElement(child, { name }));

  return (
    <RadioGroupContainer {...props} className={className}>
      {childrenWithNames}
    </RadioGroupContainer>
  );
};

RadioGroup.defaultProps = {
  options: [],
  layout: 'vertical',
  spaceBetween: 12,
};
