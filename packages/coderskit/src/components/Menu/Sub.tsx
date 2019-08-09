import React, { useMemo, HTMLAttributes, ElementType } from 'react';
import { Icon } from '../Icon';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { css } from '@emotion/core';
import { GlobalStyles, Theme } from '../..';
import theme from '../../utils/theme';

const {
  colors: { white, fontRegular, primary, fontPlaceholder },
  shadows: { sm },
  radii: { large },
  fontWeights: { medium },
  space,
} = theme;

export interface SubProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  label: string;
  [key: string]: any;
}

const globalStyles = ({ shadows, colors }: Theme) => css`
  .ck-menu-sub {
    width: 100%;
    display: flex;
    align-items: center;
    padding: ${space[16]};
    font-weight: ${medium};
    cursor: pointer;

    &:hover * {
      color: ${primary};
    }
  }

  .ck-menu-item-label {
    color: ${fontRegular};
    margin-left: ${space[12]};
  }
`;

export const Sub = ({ src, label, children, className, ...props }: SubProps) => {
  return (
    <>
      <GlobalStyles styles={globalStyles} component="Item" />
      <div {...props} className={classnames(className, 'ck-menu-item')}>
        <Icon src={src} color="fontPlaceholder" />
        <span className="ck-menu-item-label">{label}</span>
        <Icon src={src} color="primary" />
      </div>
    </>
  );
};

Sub.defaultProps = {
  src: '',
  label: '',
  children: '',
};
