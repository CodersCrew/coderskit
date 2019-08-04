import React, { TextareaHTMLAttributes, ReactElement, ReactNode, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { tint } from 'polished';
import { Icon, Theme } from '../..';

import SpinnerSolid from '../../icons/SpinnerSolid';
import ExclamationCircleSolid from '../../icons/ExclamationCircleSolid';
import CheckCircleSolid from '../../icons/CheckCircleSolid';
import ExclamationTriangleSolid from '../../icons/ExclamationTriangleSolid';

export type TextAreaDimensions = 'small' | 'default' | 'large';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  dimensions?: TextAreaDimensions;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const getDimentions = (dimensions: TextAreaDimensions, { fontSizes, lineHeights }: Theme) => {
  if (dimensions === 'large') return { fontSize: fontSizes.body1, lineHeight: lineHeights.body1, padding: '11px 15px' };
  if (dimensions === 'small') return { fontSize: fontSizes.body2, lineHeight: lineHeights.body2, padding: '3px 7px' };
  return { fontSize: fontSizes.body2, lineHeight: lineHeights.body2, padding: '7px 11px' };
};

const TextAreaBase = styled.textarea<TextAreaProps>(props => {
  const { theme, dimensions, resize } = props;
  const { colors, radii } = theme;
  console.log(resize);

  return {
    border: `1px solid ${colors.border}`,
    borderRadius: radii.small,
    backgroundColor: colors.white,
    outline: 'none',
    color: colors.fontRegular,
    resize,
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

export const TextArea = ({ className, children, ...props }: TextAreaProps) => {
  return (
    <TextAreaBase {...props} className={classnames(className, 'ck-text-area')} id={props.id || props.name}>
      {children}
    </TextAreaBase>
  );
};

TextArea.defaultProps = {
  dimensions: 'default',
  resize: 'none',
};

export type TextAreaStatus = 'error' | 'warning' | 'success' | 'loading' | 'default';

export interface TextAreaStatusProps extends HTMLAttributes<HTMLDivElement> {
  status?: TextAreaStatus;
  noIcon?: boolean;
  children: ReactElement<TextAreaProps>;
}

interface StatusBaseProps extends HTMLAttributes<HTMLDivElement> {
  status?: TextAreaStatus;
  dimensions: TextAreaDimensions;
  children: ReactNode;
}

const getIcon = (status: TextAreaStatus) => {
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

const getStatusTextAreaStyles = (status: TextAreaStatus, { colors }: Theme) => {
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

const getPositionValue = (dimensions: TextAreaDimensions) => {
  if (dimensions === 'large') return { top: 12, right: 16 };
  if (dimensions === 'small') return { top: 4, right: 8 };
  return { top: 12, right: 12 };
};

const StatusBase = styled.div<StatusBaseProps>(props => {
  const { theme, status, dimensions } = props;

  return {
    position: 'relative',
    width: 'fit-content',

    '.ck-text-area': {
      ...getStatusTextAreaStyles(status!, theme),
    },

    '.ck-icon': {
      position: 'absolute',
      ...getPositionValue(dimensions),
    },
  };
});

const Status = ({ children, className, ...props }: TextAreaStatusProps) => {
  const dimensions = children.props.dimensions!;

  if (props.status === 'loading') {
    children = React.cloneElement(children, { disabled: true });
  }

  return (
    <StatusBase {...props} className={classnames(className, 'ck-text-area-status')} dimensions={dimensions}>
      {props.noIcon ? null : getIcon(props.status!)}
      {children}
    </StatusBase>
  );
};

Status.defaultProps = {
  status: 'default',
  noIcon: false,
};

TextArea.Status = Status;

export type TextAreaFieldProps = HTMLAttributes<HTMLDivElement>;

const FieldBase = styled.div<TextAreaFieldProps>(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  };
});

const Field = ({ children, className, ...props }: TextAreaFieldProps) => {
  return (
    <FieldBase {...props} className={classnames(className, 'ck-text-area-field')}>
      {children}
    </FieldBase>
  );
};

TextArea.Field = Field;
