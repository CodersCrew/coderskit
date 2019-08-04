import React, { useMemo, HTMLAttributes, ElementType } from 'react';
import { Item } from './Item';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { css } from '@emotion/core';
import { GlobalStyles, Theme } from '../..';
import theme from '../../utils/theme';

const {
  colors: { white, border },
  shadows: {
    special: { menu },
  },
  radii: { large },
} = theme;

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  [key: string]: any;
  children: Item;
}

const globalStyles = ({ shadows, colors }: Theme) => css`
  .ck-menu {
    width: 240px;
    height: auto;
    background-color: ${white};
    box-shadow: ${menu};
    border-radius: ${large};
  }

  .ck-menu-item:not(:last-child) {
    border-bottom: 1px solid ${border};
  }
`;

export const Menu = ({ children, className, ...props }: MenuProps) => {
  return (
    <>
      <GlobalStyles styles={globalStyles} component="Menu" />
      <div {...props} className={classnames(className, 'ck-menu')}>
        {children}
      </div>
    </>
  );
};

Menu.defaultProps = {
  children: '',
};
