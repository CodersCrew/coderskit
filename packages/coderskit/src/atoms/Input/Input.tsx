import React, { InputHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { tint } from 'polished';
import classnames from 'classnames';
import { Theme, Icon } from '../..';
import { Label } from '../../atoms/Label/Label';
import { FieldMessage } from '../../atoms/FieldMessage/FieldMessage';

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

const getDimentions = (dimensions: InputDimensions, { fontSizes, lineHeights }: Theme) => {
  if (dimensions === 'large') return { fontSize: fontSizes.body1, lineHeight: lineHeights.body1, padding: '11px 15px' };
  if (dimensions === 'small') return { fontSize: fontSizes.body2, lineHeight: lineHeights.body2, padding: '3px 7px' };
  return { fontSize: fontSizes.body2, lineHeight: lineHeights.body2, padding: '7px 11px' };
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
      boxShadow: `0 0 0 2px ${colors.primary}`,
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

Input.Label = Label;
Input.Message = FieldMessage;

/********************
  Status component
********************/

export type InputStatus = 'error' | 'warning' | 'success' | 'loading' | 'default';

export interface InputStatusProps extends HTMLAttributes<HTMLDivElement> {
  status?: InputStatus;
  noIcon?: boolean;
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
      {props.noIcon ? null : getIcon(props.status!)}
      {children}
    </StatusBase>
  );
};

Status.defaultProps = {
  status: 'default',
  noIcon: false,
};

Input.Status = Status;

/********************
  Field component
********************/

export type InputFieldProps = HTMLAttributes<HTMLDivElement>;

const FieldBase = styled.div<InputFieldProps>(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  };
});

const Field = ({ children, className, ...props }: InputFieldProps) => {
  return (
    <FieldBase {...props} className={classnames(className, 'ck-input-field')}>
      {children}
    </FieldBase>
  );
};

Input.Field = Field;
