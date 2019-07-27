import React, { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { tint } from 'polished';
import { Icon } from '..';

import CheckSolid from '../../icons/CheckSolid';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export type CheckboxLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const CheckboxBase = styled.div(props => {
  const { colors, radii } = props.theme;

  return {
    position: 'relative',
    width: 20,
    height: 20,
    overflow: 'hidden',
    borderRadius: radii.small,

    '&:focus-within': {
      boxShadow: `0 0 0 4px ${tint(0.8, colors.primary)}`,
    },

    '.ck-icon': {
      visibility: 'hidden',
      color: colors.white,
    },

    '.ck-checkbox__hidden': {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'scale(2)',
      padding: 0,
      zIndex: 2,
      opacity: 0,

      '&:disabled': {
        cursor: 'not-allowed',
      },

      '&:not(:disabled)': {
        cursor: 'pointer',
      },

      '&:hover:not(:disabled) + .ck-checkbox__visible': {
        borderColor: tint(0.4, colors.primary),
      },

      '&:focus + .ck-checkbox__visible': {
        borderColor: tint(0.4, colors.primary),
      },

      '&:checked:not(:disabled) + .ck-checkbox__visible': {
        backgroundColor: colors.primary,
        borderColor: colors.primary,

        '.ck-icon': {
          visibility: 'visible',
        },
      },

      '&:disabled:not(:checked) + .ck-checkbox__visible': {
        backgroundColor: colors.disabled,
      },

      '&:disabled:checked + .ck-checkbox__visible': {
        backgroundColor: colors.disabled,
        borderColor: colors.disabled,

        '.ck-icon': {
          visibility: 'visible',
        },
      },
    },

    '.ck-checkbox__visible': {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderRadius: radii.small,
      border: `2px solid ${colors.border}`,
    },
  };
});

const ChcekboxLabelBase = styled.label(({ theme }) => {
  const { fontSizes, fontWeights, lineHeights, colors } = theme;

  return {
    display: 'flex',
    alignItems: 'flex-start',
    width: 'fit-content',
    fontSize: fontSizes.body2,
    lineHeight: lineHeights.body2,
    fontWeight: fontWeights.regular,
    color: colors.fontRegular,
    userSelect: 'none',

    '.ck-checkbox': {
      marginRight: 8,
    },

    '.ck-checkbox + *': {
      position: 'relative',
      top: -2,
    },
  };
});

export const ChcekboxLabel = ({ children, ...props }: CheckboxLabelProps) => {
  return (
    <ChcekboxLabelBase {...props} className={classnames(props.className, 'ck-checkbox-label')}>
      {children}
    </ChcekboxLabelBase>
  );
};

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <CheckboxBase className={classnames(className, 'ck-checkbox')}>
      <input {...props} type="checkbox" className="ck-checkbox__hidden" />
      <div className="ck-checkbox__visible">
        <Icon icon={CheckSolid} size={12} />
      </div>
    </CheckboxBase>
  );
};

Checkbox.Label = ChcekboxLabel;
