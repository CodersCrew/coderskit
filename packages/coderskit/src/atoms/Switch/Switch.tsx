import React, { ReactNode, ElementType, HTMLAttributes, useRef, useEffect } from 'react';
import ReactSwitch from 'react-switch';
import styled from '@emotion/styled';
import classnames from 'classnames';

export interface SwitchProps extends Omit<HTMLAttributes<any>, 'onChange'> {
  children?: ReactNode;
  checked: boolean;
  disabled?: boolean;
  onChange: (
    checked: boolean,
    event: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent,
    id: string,
  ) => void;
  name: string;
  onFocus: any;
  onBlur: any;
}

interface WrapperProps {
  as?: ElementType | string;
  disabled?: boolean;
  checked: boolean;
}

const SwitchWrapper = styled.label<WrapperProps>(props => {
  const { disabled, checked, theme } = props;
  const { radii, fontSizes, fontWeights, lineHeights, colors } = theme;

  const switchBakground = disabled
    ? { backgroundColor: `${checked ? colors.fontDisabled : colors.disabled} !important` }
    : { backgroundColor: `${checked ? colors.primary : colors.border} !important` };

  return {
    display: 'flex',
    alignItems: 'flex-start',

    '.react-switch-handle': {
      borderRadius: `${radii.small} !important`,
    },

    '.react-switch-bg': {
      borderRadius: `${radii.small} !important`,
      ...switchBakground,
    },

    '.ck-switch__text': {
      cursor: 'pointer',
      marginLeft: 8,
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      fontWeight: fontWeights.regular,
      color: colors.fontRegular,
    },
  };
});

const styleProps = {
  uncheckedIcon: false,
  checkedIcon: false,
  width: 40,
  height: 20,
  handleDiameter: 16,
  activeBoxShadow: 'none',
};

export const Switch = ({ children, name, checked, onChange, onFocus, onBlur, disabled, ...props }: SwitchProps) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (onFocus) {
      inputRef.current.$inputRef.addEventListener('focus', onFocus);
    }

    if (onBlur) {
      inputRef.current.$inputRef.addEventListener('blur', onBlur);
    }
  }, []);

  const className = classnames(props.className, 'ck-switch');
  const wrapperPropsObj = children ? { htmlFor: name } : { as: 'div' };

  const inputProps = { name, checked, onChange, onFocus, onBlur, disabled, id: name, ref: inputRef };
  const wrapperProps = {
    ...props,
    ...wrapperPropsObj,
    disabled,
    checked,
    className,
  };

  return (
    <SwitchWrapper {...wrapperProps}>
      <ReactSwitch {...inputProps} {...styleProps} />
      {children ? <span className="ck-switch__text">{children}</span> : null}
    </SwitchWrapper>
  );
};
