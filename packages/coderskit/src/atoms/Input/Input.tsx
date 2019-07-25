import React, { useState, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Omit } from 'utility-types';
import { tint } from 'polished';
import { Theme, Icon } from '../..';

import SpinnerSolid from '../../icons/SpinnerSolid';
import ExclamationCircleSolid from '../../icons/ExclamationCircleSolid';
import EyeSolid from '../../icons/EyeSolid';
import CheckCircleSolid from '../../icons/CheckCircleSolid';

export type InputSize = 'small' | 'default' | 'large';

export type InputState = 'loading' | 'error' | 'warning' | 'success' | 'default';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  state: InputState;
  size: InputSize;
  hasFeedback?: boolean;
}

const getSizeProps = (size: InputSize, { fontSizes, space }: Theme) => {
  if (size === 'large')
    return {
      height: 48,
      padding: `0 ${space[16]}`,
      fontSize: fontSizes.button1,
    };

  if (size === 'small')
    return {
      height: 32,
    };

  return {};
};

const getStateProps = (state: InputState, { colors }: Theme) => {
  switch (state) {
    case 'loading': {
      return {
        backgroundColor: colors.background,
      };
    }
    case 'default': {
      return {
        '&:hover:not(:disabled):not(:focus)': {
          borderColor: tint(0.5, colors.primary),
        },
      };
    }
    default:
      return {
        borderColor: colors[state],

        '&:hover:not(:disabled):not(:focus)': {
          borderColor: tint(0.5, colors[state]),
        },
      };
  }
};

const InputContainer = styled.div<InputProps>(props => {
  const { theme, size, state, width } = props;
  const { colors, borderWidths, shadows, radii, fontSizes } = theme;

  return {
    position: 'relative',
    display: 'inline-block',

    '.ck-input__input': {
      width: typeof width === 'string' ? width : `${width}px`,
      height: 40,
      padding: `0 12px`,
      borderWidth: borderWidths.regular,
      borderStyle: 'solid',
      borderColor: colors.border,
      borderRadius: radii.small,
      outline: 'none',
      backgroundColor: colors.white,
      fontSize: fontSizes.button2,

      '&:focus': {
        padding: `0 ${size === 'large' ? 15 : 11}px`,
        borderWidth: borderWidths.bold,
        borderColor: colors.primary,
        boxShadow: shadows.md,
      },

      '&:disabled': {
        backgroundColor: colors.disabled,
        color: colors.fontDisabled,
        cursor: 'not-allowed',

        '&::placeholder': {
          color: colors.fontDisabled,
        },
      },

      '&::placeholder': {
        color: colors.fontPlaceholder,
      },

      ...getSizeProps(size!, theme),
      ...getStateProps(state!, theme),
    },

    '.ck-input--icons': {
      position: 'absolute',
      right: size === 'large' ? 32 : 28,
      top: 0,
      bottom: 0,

      '.ck-icon': {
        position: 'absolute',
        top: 'calc(50% - 8px)',
      },

      '.ck-input--eye-icon': {
        right: state !== 'default' ? 12 : 0,
      },
    },
  };
});

const getIcon = (state: InputState, type: string, passwordVisible: boolean, togglePasswordVisible: () => void) => {
  switch (state) {
    case 'success':
      return <Icon icon={CheckCircleSolid} kind="success" />;
    case 'loading':
      return <Icon icon={SpinnerSolid} kind="info" spin />;
    case 'error':
      return <Icon icon={ExclamationCircleSolid} kind="error" />;
    case 'warning':
      return <Icon icon={ExclamationCircleSolid} kind="warning" />;
    default: {
      if (type === 'password') {
        return (
          <Icon
            icon={EyeSolid}
            kind={passwordVisible ? 'primary' : 'border'}
            className="ck-input--eye-icon"
            onClick={togglePasswordVisible}
            hoverable
          />
        );
      }

      return null;
    }
  }
};

export const Input = ({
  onFocus,
  onBlur,
  onChange,
  name,
  id,
  value,
  type,
  disabled,
  autoComplete,
  autoFocus,
  ...props
}: InputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);

  const { state, className, hasFeedback } = props;

  const inputProps = {
    onFocus,
    onBlur,
    onChange,
    name,
    id,
    value,
    type,
    disabled,
    autoComplete,
    autoFocus,
  };

  const containerProps: InputProps = {
    ...props,
    disabled: disabled || state === 'loading',
    className: classnames(className, 'ck-input'),
    type: type !== 'password' || !passwordVisible ? type : 'text',
  };

  return (
    <InputContainer {...containerProps}>
      <input {...inputProps} className="ck-input__input" />

      {hasFeedback && (
        <div className="ck-input--icons">{getIcon(state, type!, passwordVisible, togglePasswordVisible)}</div>
      )}
    </InputContainer>
  );
};

Input.defaultProps = {
  size: 'default',
  state: 'default',
  width: '100%',
  hasFeedback: true,
};
