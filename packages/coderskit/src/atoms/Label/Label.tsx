import React, { LabelHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const LabelBase = styled.label(({ theme }) => {
  const { colors, fontSizes, fontWeights, lineHeights } = theme;

  return {
    display: 'inline-block',
    paddingLeft: 4,
    paddingBottom: 4,
    fontSize: fontSizes.label,
    lineHeight: lineHeights.label,
    fontWeight: fontWeights.bold,
    color: colors.fontPrimary,
  };
});

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <LabelBase {...props} className={classnames(className, 'ck-label')}>
      {children}
    </LabelBase>
  );
};
