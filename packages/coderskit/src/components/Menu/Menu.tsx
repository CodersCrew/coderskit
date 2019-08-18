import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Item } from './Item';
import { Sub } from './Sub';

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  [key: string]: any;
  children: Item | Sub;
}

type MenuBaseProps = Omit<MenuProps, 'children' | 'value'>;

const MenuWrapper = styled.div<MenuBaseProps>(({ theme }) => {
  const { colors, shadows, radii } = theme;

  return {
    width: 240,
    height: 'auto',
    backgroundColor: colors.white,
    boxShadow: shadows.special.menu,
    borderRadius: radii.large,
    userSelect: 'none',

    '.ck-menu-item:not(:first-child)': {
      borderTop: `1px solid ${colors.border}`,
    },
  };
});

export const Menu = ({ children, ...props }: MenuProps) => {
  return <MenuWrapper {...props}>{children}</MenuWrapper>;
};

Menu.defaultProps = {
  children: '',
};

Menu.Item = Item;
Menu.Sub = Sub;
