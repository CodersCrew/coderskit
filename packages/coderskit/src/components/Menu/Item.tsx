import React, { useMemo, HTMLAttributes, ElementType } from 'react';
import { Icon } from '../Icon';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { css } from '@emotion/core';
import { GlobalStyles, Theme } from '../..';
import theme from '../../utils/theme';

const {
  colors: { white, fontRegular },
  shadows: { sm },
  radii: { large },
  space,
} = theme;

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  label: string;
  [key: string]: any;
}

const globalStyles = ({ shadows, colors }: Theme) => css`
  .ck-menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: ${space[16]};
  }

  .ck-menu-item-label {
    color: ${fontRegular};
    margin-left: ${space[12]};
  }
`;

export const Item = ({ src, label, children, className, ...props }: ItemProps) => {
  return (
    <>
      <GlobalStyles styles={globalStyles} component="Item" />
      <div {...props} className={classnames(className, 'ck-menu-item')}>
        <Icon src={src} color="fontRegular" />
        <span className="ck-menu-item-label">{label}</span>
      </div>
    </>
  );
};

Item.defaultProps = {
  src: '',
  label: '',
  children: '',
};
