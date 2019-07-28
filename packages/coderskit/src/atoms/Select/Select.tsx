import React, { HTMLAttributes, ReactElement } from 'react';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { Props as ReactSelectProps } from 'react-select/src/Select';
import { CommonProps } from 'react-select/src/types';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { transparentize, tint } from 'polished';
import { Icon, Theme } from '../..';

import SpinnerSolid from '../../icons/SpinnerSolid';
import ExclamationCircleSolid from '../../icons/ExclamationCircleSolid';
import CheckCircleSolid from '../../icons/CheckCircleSolid';
import ExclamationTriangleSolid from '../../icons/ExclamationTriangleSolid';

export type SelectStatus = 'error' | 'warning' | 'success' | 'loading' | 'default';

type LoadingIndicatorProps = CommonProps<{ label: string; value: string }>;

export interface SelectProps extends Omit<ReactSelectProps, 'theme' | 'classNamePrefix' | 'isLoading'> {
  status?: SelectStatus;
}

const animatedComponents = makeAnimated();

const getStatusSelectStyles = (status: SelectStatus, { colors }: Theme) => {
  if (['success', 'warning', 'error'].includes(status)) return { borderColor: colors[status] };
  if (status === 'loading') {
    return {
      borderColor: `${colors.border} !important`,
      backgroundColor: colors.background,
      cursor: 'not-allowed',
    };
  }
  return {};
};

const SelectBase = styled(ReactSelect)<SelectProps>(props => {
  const { theme, status } = props;
  const { colors, fontSizes, fontWeights, lineHeights, shadows, radii, transitions } = theme;

  return {
    '.ck-select__control': {
      borderColor: colors.border,
      minHeight: 40,
      boxShadow: 'none',
      ...getStatusSelectStyles(status!, theme),

      '&:hover': {
        borderColor: tint(0.4, colors.primary),
      },

      '&.ck-select__control--menu-is-open': {
        boxShadow: `0 0 0 4px ${tint(0.8, colors.primary)}`,
        borderColor: tint(0.4, colors.primary),

        '.ck-select__dropdown-indicator': {
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
        transition: `transform 0.3s ${transitions.easeOutQuad}`,

        svg: {
          width: 18,
          height: 18,
        },
      },

      '&.ck-select__clear-indicator': {
        fontSize: fontSizes.body1,
        color: colors.gray,

        '.ck-select__clear-indicator-icon': {
          transition: `opacity 0.3s ${transitions.easeOutQuart}`,
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

const LoadingIndicatorBase = styled.div<LoadingIndicatorProps>(props => {
  const { hasValue, selectProps } = props;

  const hasClearIcon = hasValue && selectProps.isClearable;

  return {
    display: 'flex',
    alignItems: 'center',

    '.ck-select__clear-indicator-icon': {
      display: hasClearIcon ? 'block' : 'none',
      cursor: 'pointer',
      opacity: 0.56,

      '&:hover': {
        opacity: 0.8,
      },
    },

    '.ck-icon': {
      marginLeft: 8,
    },
  };
});

const getIcon = (status: SelectStatus) => {
  switch (status) {
    case 'success':
      return <Icon icon={CheckCircleSolid} color="success" />;
    case 'loading':
      return <Icon icon={SpinnerSolid} color="info" spin />;
    case 'error':
      return <Icon icon={ExclamationCircleSolid} color="error" />;
    case 'warning':
      return <Icon icon={ExclamationTriangleSolid} color="warning" />;
    default: {
      return null;
    }
  }
};

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  console.log(props);
  return (
    <LoadingIndicatorBase {...props} className="ck-select__indicator ck-select__clear-indicator">
      <div className="ck-select__clear-indicator-icon" onClick={props.clearValue}>
        ×
      </div>
      {getIcon(props.selectProps.status)}
    </LoadingIndicatorBase>
  );
};

export const Select = ({ className, ...props }: SelectProps) => {
  const { status } = props;

  const customProps = {
    menuIsOpen: status === 'loading' ? false : undefined,
    isSearchable: status === 'loading' ? false : undefined,
  };

  return (
    <SelectBase
      {...props}
      {...customProps}
      components={{ ...animatedComponents, LoadingIndicator }}
      className={classnames('ck-select', className)}
      classNamePrefix="ck-select"
      isLoading
    />
  );
};

Select.defaultProps = {
  status: 'default',
};

/********************
  Field component
********************/

export interface SelectFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  help?: string;
  children: ReactElement<SelectProps>;
}

type FieldBaseProps = Omit<SelectFieldProps, 'children'>;

const getHtmlFor = (children: ReactElement<SelectProps>): string => {
  console.log(children);
  return 'xxx';
};

const FieldBase = styled.div<FieldBaseProps>(props => {
  const { theme, error } = props;
  const { colors, fontSizes, fontWeights, lineHeights } = theme;

  const errorSelect = error ? { borderColor: colors.error } : {};

  return {
    display: 'flex',
    flexDirection: 'column',

    '.ck-select-label': {
      display: 'inline-block',
      paddingLeft: 4,
      paddingBottom: 4,
      fontSize: fontSizes.label,
      lineHeight: lineHeights.label,
      fontWeight: fontWeights.bold,
      color: colors.fontPrimary,
    },

    '.ck-select-error, .ck-select-help': {
      display: 'inline-block',
      paddingLeft: 4,
      paddingTop: 4,
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
      fontWeight: fontWeights.regular,
      color: colors.fontDisabled,
    },

    '.ck-select-error': {
      color: colors.error,
    },

    '.ck-select': {
      ...errorSelect,
    },
  };
});

const Field = ({ children, className, ...props }: SelectFieldProps) => {
  const { label, error, help } = props;
  const htmlFor = getHtmlFor(children);

  return (
    <FieldBase {...props} className={classnames(className, 'ck-select-field')}>
      {label && (
        <label htmlFor={htmlFor} className="ck-select-label">
          {label}
        </label>
      )}
      {children}
      {error && <small className="ck-select-error">{error}</small>}
      {help && <small className="ck-select-help">{help}</small>}
    </FieldBase>
  );
};

Select.Field = Field;
