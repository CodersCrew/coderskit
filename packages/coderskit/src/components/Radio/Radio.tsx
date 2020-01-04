import React, { InputHTMLAttributes, LabelHTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { tint } from 'polished';

export type RadioProps = InputHTMLAttributes<HTMLInputElement>;

const RadioBase = styled.div(props => {
  const { colors } = props.theme;

  return {
    position: 'relative',
    width: 20,
    minWidth: 20,
    height: 20,
    overflow: 'hidden',
    borderRadius: '100%',

    '&:focus-within': {
      boxShadow: `0 0 0 4px ${tint(0.8, colors.primary)}`,
    },

    '.ck-radio__hidden': {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'scale(2)',
      padding: 0,
      zIndex: 2,
      opacity: 0,

      '&:disabled': {
        cursor: 'not-allowed',
      },

      '&:not(:disabled)': {
        cursor: 'pointer',
      },

      '&:hover:not(:disabled) + .ck-radio__visible': {
        borderColor: tint(0.4, colors.primary),
      },

      '&:focus + .ck-radio__visible': {
        borderColor: tint(0.4, colors.primary),
      },

      '&:checked:not(:disabled) + .ck-radio__visible': {
        borderColor: colors.primary,
        borderWidth: 6,
      },

      '&:disabled:not(:checked) + .ck-radio__visible': {
        backgroundColor: colors.disabled,
      },

      '&:disabled:checked + .ck-radio__visible': {
        borderColor: colors.disabled,
        borderWidth: 6,
      },
    },

    '.ck-radio__visible': {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderRadius: '100%',
      border: `2px solid ${colors.border}`,
    },
  };
});

export const Radio = ({ className, ...props }: RadioProps) => {
  return (
    <RadioBase className={classnames(className, 'ck-radio')}>
      <input {...props} type="radio" className="ck-radio__hidden" />
      <div className="ck-radio__visible" />
    </RadioBase>
  );
};

export type RadioLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

interface RadioLabelBaseProps extends RadioLabelProps {
  disabled?: boolean;
}

const RadioLabelBase = styled.label<RadioLabelBaseProps>(props => {
  const { theme, disabled } = props;
  const { fontSizes, fontWeights, lineHeights, colors } = theme;

  return {
    display: 'flex',
    alignItems: 'flex-start',
    width: 'fit-content',
    fontSize: fontSizes.body2,
    lineHeight: lineHeights.body2,
    fontWeight: fontWeights.regular,
    color: colors[disabled ? 'fontDisabled' : 'fontRegular'],
    userSelect: 'none',

    '.ck-radio': {
      marginRight: 8,
    },

    '.ck-radio + *': {
      position: 'relative',
      top: -2,
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
  };
});

export const RadioLabel = ({ children, ...props }: RadioLabelProps) => {
  let disabled = false;

  const childrenElements = React.Children.map(children, child => {
    if (typeof child === 'string' && child.trim()) {
      return <span>{child}</span>;
    } else if (typeof child === 'object') {
      disabled = !!(child as ReactElement<RadioProps>).props.disabled;
    }

    return child;
  });

  return (
    <RadioLabelBase {...props} className={classnames(props.className, 'ck-radio-label')} disabled={disabled}>
      {childrenElements}
    </RadioLabelBase>
  );
};

Radio.Label = RadioLabel;

export type RadioGroupLayout = 'vertical' | 'horizontal';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactElement<RadioProps>[];
  layout?: RadioGroupLayout;
  spaceBetween?: number;
}

type RadioGroupWrapperProps = Omit<RadioGroupProps, 'name' | 'children' | 'onChange' | 'onFocus' | 'onBlur'>;

const RadioGroupWrapper = styled.div<RadioGroupWrapperProps>(props => {
  const { layout, spaceBetween } = props;
  const isHorizontal = layout === 'horizontal';

  return {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',

    '.ck-radio-label + .ck-radio-label': {
      marginTop: !isHorizontal ? spaceBetween : 0,
      marginLeft: isHorizontal ? spaceBetween : 0,
    },
  };
});

export const RadioGroup = ({ name, children, onChange, ...props }: RadioGroupProps) => {
  const childrenWithNames = React.Children.map(children, child => {
    const children = React.Children.map(child.props.children as ReactElement[], innerChild => {
      if (innerChild.props && innerChild.props.value) {
        return React.cloneElement(innerChild, { name, onChange });
      }

      return innerChild;
    });

    return React.cloneElement(child, {}, children);
  });

  return (
    <RadioGroupWrapper {...props} className={classnames(props.className, 'ck-radio-group')}>
      {childrenWithNames}
    </RadioGroupWrapper>
  );
};

RadioGroup.defaultProps = {
  options: [],
  layout: 'vertical',
  spaceBetween: 12,
};

Radio.Group = RadioGroup;
