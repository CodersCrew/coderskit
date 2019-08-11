import React, { HTMLAttributes } from 'react';
import { Item } from './Item';
import styled from '@emotion/styled';
import theme from '../../utils/theme';

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  [key: string]: any;
  children: Item;
}

interface MenuBaseProps extends Omit<MenuProps, 'children' | 'value'> {}

const MenuWrapper = styled.div<MenuBaseProps>(props => {
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

export const Menu = ({ children, className, ...props }: MenuProps) => {
  return <MenuWrapper {...props}>{children}</MenuWrapper>;
};

Menu.defaultProps = {
  children: '',
};
