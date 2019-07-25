import React from 'react';
import classnames from 'classnames';
import { FieldProps } from 'formik/dist/Field';
import { InputField, InputFieldProps } from '../..';

type Props = InputFieldProps & FieldProps;

export const FInput = ({ form, field, input, label, ...props }: Props) => {
  let state = input.state || 'default';
  const error = (form.touched[field.name] && form.errors[field.name]) as string | undefined;
  const errorProps = { children: error };
  const inputProps = { ...input, ...field };
  const className = classnames(props.className, 'ck-f-input');

  if (form.isSubmitting) {
    inputProps.state = 'loading';
  } else {
    inputProps.state = state;
  }

  return <InputField input={inputProps} error={errorProps} label={label} {...props} className={className} />;
};
