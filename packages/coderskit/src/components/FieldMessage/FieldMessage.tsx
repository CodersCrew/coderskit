import React, { HTMLAttributes, ElementType } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export interface FieldMessageProps extends HTMLAttributes<any> {
  as?: ElementType | string;
  error?: boolean;
  [key: string]: any;
}

const FieldMessageWrapper = styled.small<FieldMessageProps>(props => {
  const { theme, error } = props;
  const { colors, fontSizes, fontWeights, lineHeights } = theme;

  return {
    display: 'inline-block',
    paddingLeft: 4,
    paddingTop: 4,
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    fontWeight: fontWeights.regular,
    color: colors[error ? 'error' : 'fontPlaceholder'],
  };
});

export const FieldMessage = ({ children, className, ...props }: FieldMessageProps) => {
  return (
    <FieldMessageWrapper {...props} className={classnames(className, 'ck-field-message')}>
      {children}
    </FieldMessageWrapper>
  );
};
