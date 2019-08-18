import React, { HTMLAttributes, ReactNode, ReactElement, LabelHTMLAttributes } from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { ThemeColorsKeys } from '../..';

// SINGLE STEP

export type StepState = 'success' | 'error' | 'active' | 'pending';

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  state?: StepState;
  labelLayout?: LabelLayout;
  children?: ReactNode;
}

interface StepContentProps extends StepProps {
  size?: number;
  color?: ThemeColorsKeys;
  fontColor?: ThemeColorsKeys;
  children?: ReactNode;
}

export const StepContentBase = styled.div<StepContentProps>(props => {
  const { colors } = props.theme;
  const color = colors[props.color!];
  const fontColor = colors[props.fontColor!];

  return {
    display: 'flex',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${color}`,
    backgroundColor: color,
    color: fontColor,
    width: props.size,
    height: props.size,
  };
});

const StepContentSuccess = styled(StepContentBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.white,
  };
});

const StepContentError = styled(StepContentBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.error,
    borderColor: colors.error,
    color: colors.white,
  };
});

const StepContentActive = styled(StepContentBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    color: colors.primary,
  };
});

const StepContentPending = styled(StepContentBase)(props => {
  const { colors } = props.theme;

  return {
    backgroundColor: colors.white,
    borderColor: colors.fontDisabled,
    color: colors.fontDisabled,
  };
});

const StepVertical = styled.div<StepProps>(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
  };
});

const StepHorizontal = styled.div<StepProps>(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px',

    '.ck-step-content': {
      marginRight: 8,
    },
  };
});

export const StepContent = (props: StepContentProps) => {
  const StepContent =
    props.state === 'success'
      ? StepContentSuccess
      : props.state === 'error'
      ? StepContentError
      : props.state === 'active'
      ? StepContentActive
      : props.state === 'pending'
      ? StepContentPending
      : StepContentBase;

  return (
    <StepContent {...props} className={classnames(props.className, 'ck-step-content')}>
      {props.children}
    </StepContent>
  );
};

export const Step = (props: StepProps) => {
  const StepWrapper = props.labelLayout === 'vertical' ? StepVertical : StepHorizontal;

  return <StepWrapper className={classnames(props.className, 'ck-step')}>{props.children}</StepWrapper>;
};

// STEP LABEL

export type LabelLayout = 'vertical' | 'horizontal';

export interface StepLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  state?: StepState;
  children?: ReactNode;
}

const StepLabelWrapper = styled.label<StepLabelProps>(props => {
  const { theme, state } = props;
  const { fontSizes, fontWeights, lineHeights, colors } = theme;

  return {
    width: 'fit-content',
    whiteSpace: 'nowrap',
    fontSize: fontSizes.body2,
    lineHeight: lineHeights.body2,
    fontWeight: fontWeights.regular,
    color: colors[state === 'active' ? 'primary' : 'fontDisabled'],
  };
});

export const StepLabel = ({ children, ...props }: StepLabelProps) => {
  return (
    <StepLabelWrapper {...props} className={classnames(props.className, 'ck-step-label')}>
      <span>{children}</span>
    </StepLabelWrapper>
  );
};

// SEPARATOR

export interface SeparatorProps extends StepContentProps {
  topOffset?: string;
}

const Separator = styled.div<SeparatorProps>(props => {
  const { colors } = props.theme;

  return {
    height: '1px',
    width: '100%',
    marginTop: props.topOffset,
    backgroundColor: colors.fontDisabled,
  };
});

// STEP GROUP

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  activeStep?: number;
  labelLayout?: LabelLayout;
}

const StepsWrapper = styled.div<StepsProps>(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
  };
});

const calculateSeparatorTopOffset = (StepWrapper: ReactElement) => {
  const stepContent = StepWrapper!.props.children[0];
  return `${stepContent.props.size / 2 + 10}px`;
};

export const Steps = ({ children, ...props }: StepsProps) => {
  const className = classnames(props.className, 'ck-steps');

  // Determine child's state and pass number as a child (only if it's active or pending)
  const childrenWithState = React.Children.map(children as ReactElement[], (child, index) => {
    const state = index === props.activeStep ? 'active' : index > props.activeStep! ? 'pending' : undefined;

    if (index >= props.activeStep!) {
      let number = index + 1;
      let updatedChildren = React.Children.map(child.props.children as ReactElement[], (innerChild, index) => {
        if (index === 0) {
          return React.cloneElement(innerChild as ReactElement, { state: state, children: number });
        } else {
          return React.cloneElement(innerChild as ReactElement, { state: state });
        }
      });
      return React.cloneElement(child, {}, updatedChildren);
    }

    return child;
  });

  // Pass label layout to children
  const calcChildren = childrenWithState.length;
  const childrenWithLabels: ReactNode[] = [];
  const labelLayout = props.labelLayout;

  childrenWithState.forEach((element: ReactNode) => {
    childrenWithLabels.push(React.cloneElement(element as ReactElement, { labelLayout: labelLayout }));
  });

  // Add separators between steps
  const topOffset = calculateSeparatorTopOffset(children![0]);

  const childrenWithSeparators: ReactNode[] = [];
  childrenWithLabels.forEach((element: ReactNode, index) => {
    childrenWithSeparators.push(element);
    if (index < calcChildren - 1) {
      childrenWithSeparators.push(<Separator topOffset={topOffset} />);
    }
  });

  return (
    <StepsWrapper {...props} className={className}>
      {childrenWithSeparators}
    </StepsWrapper>
  );
};

StepContent.defaultProps = {
  fontColor: 'white',
  color: 'primary',
  size: 32,
  children: '',
};

Step.defaultProps = {
  labelLeyout: 'vertical',
};

Steps.defaultProps = {
  activeStep: 2,
};

Step.Label = StepLabel;
Step.Content = StepContent;
