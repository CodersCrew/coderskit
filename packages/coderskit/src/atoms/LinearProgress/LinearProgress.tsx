import React, { CSSProperties } from 'react';
import { Line } from 'rc-progress';
import { withTheme } from 'emotion-theming';
import { Theme, ThemeColorsKeys } from '../..';

export interface LinearProgressProps {
  size?: number;
  className?: string;
  percent?: number | number[];
  strokeColor?: ThemeColorsKeys | ThemeColorsKeys[];
  trailColor?: ThemeColorsKeys;
  strokeLinecap?: 'butt' | 'square' | 'round';
  style?: CSSProperties;
}

interface AdapterProps extends LinearProgressProps {
  theme: Theme;
}

const LinearProgressAdapter = withTheme(({ theme, ...props }: AdapterProps) => {
  const { size = 8, trailColor = 'border', strokeColor = 'primary' } = props;
  const { colors } = theme;

  const trail = colors[trailColor];
  const stroke = typeof strokeColor === 'string' ? colors[strokeColor] : strokeColor.map(color => colors[color]);
  const realSize = size < 3 ? size / 4.8 : size / 4.81;

  return (
    <Line
      {...props}
      strokeWidth={realSize}
      trailWidth={realSize}
      trailColor={trail}
      strokeColor={stroke}
      prefixCls="ck-linear-progress"
    />
  );
});

export const LinearProgress = (props: LinearProgressProps) => {
  return <LinearProgressAdapter {...props} />;
};
