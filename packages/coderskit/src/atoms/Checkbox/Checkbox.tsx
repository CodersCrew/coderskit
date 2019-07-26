import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Icon, Typography } from '..';

import SquareSolid from '../../icons/SquareSolid';
import SquareRegular from '../../icons/SquareRegular';
import CheckSquareSolid from '../../icons/CheckSquareSolid';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  name?: string;
}

const CheckboxContainer = styled.div<CheckboxProps>(props => {
  const { space, fontSizes, lineHeights, colors } = props.theme;
  const { disabled } = props;

  return {
    display: 'flex',
    alignItems: 'center',

    '.ck-checkbox--wrapper': {
      position: 'relative',
      width: 20,
      height: 20,
      overflow: 'hidden',

      '.ck-icon': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        '&:first-of-type': {
          visibility: 'visible',
          color: colors.border,
          zIndex: 1,
        },

        '&:nth-of-type(2)': {
          visibility: 'hidden',
          color: colors.primary,
        },

        '&:last-of-type': {
          visibility: 'hidden',
          color: colors.disabled,
        },
      },
    },

    '.ck-checkbox--hidden': {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'scale(2)',
      padding: 0,
      zIndex: 2,
      opacity: 0,
      cursor: 'pointer',

      '&:hover:not(:disabled) + .ck-icon:first-of-type': {
        opacity: 0.64,
        color: colors.primary,
      },

      '&:focus + .ck-icon:first-of-type': {
        opacity: 1,
        color: colors.primary,
      },

      '&:checked ~ .ck-icon:first-of-type': {
        visibility: 'hidden',
      },

      '&:checked ~ .ck-icon:nth-of-type(2)': {
        visibility: 'visible',
      },

      '&:disabled:not(:checked) ~ .ck-icon:last-of-type': {
        visibility: 'visible',
      },

      '&:disabled:checked ~ .ck-icon': {
        opacity: 1,
        color: colors.border,
      },
    },

    '.ck-checkbox--label': {
      paddingLeft: space[8],
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      color: colors[disabled ? 'fontDisabled' : 'fontRegular'],
      cursor: 'pointer',
    },
  };
});

export const Checkbox = ({
  name,
  disabled,
  onFocus,
  onBlur,
  autoFocus,
  checked,
  onChange,
  children,
  ...props
}: CheckboxProps) => {
  const className = classnames(props.className, 'ck-checkbox');
  const inputProps = {
    className: 'ck-checkbox--hidden',
    type: 'checkbox',
    'aria-label': props['aria-label'] || name,
    name,
    id: name,
    disabled,
    onFocus,
    onBlur,
    autoFocus,
    checked,
    onChange,
  };

  return (
    <CheckboxContainer {...props} className={className}>
      <div className="ck-checkbox--wrapper">
        <input {...inputProps} />
        <Icon icon={SquareRegular} />
        <Icon icon={CheckSquareSolid} />
        <Icon icon={SquareSolid} />
      </div>
      {children && (
        <Typography as="label" className="ck-checkbox--label" htmlFor={name}>
          {children}
        </Typography>
      )}
    </CheckboxContainer>
  );
};
