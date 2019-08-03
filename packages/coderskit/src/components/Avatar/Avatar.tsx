import React, { HTMLAttributes, ElementType } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Theme } from '../..';

export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType | string;
  shape?: AvatarShape;
  size?: number;
  src?: string;
  [key: string]: any;
}

const calcRadius = (size?: number, shape?: string): string => {
  if (shape === 'circle') {
    return '100%';
  } else if (size! >= 32) {
    return '8px';
  } else {
    return '4px';
  }
};

const calcFontSize = (size?: number): string => {
  if (size! <= 16) {
    return `${size! / 2 + 2}px`;
  } else if (size! <= 24) {
    return `${size! / 2}px`;
  } else {
    return `${size! / 2 - 2}px`;
  }
};

const calcFontWeight = (size: number, theme: Theme): number => theme.fontWeights[size! <= 32 ? 'medium' : 'bold'];

const AvatarBase = styled.div<AvatarProps>(props => {
  const { shadows } = props.theme;
  const { size, shape } = props;

  const dimension = `${size}px`;

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    border: 'none',
    borderRadius: calcRadius(size, shape),
    width: dimension,
    height: dimension,
    boxShadow: shadows.xs,
  };
});

const AvatarText = styled(AvatarBase)(props => {
  const { colors } = props.theme;
  const { size } = props;

  return {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: calcFontSize(size),
    fontWeight: calcFontWeight(size, props.theme),
    textTransform: 'uppercase',
    textAlign: 'center',
  };
});

const AvatarImg = styled(AvatarBase)(props => {
  return {
    background: `url(${props.src})`,
    backgroundSize: 'cover',
    color: 'transparent',
  };
});

export const Avatar = ({ children, className, ...props }: AvatarProps) => {
  const AvatarContainer = props.src ? AvatarImg : AvatarText;

  return (
    <AvatarContainer {...props} className={classnames(className, 'ck-avatar')}>
      {props.src ? null : children}
    </AvatarContainer>
  );
};

Avatar.defaultProps = {
  size: 32,
  shape: 'circle',
  children: '',
  src: '',
};
