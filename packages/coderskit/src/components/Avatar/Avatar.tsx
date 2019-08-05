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

const calcRadius = (size: number, shape?: AvatarShape) => {
  if (shape === 'circle') return '100%';
  else if (size >= 32) return '8px';
  else return '4px';
};

const calcFontSize = (size: number) => {
  if (size <= 16) return `${size / 2 + 2}px`;
  else if (size <= 24) return `${size / 2}px`;
  else return `${size / 2 - 2}px`;
};

const calcFontWeight = (size: number, theme: Theme): number => theme.fontWeights[size! <= 32 ? 'medium' : 'bold'];

const AvatarBase = styled.div<AvatarProps>(({ size, shape, theme: { shadows } }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  border: 'none',
  boxShadow: shadows.xs,
  borderRadius: calcRadius(size!, shape),
  width: size,
  height: size,
}));

const AvatarText = styled(AvatarBase)<AvatarProps>(({ size, theme }) => {
  const { colors } = theme;

  return {
    backgroundColor: colors.primary,
    color: colors.white,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: calcFontSize(size!),
    fontWeight: calcFontWeight(size!, theme),
  };
});

const AvatarImg = styled(AvatarBase)<AvatarProps>(({ src }) => ({
  backgroundSize: 'cover',
  color: 'transparent',
  backgroundImage: `url(${src})`,
}));

export const Avatar = ({ children, className, src, ...props }: AvatarProps) => {
  const AvatarContainer = src ? AvatarImg : AvatarText;
  className = classnames(className, 'ck-avatar');

  return (
    <AvatarContainer {...props} src={src} className={className}>
      {src ? null : children}
    </AvatarContainer>
  );
};

Avatar.defaultProps = {
  size: 32,
  shape: 'circle',
  children: '',
  src: '',
};
