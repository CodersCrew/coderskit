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

  const findRadius = (shape?: string, size?: number) => {
    const radius = shape === 'circle' ? '100%' : size === 1 ? '4px' : size === 2 ? '4px' : '8px';
    return radius;
  };

  const findDimensions = (size?: number) => {
    let dimensions;

    if (size === 1) {
      dimensions = '16px';
    } else if (size === 2) {
      dimensions = '24px';
    } else if (size === 3) {
      dimensions = '32px';
    } else if (size === 4) {
      dimensions = '40px';
    }
    return dimensions;
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    border: 'none',
    borderRadius: findRadius(props.shape, props.size),
    width: findDimensions(props.size),
    height: findDimensions(props.size),
    boxShadow: shadows.xs,
  };
});

const AvatarText = styled(AvatarBase)(props => {
  const { colors, fontSizes, lineHeights, fontWeights } = props.theme;

  const findLineHeight = (size?: number, theme?: any) => {
    theme.lineHeights = lineHeights;
    let lineHeight;

    if (size === 1) {
      lineHeight = lineHeights.caption1;
    } else if (size === 2) {
      lineHeight = lineHeights.caption1;
    } else if (size === 3) {
      lineHeight = lineHeights.body1;
    } else if (size === 4) {
      lineHeight = lineHeights.body1;
    }
    return lineHeight;
  };

  const findFontSize = (size?: number, theme?: any) => {
    theme.fontSizes = fontSizes;
    let fontSize;

    if (size === 1) {
      fontSize = fontSizes.caption2;
    } else if (size === 2) {
      fontSize = fontSizes.caption1;
    } else if (size === 3) {
      fontSize = fontSizes.body2;
    } else if (size === 4) {
      fontSize = fontSizes.h3;
    }
    return fontSize;
  };

  const findFontWeight = (size?: number, theme?: any) => {
    theme.fontWeights = fontWeights;
    let fontWeight;

    if (size === 1) {
      fontWeight = fontWeights.medium;
    } else if (size === 2) {
      fontWeight = fontWeights.medium;
    } else if (size === 3) {
      fontWeight = fontWeights.bold;
    } else if (size === 4) {
      fontWeight = fontWeights.bold;
    }
    return fontWeight;
  };

  return {
    backgroundColor: colors.primary,
    color: colors.white,
    lineHeight: findLineHeight(props.size, props.theme),
    fontSize: findFontSize(props.size, props.theme),
    fontWeight: findFontWeight(props.size, props.theme),
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
