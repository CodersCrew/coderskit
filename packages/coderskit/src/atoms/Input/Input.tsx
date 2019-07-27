import React, { InputHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { tint } from 'polished';
import classnames from 'classnames';
import { Theme, Icon } from '../..';

import SpinnerSolid from '../../icons/SpinnerSolid';
import ExclamationCircleSolid from '../../icons/ExclamationCircleSolid';
import CheckCircleSolid from '../../icons/CheckCircleSolid';
import ExclamationTriangleSolid from '../../icons/ExclamationTriangleSolid';

/********************
  Input component
********************/

export type InputDimensions = 'small' | 'default' | 'large';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  dimensions?: InputDimensions;
}

const getDimentions = (dimensions: InputDimensions, { fontSizes: { body1, body2 } }: Theme) => {
  if (dimensions === 'large') return { height: 48, fontSize: body1, padding: '0 16px' };
  if (dimensions === 'small') return { height: 32, fontSize: body2, padding: '0 8px' };
  return { height: 40, fontSize: body2, padding: '0 12px' };
};

const InputBase = styled.input<InputProps>(props => {
  const { theme, dimensions } = props;
  const { colors, radii } = theme;

  return {
    border: `1px solid ${colors.border}`,
    borderRadius: radii.small,
    backgroundColor: colors.white,
    outline: 'none',
    color: colors.fontRegular,
    ...getDimentions(dimensions!, theme),

    '&::placeholder': {
      color: colors.fontPlaceholder,
      backgroundColor: 'transparent',
    },

    '&:hover:not(:disabled)': {
      borderColor: tint(0.4, colors.primary),
    },

    '&:focus:not(:disabled)': {
      borderColor: colors.primary,
      boxShadow: `0 0 0 4px ${tint(0.8, colors.primary)}`,
    },

    '&:disabled, &:disabled::placeholder': {
      color: colors.fontDisabled,
      backgroundColor: colors.disabled,
    },
  };
});

export const Input = ({ className, ...props }: InputProps) => {
  return <InputBase {...props} className={classnames(className, 'ck-input')} id={props.id || props.name} />;
};

Input.defaultProps = {
  dimensions: 'default',
};

/********************
  Status component
********************/

export type InputStatus = 'error' | 'warning' | 'success' | 'loading' | 'default';

export interface InputStatusProps extends HTMLAttributes<HTMLDivElement> {
  status?: InputStatus;
  children: ReactElement<InputProps>;
}

interface StatusBaseProps extends HTMLAttributes<HTMLDivElement> {
  status?: InputStatus;
  dimensions: InputDimensions;
  children: ReactNode;
}

const getIcon = (status: InputStatus) => {
  switch (status) {
    case 'success':
      return <Icon icon={CheckCircleSolid} kind="success" />;
    case 'loading':
      return <Icon icon={SpinnerSolid} kind="info" spin />;
    case 'error':
      return <Icon icon={ExclamationCircleSolid} kind="error" />;
    case 'warning':
      return <Icon icon={ExclamationTriangleSolid} kind="warning" />;
    default: {
      return null;
    }
  }
};

const getStatusInputStyles = (status: InputStatus, { colors }: Theme) => {
  if (['success', 'warning', 'error'].includes(status)) return { borderColor: colors[status] };
  if (status === 'loading') {
    return {
      backgroundColor: colors.background,
      userSelect: 'none' as 'none',

      '&::placeholder': {
        backgroundColor: colors.background,
      },
    };
  }
  return {};
};

const getRightValue = (dimensions: InputDimensions) => {
  if (dimensions === 'large') return { right: 16 };
  if (dimensions === 'small') return { right: 8 };
  return { right: 12 };
};

const StatusBase = styled.div<StatusBaseProps>(props => {
  const { theme, status, dimensions } = props;

  return {
    position: 'relative',
    width: 'fit-content',

    '.ck-input': {
      ...getStatusInputStyles(status!, theme),
    },

    '.ck-icon': {
      position: 'absolute',
      top: 0,
      height: '100%',
      ...getRightValue(dimensions),
    },
  };
});

const Status = ({ children, className, ...props }: InputStatusProps) => {
  const dimensions = children.props.dimensions!;

  if (props.status === 'loading') {
    children = React.cloneElement(children, { disabled: true });
  }

  return (
    <StatusBase {...props} className={classnames(className, 'ck-input-status')} dimensions={dimensions}>
      {getIcon(props.status!)}
      {children}
    </StatusBase>
  );
};

Status.defaultProps = {
  status: 'default',
};

Input.Status = Status;

/********************
  Field component
********************/

export interface InputFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  help?: string;
  children: any;
}

const getHtmlFor = (children: any): string => {
  const childrenDefaultProps = children.type.defaultProps;
  const childrenProps = children.props;

  // If we pass Input component as children
  if (childrenDefaultProps.dimensions) {
    return childrenProps.id || childrenProps.name;
  }

  // If we pass Status component as children
  return childrenProps.children.props.id || childrenProps.children.props.name;
};

const FieldBase = styled.div<InputFieldProps>(props => {
  const { theme, error } = props;
  const { colors, fontSizes, fontWeights, lineHeights } = theme;

  const errorInput = error ? { borderColor: colors.error } : {};

  return {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',

    '.ck-input-label': {
      display: 'inline-block',
      paddingLeft: 4,
      paddingBottom: 4,
      fontSize: fontSizes.label,
      lineHeight: lineHeights.label,
      fontWeight: fontWeights.bold,
      color: colors.fontPrimary,
    },

    '.ck-input-error, .ck-input-help': {
      display: 'inline-block',
      paddingLeft: 4,
      paddingTop: 4,
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
      fontWeight: fontWeights.regular,
      color: colors.fontDisabled,
    },

    '.ck-input-error': {
      color: colors.error,
    },

    '.ck-input': {
      ...errorInput,
    },
  };
});

const Field = ({ children, className, ...props }: InputFieldProps) => {
  const { label, error, help } = props;
  const htmlFor = getHtmlFor(children);

  return (
    <FieldBase {...props} className={classnames(className, 'ck-input-field')}>
      {label && (
        <label htmlFor={htmlFor} className="ck-input-label">
          {label}
        </label>
      )}
      {children}
      {error && <small className="ck-input-error">{error}</small>}
      {help && <small className="ck-input-help">{help}</small>}
    </FieldBase>
  );
};

Input.Field = Field;
