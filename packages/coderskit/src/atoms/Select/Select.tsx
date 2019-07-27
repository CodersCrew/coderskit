import React from 'react';
import ReactSelect from 'react-select';
import { Props as ReactSelectProps } from 'react-select/src/Select';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { transparentize, tint } from 'polished';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectProps extends Omit<ReactSelectProps, 'theme' | 'classNamePrefix'> {}

const SelectBase = styled(ReactSelect)(props => {
  const { theme } = props;
  const { colors, fontSizes, fontWeights, lineHeights, shadows, radii, transitions } = theme;

  return {
    '.ck-select__control': {
      borderColor: colors.border,
      minHeight: 40,

      '&:hover': {
        borderColor: tint(0.4, colors.primary),
      },

      '&.ck-select__control--menu-is-open': {
        boxShadow: `0 0 0 4px ${tint(0.8, colors.primary)}`,
        borderColor: tint(0.4, colors.primary),

        '.ck-select__dropdown-indicator': {
          paddingRight: 4,
          paddingLeft: 8,
          transform: 'rotate(180deg)',
          color: colors.fontRegular,
        },
      },
    },

    '.ck-select__value-container': {
      paddingLeft: 12,
    },

    '.ck-select__single-value': {
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      fontWeight: fontWeights.regular,
      color: colors.fontRegular,
    },

    '.ck-select__placeholder': {
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      fontWeight: fontWeights.regular,
      color: colors.fontPlaceholder,
    },

    '.ck-select__indicator-separator': {
      display: 'none',
    },

    '.ck-select__indicator': {
      color: colors.fontPlaceholder,

      '&.ck-select__dropdown-indicator': {
        paddingRight: 8,
        paddingLeft: 4,
        transition: `transform 0.3s ${transitions.easeOutQuad}`,

        svg: {
          width: 18,
          height: 18,
        },
      },

      '&.ck-select__clear-indicator': {
        paddingRight: 4,
        paddingLeft: 4,
        color: colors.gray,
        cursor: 'pointer',
        opacity: 0.56,
        transition: `opacity 0.3s ${transitions.easeOutQuart}`,

        '&:hover': {
          opacity: 0.8,
        },
      },
    },

    '.ck-select__menu': {
      boxShadow: shadows.lg,
      borderRadius: radii.large,
    },

    '.ck-select__option': {
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      fontWeight: fontWeights.regular,
      color: colors.fontRegular,
      cursor: 'pointer',

      '&.ck-select__option--is-focused': {
        backgroundColor: colors.itemHover,
      },

      '&.ck-select__option--is-selected': {
        backgroundColor: transparentize(0.9, colors.primary),
        color: colors.primary,
        cursor: 'default',
      },
    },

    '.ck-select__multi-value': {
      backgroundColor: colors.border,

      '.ck-select__multi-value__label': {
        position: 'relative',
        top: -1,
        padding: '0 4px 0 8px',
        fontSize: fontSizes.body2,
        lineHeight: lineHeights.body2,
        color: colors.fontRegular,
      },

      '.ck-select__multi-value__remove': {
        paddingRight: 5,
        color: colors.fontRegular,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: tint(0.72, colors.error),
          color: colors.error,
        },
      },
    },

    '&.ck-select--is-disabled': {
      '.ck-select__control': {
        backgroundColor: colors.disabled,
      },

      '.ck-select__placeholder': {
        color: colors.fontDisabled,
      },

      '.ck-select__dropdown-indicator': {
        color: colors.fontDisabled,
      },
    },
  };
});

export const Select = ({ className, ...props }: SelectProps) => {
  return <SelectBase {...props} className={classnames('ck-select', className)} classNamePrefix="ck-select" />;
};
