import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { ErrorMessage, ErrorMessageProps, Input, InputProps, Label, LabelProps } from '../..';

export interface InputFieldProps extends HTMLAttributes<HTMLDivElement> {
  error?: string | ErrorMessageProps;
  label?: string | LabelProps;
  input: InputProps;
  name: string;
}

const InputFieldWrapper = styled.div(() => {
  return {
    width: 'fit-content',
  };
});

export const InputField = ({ error, label, input, name, ...props }: InputFieldProps) => {
  const errorMessageProps = typeof error === 'object' ? error : { children: error };
  const labelProps = typeof label === 'object' ? label : { children: label };
  const hasError = typeof error === 'object' ? !!error.children : !!error;
  const className = classnames(props.className, 'ck-input-field');

  if (hasError && input.state !== 'loading') {
    input.state = 'error';
  }

  return (
    <InputFieldWrapper {...props} className={className}>
      <Label {...labelProps} htmlFor={name} />
      <Input {...input} id={name} name={name} />
      <ErrorMessage {...errorMessageProps} />
    </InputFieldWrapper>
  );
};
