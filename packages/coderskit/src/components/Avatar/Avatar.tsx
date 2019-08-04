import React, { useMemo, HTMLAttributes, ElementType } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { css } from '@emotion/core';
import { GlobalStyles, Theme } from '../..';

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

const globalStyles = ({ shadows, colors }: Theme) => css`
  .ck-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    box-shadow: ${shadows.xs};
  }

  .ck-avatar-img {
    background-size: cover;
    color: transparent;
  }

  .ck-avatar-text {
    background-color: ${colors.primary};
    color: ${colors.white};
    text-transform: uppercase;
    text-align: center;
  }
`;

const AvatarBase = styled.div<AvatarProps>(({ size, shape }) => ({
  borderRadius: calcRadius(size!, shape),
  width: size,
  height: size,
}));

const AvatarText = styled(AvatarBase)<AvatarProps>(({ size, theme }) => ({
  fontSize: calcFontSize(size!),
  fontWeight: calcFontWeight(size!, theme),
}));

const AvatarImg = styled(AvatarBase)<AvatarProps>(({ src }) => ({
  backgroundImage: `url(${src})`,
}));

export const Avatar = ({ children, className, src, ...props }: AvatarProps) => {
  const AvatarContainer = src ? AvatarImg : AvatarText;
  const customClass = useMemo(
    () =>
      classnames(className, 'ck-avatar', {
        'ck-avatar-img': src,
        'ck-avatar-text': !src,
      }),
    [src, className],
  );

  return (
    <>
      <GlobalStyles styles={globalStyles} component="Avatar" />
      <AvatarContainer {...props} src={src} className={customClass}>
        {src ? null : children}
      </AvatarContainer>
    </>
  );
};

Avatar.defaultProps = {
  size: 32,
  shape: 'circle',
  children: '',
  src: '',
};
