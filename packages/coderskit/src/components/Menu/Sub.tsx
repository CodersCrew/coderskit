import React, { useState, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import theme from '../../utils/theme';
import { Item } from './Item';

export interface SubProps extends HTMLAttributes<HTMLDivElement> {
  children: Item;
  src: string;
  label: string;
  chevron: boolean;
  [key: string]: any;
}

type SubBaseProps = HTMLAttributes<HTMLDivElement>;

const SubWrapper = styled.div<SubBaseProps>(() => {
  const { colors, space, fontWeights } = theme;
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: fontWeights.medium,
    cursor: 'pointer',

    '.ck-menu-item-label': {
      color: colors.fontRegular,
      marginLeft: space[12],
    },

    '.ck-menu-item-wrapper': {
      width: '90%',
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'column',
      '.ck-menu-item:first-child': {
        borderTop: `1px solid ${colors.border}`,
      },
    },
  };
});

export const Sub = ({ src, label, chevron, children, className, ...props }: SubProps) => {
  const [open, setOpen] = useState(true);

  return (
    <SubWrapper {...props} className={classnames('ck-menu-item', className)}>
      <Item src={src} label={label} onClick={() => setOpen(!open)} chevron={chevron} />
      {open && <div className="ck-menu-item-wrapper">{children}</div>}
    </SubWrapper>
  );
};

Sub.defaultProps = {
  src: '',
  label: '',
  children: '',
};
