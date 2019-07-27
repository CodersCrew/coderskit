import React, { HTMLAttributes, ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import { shade, tint } from 'polished';
import classnames from 'classnames';
import { ThemeColorsKeys } from '../..';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export type ButtonSize = 'small' | 'default' | 'large';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  as?: ElementType;
  children: ReactNode;
  color?: ThemeColorsKeys;
  size?: ButtonSize;
  variant?: ButtonVariant;
  [key: string]: any;
}

const ButtonBase = styled.button<ButtonProps>(props => {
  const { theme, size } = props;
  const { colors, fontSizes, fontWeights, lineHeights, radii, transitions } = theme;

  const color = colors[props.color!];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    padding: size === 'small' ? '7px 15px' : '11px 23px',
    border: `1px solid ${color}`,
    borderRadius: radii.small,
    fontSize: size === 'large' ? fontSizes.button1 : fontSizes.button2,
    textAlign: 'center',
    lineHeight: size === 'large' ? lineHeights.button1 : lineHeights.button2,
    fontWeight: fontWeights.medium,
    color,
    cursor: 'pointer',
    transition: `all 0.3s ${transitions.easeOutQuad}`,

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },

    '&:focus:not(:disabled)': {
      boxShadow: `${theme.shadows.md}, 0 0 0 4px ${tint(0.8, color)}`,
    },
  };
});

const ContainedButton = styled(ButtonBase)(props => {
  const { theme } = props;
  const { colors } = theme;

  const color = colors[props.color!];

  return {
    backgroundColor: color,
    color: theme.colors.white,

    '&:hover:not(:disabled)': {
      backgroundColor: tint(0.08, color),
      boxShadow: theme.shadows.md,
    },

    '&:active:not(:disabled)': {
      backgroundColor: shade(0.04, color),
      boxShadow: 'none',
    },
  };
});

const OutlinedButton = styled(ButtonBase)(props => {
  const { theme } = props;
  const { colors } = theme;

  const color = colors[props.color!];

  return {
    backgroundColor: theme.colors.white,

    '&:hover:not(:disabled)': {
      backgroundColor: tint(0.96, color),
      boxShadow: theme.shadows.md,
    },

    '&:active:not(:disabled)': {
      backgroundColor: tint(0.92, color),
      boxShadow: 'none',
    },
  };
});

const TextButton = styled(ButtonBase)(props => {
  const { theme, size } = props;
  const { colors } = theme;

  const color = colors[props.color!];

  return {
    padding: size === 'small' ? 7 : 11,
    backgroundColor: 'transparent',
    borderColor: 'transparent',

    '&:hover:not(:disabled)': {
      backgroundColor: tint(0.94, color),
    },

    '&:active:not(:disabled)': {
      backgroundColor: tint(0.88, color),
    },

    '&:focus:not(:disabled)': {
      boxShadow: `0 0 0 4px ${tint(0.8, color)}`,
    },

    '&:disabled': {
      opacity: 0.8,
      color: theme.colors.fontDisabled,
    },
  };
});

export const Button = (props: ButtonProps) => {
  const { variant, children } = props;
  const className = classnames(props.className, 'ck-button');

  const ButtonContainer =
    variant === 'contained' ? ContainedButton : variant === 'outlined' ? OutlinedButton : TextButton;

  return (
    <ButtonContainer {...props} className={className}>
      {children}
    </ButtonContainer>
  );
};

Button.defaultProps = {
  as: 'button',
  children: '',
  color: 'primary',
  size: 'default',
  variant: 'contained',
};
