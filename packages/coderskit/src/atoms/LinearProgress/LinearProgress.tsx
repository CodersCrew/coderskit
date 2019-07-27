import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { ThemeColorsKeys } from '../..';

export interface LinearProgressProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  percent?: number | number[];
  strokeColor?: ThemeColorsKeys | ThemeColorsKeys[];
  trailColor?: ThemeColorsKeys;
}

interface LinearProgressPercentProps {
  strokeColor?: ThemeColorsKeys;
  percent: number;
}

const LinearProgressBase = styled.div<LinearProgressProps>(props => {
  const { theme, size } = props;
  const { colors, radii, transitions } = theme;

  return {
    height: size,
    borderRadius: radii.small,
    backgroundColor: colors.border,
    overflow: 'hidden',

    '.ck-linear-progress-percent': {
      height: '100%',
      transition: `all 0.3s ${transitions.easeOutQuart}`,
    },
  };
});

const LinearProgressPercent = styled.div<LinearProgressPercentProps>(props => {
  const { theme, percent, strokeColor } = props;
  const { colors } = theme;

  return {
    backgroundColor: colors[strokeColor || 'primary'],
    width: `${percent}%`,
  };
});

export const LinearProgress = ({ percent, strokeColor, className, ...props }: LinearProgressProps) => {
  const percents = typeof percent === 'number' ? [percent] : percent!;
  const strokeColors = typeof strokeColor === 'string' ? [strokeColor] : strokeColor!;

  return (
    <LinearProgressBase {...props} className={classnames('ck-linear-progress', className)}>
      {percents.map((percent, i) => (
        <LinearProgressPercent
          key={i}
          className="ck-linear-progress-percent"
          percent={percent || 0}
          strokeColor={strokeColors[i] as ThemeColorsKeys}
        />
      ))}
    </LinearProgressBase>
  );
};

LinearProgress.defaultProps = {
  size: 8,
  percent: 0,
  strokeColor: 'priamry',
  trailColor: 'border',
};
