import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import ReactTooltip, { RCTooltip } from 'rc-tooltip';
import classnames from 'classnames';
import { transparentize } from 'polished';

export type TooltipProps = Omit<
  RCTooltip.Props,
  | 'prefixCls'
  | 'transitionName'
  | 'ref'
  | 'getTooltipContainer'
  | 'arrowContent'
  | 'align'
  | 'overlayStyle'
  | 'overlayClassName'
>;

interface AdapterProps extends TooltipProps {
  className?: string;
}

interface TooltipBaseProps extends AdapterProps {
  transitionName?: string;
}

const ARROW_WIDTH = 6;
const TOOLTIP_DISTANCE = ARROW_WIDTH + 4;

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const TooltipAdapter = ({ className, ...props }: AdapterProps) => {
  return <ReactTooltip overlayClassName={classnames(className)} prefixCls="ck-tooltip" {...props} />;
};

const TooltipBase = styled(TooltipAdapter)<TooltipBaseProps>(({ theme }) => {
  const { colors, radii, shadows, fontSizes, lineHeights, transitions } = theme;

  return {
    position: 'absolute',
    zIndex: 10,
    display: 'block',
    visibility: 'visible',
    fontSize: fontSizes.body2,
    lineHeight: lineHeights.body2,

    '&.ck-tooltip-hidden': {
      visibility: 'hidden',
    },

    '&.fade-enter': {
      animation: `${show} 0.3s ${transitions.easeOutQuad}`,
    },

    '&.fade-leave': {
      animation: `${hide} 0.3s ${transitions.easeOutQuad}`,
    },

    '.ck-tooltip-inner': {
      width: 'fit-content',
      padding: '4px 24px',
      color: colors.white,
      textAlign: 'center',
      textDecoration: 'none',
      backgroundColor: transparentize(0.2, colors.fontPrimary),
      borderRadius: radii.small,
      boxShadow: shadows.xs,
      minHeight: 32,
    },

    '.ck-tooltip-arrow': {
      position: 'absolute',
      width: 0,
      height: 0,
      borderColor: 'transparent',
      borderStyle: 'solid',
    },

    '&.ck-tooltip-placement-top, &.ck-tooltip-placement-topLeft, &.ck-tooltip-placement-topRight': {
      padding: `${ARROW_WIDTH}px 0 ${TOOLTIP_DISTANCE}px`,

      '.ck-tooltip-arrow': {
        bottom: TOOLTIP_DISTANCE - ARROW_WIDTH,
        marginLeft: -ARROW_WIDTH,
        borderWidth: `${ARROW_WIDTH}px ${ARROW_WIDTH}px 0`,
        borderTopColor: transparentize(0.2, colors.fontPrimary),
      },
    },

    '&.ck-tooltip-placement-top .ck-tooltip-arrow': {
      left: '50%',
    },

    '&.ck-tooltip-placement-topLeft .ck-tooltip-arrow': {
      left: '15%',
    },

    '&.ck-tooltip-placement-topRight .ck-tooltip-arrow': {
      right: '15%',
    },

    '&.ck-tooltip-placement-right, &.ck-tooltip-placement-rightTop, &.ck-tooltip-placement-rightBottom': {
      padding: ` 0 ${ARROW_WIDTH}px 0 ${TOOLTIP_DISTANCE}px`,

      '.ck-tooltip-arrow': {
        left: TOOLTIP_DISTANCE - ARROW_WIDTH,
        marginTop: -ARROW_WIDTH,
        borderWidth: `${ARROW_WIDTH}px ${ARROW_WIDTH}px ${ARROW_WIDTH}px 0`,
        borderRightColor: transparentize(0.2, colors.fontPrimary),
      },
    },

    '&.ck-tooltip-placement-right .ck-tooltip-arrow': {
      top: '50%',
    },

    '&.ck-tooltip-placement-rightTop .ck-tooltip-arrow': {
      top: '15%',
      marginTop: 0,
    },

    '&.ck-tooltip-placement-rightBottom .ck-tooltip-arrow': {
      bottom: '15%',
    },

    '&.ck-tooltip-placement-bottom, &.ck-tooltip-placement-bottomLeft, &.ck-tooltip-placement-bottomRight': {
      padding: ` ${TOOLTIP_DISTANCE}px 0 ${ARROW_WIDTH}px`,

      '.ck-tooltip-arrow': {
        top: TOOLTIP_DISTANCE - ARROW_WIDTH,
        marginLeft: -ARROW_WIDTH,
        borderWidth: `0 ${ARROW_WIDTH}px ${ARROW_WIDTH}px`,
        borderBottomColor: transparentize(0.2, colors.fontPrimary),
      },
    },

    '&.ck-tooltip-placement-bottom .ck-tooltip-arrow': {
      left: '50%',
    },

    '&.ck-tooltip-placement-bottomLeft .ck-tooltip-arrow': {
      left: '15%',
    },

    '&.ck-tooltip-placement-bottomRight .ck-tooltip-arrow': {
      right: '15%',
    },

    '&.ck-tooltip-placement-left, &.ck-tooltip-placement-leftTop, &.ck-tooltip-placement-leftBottom': {
      padding: ` 0 ${TOOLTIP_DISTANCE}px 0 ${ARROW_WIDTH}px`,

      '.ck-tooltip-arrow': {
        right: TOOLTIP_DISTANCE - ARROW_WIDTH,
        marginTop: -ARROW_WIDTH,
        borderWidth: `${ARROW_WIDTH}px 0 ${ARROW_WIDTH}px ${ARROW_WIDTH}px`,
        borderLeftColor: transparentize(0.2, colors.fontPrimary),
      },
    },

    '&.ck-tooltip-placement-left .ck-tooltip-arrow': {
      top: '50%',
    },

    '&.ck-tooltip-placement-leftTop .ck-tooltip-arrow': {
      top: '15%',
      marginTop: 0,
    },

    '&.ck-tooltip-placement-leftBottom .ck-tooltip-arrow': {
      bottom: '15%',
    },
  };
});

export const Tooltip = (props: TooltipProps) => {
  return <TooltipBase {...props} transitionName="fade" />;
};
