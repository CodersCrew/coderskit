import React, { useMemo, HTMLAttributes, ElementType } from 'react';
import { Icon } from '../Icon';
import ChevronDownSolid from '../../icons/ChevronDownSolid';
import styled from '@emotion/styled';
import classnames from 'classnames';
import theme from '../../utils/theme';

const { colors, space, fontWeights } = theme;

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  label: string;
  chevron?: boolean;
  [key: string]: any;
}

interface ItemBaseProps extends HTMLAttributes<HTMLDivElement> {}

const ItemWrapper = styled.div<ItemBaseProps>(props => {
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: space[16],
    fontWeight: fontWeights.medium,
    cursor: 'pointer',

    '&:hover > .ck-icon': {
      color: colors.primary,
    },

    '&:hover > .ck-menu-item-label': {
      color: colors.primary,
    },

    '.ck-icon': {
      color: colors.fontPlaceholder,
    },

    '.ck-menu-item-label': {
      color: colors.fontRegular,
      marginLeft: space[12],
    },

    '.ck-menu-item-chevron': {
      marginLeft: 'auto',
    },
  };
});

export const Item = ({ src, label, chevron, children, className, ...props }: ItemProps) => {
  return (
    <ItemWrapper {...props} className={classnames('ck-menu-item', className)}>
      {src && <Icon src={src} />}
      <span className="ck-menu-item-label">{label}</span>
      {chevron && <Icon icon={ChevronDownSolid} color="fontRegular" size={10} className="ck-menu-item-chevron" />}
    </ItemWrapper>
  );
};

Item.defaultProps = {
  src: '',
  label: '',
  children: '',
};
