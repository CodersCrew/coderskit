import React, { useCallback, useState, HTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Icon, ThemeColorsKeys } from '../..';

type BadgePosition = 'leftTop' | 'rightTop' | 'rightBottom' | 'leftBottom';

type BadgeValue = number | string | ReactElement<Icon>;

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  circle?: boolean;
  color?: ThemeColorsKeys;
  maxLength?: number;
  position?: BadgePosition;
  value?: BadgeValue;
}

interface BadgeBaseProps extends Omit<BadgeProps, 'children' | 'value'> {
  badgeWidth: number;
  hasChildren: boolean;
  hasValue: boolean;
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

const getPosition = (position: BadgePosition, circle: boolean, badgeWidth: number, hasValue: boolean) => {
  let [valueY, valueX] = [9, 9];

  if (!hasValue) {
    valueY -= circle ? 5 : 4;
    valueX -= circle ? 6 : 4;
  } else if (badgeWidth) {
    valueX = valueX + badgeWidth / 2 - 10;
  }

  if (circle) {
    valueY -= 4;
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

const BadgeWrapper = styled.div<BadgeBaseProps>(props => {
  const { theme, color, position, circle, badgeWidth, hasChildren, hasValue } = props;
  const { colors, fontSizes, lineHeights } = theme;
  const positionObj = hasChildren ? getPosition(position!, circle!, badgeWidth, hasValue) : {};

  return {
    position: hasChildren ? 'relative' : 'static',
    width: 'fit-content',

    '.ck-badge-value': {
      position: hasChildren ? 'absolute' : 'static',
      opacity: badgeWidth ? 1 : 0,
      ...positionObj,
      width: hasValue ? 'fit-content' : 12,
      minWidth: hasValue ? 20 : 12,
      height: hasValue ? undefined : 12,
      padding: '0 4px',
      border: `2px solid ${colors.white}`,
      borderRadius: 10,
      backgroundColor: colors[color!],
      fontSize: fontSizes.caption1,
      lineHeight: lineHeights.caption1,
      textAlign: 'center',
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
  const hasChildren = !!children;
  const hasValue = typeof value !== 'undefined';
  const parsedValue = parseValue(value!, props.maxLength!);

  return (
    <BadgeWrapper {...props} badgeWidth={badgeWidth} hasChildren={hasChildren} hasValue={hasValue}>
      <div className="ck-badge-value" ref={ref}>
        {parsedValue}
      </div>
      {children}
    </BadgeWrapper>
  );
};

Badge.defaultProps = {
  circle: false,
  color: 'primary',
  maxLength: 4,
  position: 'rightTop',
};
