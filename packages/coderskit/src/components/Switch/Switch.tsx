import React, { InputHTMLAttributes, LabelHTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { tint } from 'polished';

export type SwitchProps = InputHTMLAttributes<HTMLInputElement>;

const SwitchBase = styled.div(props => {
  const { colors, radii, transitions } = props.theme;

  return {
    position: 'relative',
    width: 40,
    minWidth: 40,
    height: 20,
    overflow: 'hidden',
    borderRadius: radii.small,

    '&:focus-within': {
      boxShadow: `0 0 0 4px ${tint(0.8, colors.primary)}`,
    },

    '.ck-switch-hidden': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: 0,
      zIndex: 2,
      opacity: 0,

      '&:disabled': {
        cursor: 'not-allowed',
      },

      '&:not(:disabled)': {
        cursor: 'pointer',
      },

      '&:hover:not(:disabled) + .ck-switch-visible': {
        backgroundColor: tint(0.4, colors.primary),
      },

      '&:focus + .ck-switch-visible': {
        backgroundColor: tint(0.4, colors.primary),
      },

      '&:checked:not(:disabled) + .ck-switch-visible': {
        backgroundColor: colors.primary,

        '.ck-switch-dot': {
          transform: 'translateX(20px)',
        },
      },

      '&:disabled:not(:checked) + .ck-switch-visible': {
        backgroundColor: colors.disabled,
      },

      '&:disabled:checked + .ck-switch-visible': {
        backgroundColor: colors.fontDisabled,

        '.ck-switch-dot': {
          transform: 'translateX(20px)',
        },
      },
    },

    '.ck-switch-visible': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: 2,
      borderRadius: radii.small,
      backgroundColor: colors.border,
    },

    '.ck-switch-dot': {
      position: 'relative',
      width: 16,
      height: 16,
      backgroundColor: colors.white,
      borderRadius: radii.small,
      transition: `transform 0.3s ${transitions.easeOutQuart}`,
    },
  };
});

export const Switch = ({ className, ...props }: SwitchProps) => {
  return (
    <SwitchBase className={classnames(className, 'ck-switch')}>
      <input {...props} type="checkbox" className="ck-switch-hidden" />
      <div className="ck-switch-visible">
        <div className="ck-switch-dot" />
      </div>
    </SwitchBase>
  );
};

export type SwitchLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

interface SwitchLabelBaseProps extends SwitchLabelProps {
  disabled?: boolean;
}

const SwitchLabelBase = styled.label<SwitchLabelBaseProps>(props => {
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

    '.ck-switch': {
      marginRight: 8,
    },

    '.ck-switch + *': {
      position: 'relative',
      top: -2,
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
  };
});

export const SwitchLabel = ({ children, ...props }: SwitchLabelProps) => {
  let disabled = false;

  const childrenElements = React.Children.map(children, child => {
    if (typeof child === 'string' && child.trim()) {
      return <span>{child}</span>;
    } else if (typeof child === 'object') {
      disabled = !!(child as ReactElement<SwitchProps>).props.disabled;
    }

    return child;
  });

  return (
    <SwitchLabelBase {...props} className={classnames(props.className, 'ck-switch-label')} disabled={disabled}>
      {childrenElements}
    </SwitchLabelBase>
  );
};

Switch.Label = SwitchLabel;
