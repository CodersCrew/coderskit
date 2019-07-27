import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { RadioProps } from '../..';

export type RadioGroupLayout = 'vertical' | 'horizontal';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  children: React.ReactElement<RadioProps>[];
  layout?: RadioGroupLayout;
  spaceBetween?: number;
}

type RadioGroupWrapperProps = Omit<RadioGroupProps, 'name' | 'children'>;

const RadioGroupWrapper = styled.div<RadioGroupWrapperProps>(props => {
  const { layout, spaceBetween } = props;
  const isHorizontal = layout === 'horizontal';

  return {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',

    '.ck-radio-label + .ck-radio-label': {
      marginTop: !isHorizontal ? spaceBetween : 0,
      marginLeft: isHorizontal ? spaceBetween : 0,
    },
  };
});

export const RadioGroup = ({ name, children, ...props }: RadioGroupProps) => {
  const childrenWithNames = React.Children.map(children, child => {
    const children = React.Children.map(child.props.children as ReactElement[], innerChild => {
      if (innerChild.props && innerChild.props.value) {
        return React.cloneElement(innerChild, { name });
      }

      return innerChild;
    });

    return React.cloneElement(child, {}, children);
  });

  return (
    <RadioGroupWrapper {...props} className={classnames(props.className, 'ck-radio-group')}>
      {childrenWithNames}
    </RadioGroupWrapper>
  );
};

RadioGroup.defaultProps = {
  options: [],
  layout: 'vertical',
  spaceBetween: 12,
};
