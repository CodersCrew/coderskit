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

const AvatarBase = styled.div<AvatarProps>(props => {
  const { shadows } = props.theme;
  const { size, shape } = props;

  const calcRadius = () => {
    if (shape === 'circle') {
      return '100%';
    } else if (size === 1 || size === 2) {
      return '4px';
    } else {
      // handles size === 3, size === 4 and any other size
      return '8px';
    }
  };

  const calcDimensions = () => {
    if (size === 1) {
      return '16px';
    } else if (size === 2) {
      return '24px';
    } else if (size === 3) {
      return '32px';
    } else {
      // handles size === 4 and other size
      return '40px';
    }
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    border: 'none',
    borderRadius: calcRadius(),
    width: calcDimensions(),
    height: calcDimensions(),
    boxShadow: shadows.xs,
  };
});

const AvatarText = styled(AvatarBase)(props => {
  const { colors, fontSizes, lineHeights, fontWeights } = props.theme;
  const { size } = props;

  const calcLineHeight = () => {
    if (size === 1 || size === 2) {
      return lineHeights.caption1;
    } else {
      // handles size === 3, size === 4 and any other size
      return lineHeights.body1;
    }
  };

  const calcFontSize = () => {
    if (size === 1) {
      return fontSizes.caption2;
    } else if (size === 2) {
      return fontSizes.caption1;
    } else if (size === 3) {
      return fontSizes.body2;
      // handles size === 4 and any other size
    } else {
      return fontSizes.h3;
    }
  };

  const calcFontWeight = () => {
    if (size === 1 || size === 2) {
      return fontWeights.medium;
      // handles size === 3, size === 4 and any other size
    } else {
      return fontWeights.bold;
    }
  };

  return {
    backgroundColor: colors.primary,
    color: colors.white,
    lineHeight: calcLineHeight(),
    fontSize: calcFontSize(),
    fontWeight: calcFontWeight(),
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
  variant: 'photo',
  size: 3,
  shape: 'circle',
  children: '',
  image: 'https://randomuser.me/api/portraits/men/52.jpg',
};
