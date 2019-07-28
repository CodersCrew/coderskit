import React, { useCallback, useState, HTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Icon, ThemeColorsKeys } from '../..';

type BadgePosition = 'leftTop' | 'rightTop' | 'rightBottom' | 'leftBottom';

type BadgeValue = number | string | ReactElement<Icon>;

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  circle?: boolean;
  color?: ThemeColorsKeys;
  position?: BadgePosition;
  value?: BadgeValue;
  maxLength?: number;
}

interface BadgeBaseProps extends BadgeProps {
  badgeWidth: number;
}

const useClientRect = (updaters: any[] = []): [ClientRect | undefined, any] => {
  const [rect, setRect] = useState<ClientRect>();
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, updaters);
  return [rect, ref];
};

const getPosition = (position: BadgePosition, circle: boolean, badgeWidth: number, value?: BadgeValue) => {
  let [valueY, valueX] = [10, 10];

  if (typeof value === 'undefined') {
    valueY -= circle ? 6 : 4;
    valueX -= circle ? 6 : 4;
  } else if (badgeWidth) {
    valueX = valueX + badgeWidth / 2 - 10;
  }

  if (circle) {
    valueY -= 3;
    valueX -= 2;
  }

  switch (position) {
    case 'leftTop':
      return { top: -valueY, left: -valueX };
    case 'rightTop':
      return { top: -valueY, right: -valueX };
    case 'rightBottom':
      return { bottom: -valueY, right: -valueX };
    default:
      return { bottom: -valueY, left: -valueX };
  }
};

const parseValue = (value: BadgeValue, maxLength: number) => {
  if (typeof value !== 'number') return value;

  const valueLength = value.toString().length;

  if (valueLength > maxLength) {
    return `${Array.from(Array(maxLength))
      .fill('9')
      .join('')}+`;
  }

  return value;
};

const BadgeBase = styled.div<BadgeBaseProps>(props => {
  const { theme, color, position, circle, badgeWidth, value } = props;
  const { colors, fontSizes, lineHeights } = theme;

  return {
    position: 'relative',
    width: 'fit-content',

    '.ck-badge-value': {
      position: 'absolute',
      opacity: badgeWidth ? 1 : 0,
      ...getPosition(position!, circle!, badgeWidth, value),
      width: typeof value === 'undefined' ? 12 : 'fit-content',
      minWidth: typeof value === 'undefined' ? 12 : 20,
      height: typeof value === 'undefined' ? 12 : undefined,
      padding: '0 4px',
      border: `2px solid ${colors.white}`,
      borderRadius: 10,
      backgroundColor: colors[color!],
      fontSize: fontSizes.caption1,
      lineHeight: lineHeights.caption1,
      color: colors.white,
    },

    '.ck-icon': {
      width: 8,
      height: 8,
      minWidth: 8,
      minHeight: 8,
      color: colors.white,
    },
  };
});

export const Badge = ({ children, value, ...props }: BadgeProps) => {
  const [rect, ref] = useClientRect([value, props.maxLength]);

  const badgeWidth = rect ? rect.width : 0;
  value = parseValue(value!, props.maxLength!);

  return (
    <BadgeBase {...props} value={value} badgeWidth={badgeWidth}>
      <div className="ck-badge-value" ref={ref}>
        {value}
      </div>
      {children}
    </BadgeBase>
  );
};

Badge.defaultProps = {
  circle: false,
  color: 'primary',
  position: 'rightTop',
  maxLength: 4,
};
