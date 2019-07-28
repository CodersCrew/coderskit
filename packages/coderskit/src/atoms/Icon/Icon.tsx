import React, { HTMLAttributes, ReactNode, ElementType } from 'react';
import SVG from 'react-inlinesvg';
import classnames from 'classnames';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeColorsKeys } from '../..';

export interface IconProps extends HTMLAttributes<any> {
  size?: number;
  src?: string;
  spin?: boolean;
  color?: ThemeColorsKeys;
  icon?: ElementType;
  hoverable?: boolean;
  visible?: boolean;
  children?: ReactNode;
}

const spinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const IconContainer = styled.div<IconProps>(props => {
  const { colors } = props.theme;
  const { size, color, spin, hoverable, visible } = props;

  return {
    display: 'inline-flex',
    color: colors[color!],
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`,
    visibility: visible ? 'visible' : 'hidden',

    '.isvg > svg, svg': {
      width: '100%',
      height: '100%',
      animation: `${spinKeyframes} 1s linear`,
      animationIterationCount: spin ? 'infinite' : 0,
      cursor: hoverable ? 'pointer' : 'inherit',
      fill: 'currentColor',
      path: {
        fill: 'currentColor',
      },
    },
  };
});

const StyledIcon = styled(SVG)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Icon = (props: IconProps) => {
  const { children, src, icon } = props;
  const Component = icon!;
  const className = classnames(props.className, 'ck-icon');

  return (
    <IconContainer {...props} className={className}>
      {src ? <StyledIcon src={src}>{children}</StyledIcon> : icon ? <Component /> : null}
    </IconContainer>
  );
};

Icon.defaultProps = {
  size: 16,
  color: 'gray',
  hoverable: false,
  visible: true,
};
