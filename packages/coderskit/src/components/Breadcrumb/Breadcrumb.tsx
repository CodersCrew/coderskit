import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { ThemeColorsKeys, Icon } from '../..';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  color?: ThemeColorsKeys;
  size?: number;
  isIconVisible?: boolean;
  isDividerVisible?: boolean;
  separator?: string;
  href?: string;
}

const BreadcrumbBase = styled.li<BreadcrumbProps>(props => {
  const { theme, size, isIconVisible, isDividerVisible, separator } = props;
  const { colors } = theme;

  const color = colors[props.color!];
  const visibleIcon = isIconVisible ? 'visible' : 'hidden';
  const visibleDivider = isDividerVisible ? 'visible' : 'hidden';
  const paddingX = isIconVisible ? 10 : 0;
  const marginX = isIconVisible ? 0 : 16;
  const iconMargin = paddingX / 2;

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: size,
    color,
    cursor: 'pointer',

    '.ck-icon': {
      visibility: visibleIcon,
      marginRight: iconMargin,
    },

    '.ck-breadcrumb-divider': {
      visibility: visibleDivider,
      background: `url(${separator}) no-repeat`,
      height: size,
      width: size,
      cursor: 'default',
    },

    '.ck-breadcrumb-item': {
      paddingLeft: paddingX,
      paddingRight: paddingX,
      marginRight: marginX,

      a: {
        color: 'inherit',
        transition: 'all ease',

        '&:focus': {
          color: colors.black,
          textShadow: `1px 0 0 currentColor`,
        },
      },
    },
  };
});

const BreadCrumbDivider = ({ ...props }: BreadcrumbProps) => {
  const { className } = props;

  return <div {...props} className={classnames(className, 'ck-breadcrumb-divider')} />;
};

const BreadCrumbItem = ({ ...props }: BreadcrumbProps) => {
  const { href, className, name } = props;

  return (
    <div className={classnames(className, 'ck-breadcrumb-item')}>
      <a href={href}>
        <Icon {...props} style={{ color: 'currentColor' }} />
        {name}
      </a>
    </div>
  );
};

export const Breadcrumb = ({ ...props }: BreadcrumbProps) => {
  const className = classnames(props.className, 'ck-breadcrumb');
  const { separator } = props;

  return (
    <BreadcrumbBase {...props} className={className}>
      <Breadcrumb.Item {...props} />
      <Breadcrumb.Divider separator={separator} />
    </BreadcrumbBase>
  );
};

Breadcrumb.defaultProps = {
  name: 'Icon 1',
  color: 'primary',
  size: 16,
  isIconVisible: true,
  isDividerVisible: true,
};

Breadcrumb.Item = BreadCrumbItem;
Breadcrumb.Divider = BreadCrumbDivider;
