import React, { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { tint } from 'polished';

export type RadioProps = InputHTMLAttributes<HTMLInputElement>;

export type RadioLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const RadioBase = styled.div(props => {
  const { colors } = props.theme;

  return {
    position: 'relative',
    width: 20,
    height: 20,
    overflow: 'hidden',
    borderRadius: '100%',

    '&:focus-within': {
      boxShadow: `0 0 0 4px ${tint(0.8, colors.primary)}`,
    },

    '.ck-radio__hidden': {
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

      '&:hover:not(:disabled) + .ck-radio__visible': {
        borderColor: tint(0.4, colors.primary),
      },

      '&:focus + .ck-radio__visible': {
        borderColor: tint(0.4, colors.primary),
      },

      '&:checked:not(:disabled) + .ck-radio__visible': {
        borderColor: colors.primary,
        borderWidth: 6,
      },

      '&:disabled:not(:checked) + .ck-radio__visible': {
        backgroundColor: colors.disabled,
      },

      '&:disabled:checked + .ck-radio__visible': {
        borderColor: colors.disabled,
        borderWidth: 6,
      },
    },

    '.ck-radio__visible': {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderRadius: '100%',
      border: `2px solid ${colors.border}`,
    },
  };
});

const RadioLabelBase = styled.label(({ theme }) => {
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

    '.ck-radio': {
      marginRight: 8,
    },

    '.ck-radio + *': {
      position: 'relative',
      top: -2,
    },
  };
});

export const RadioLabel = ({ children, ...props }: RadioLabelProps) => {
  return (
    <RadioLabelBase {...props} className={classnames(props.className, 'ck-radio-label')}>
      {children}
    </RadioLabelBase>
  );
};

export const Radio = ({ className, ...props }: RadioProps) => {
  return (
    <RadioBase className={classnames(className, 'ck-radio')}>
      <input {...props} type="radio" className="ck-radio__hidden" />
      <div className="ck-radio__visible" />
    </RadioBase>
  );
};

Radio.Label = RadioLabel;
