import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export type AvatarVariant = 'photo' | 'text';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<any> {
  variant?: AvatarVariant;
  size?: number;
  shape?: AvatarShape;
  image?: string;
  children?: React.ReactNode;
}

const calcDimensions = (size?: number): string => {
  return `${size}px`;
};

const calcRadius = (size?: number, shape?: string): string => {
  if (shape === 'circle') {
    return '100%';
  } else if (size! >= 32) {
    return '8px';
  } else {
    return '4px';
  }
};

const AvatarBase = styled.div<AvatarProps>(props => {
  const { shadows } = props.theme;
  const { size, shape } = props;

  const dimension: string = calcDimensions(size);

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

const calcFontSize = (size?: number): string => {
  if (size! <= 16) {
    return `${size! / 2 + 2}px`;
  } else if (size! <= 24) {
    return `${size! / 2}px`;
  } else {
    return `${size! / 2 - 2}px`;
  }
};

const calcFontWeight = (size?: number, theme?: any): number => {
  const { fontWeights } = theme;

  if (size! <= 32) {
    return fontWeights.medium;
  } else {
    return fontWeights.bold;
  }
};

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
    background: `url(${props.image})`,
    backgroundSize: 'cover',
    color: 'transparent',
  };
});

export const Avatar = (props: AvatarProps) => {
  const className = classnames(props.className, 'ck-avatar');

  const AvatarContainer = props.variant === 'photo' ? AvatarImg : AvatarText;

  return (
    <AvatarContainer {...props} className={className}>
      {props.children}
    </AvatarContainer>
  );
};

Avatar.defaultProps = {
  variant: 'text',
  size: 32,
  shape: 'circle',
  children: '',
  image: 'https://randomuser.me/api/portraits/men/52.jpg',
};
