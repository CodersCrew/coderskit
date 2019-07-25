import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Typography, TypographyProps } from '../Typography';

export interface ErrorMessageProps extends TypographyProps {
  width?: string | number;
}

const ErrorMessageWrapper = styled(Typography)(props => {
  const { width, theme } = props;
  const { space, colors } = theme;

  return {
    display: 'flex',
    alignItems: 'center',
    height: 20,
    width: width || '100%',
    paddingLeft: space[4],
    color: colors.error,
  };
});

export const ErrorMessage = (props: ErrorMessageProps) => {
  const className = classnames(props.className, 'ck-error-message');

  return (
    <ErrorMessageWrapper {...props} className={className} el="small">
      {props.children}
    </ErrorMessageWrapper>
  );
};
