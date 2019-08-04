import React, { ReactNode, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Icon, Theme, ThemeColorsKeys } from '../..';

import ExclamationCircleSolid from '../../icons/ExclamationCircleSolid';
import CheckCircleSolid from '../../icons/CheckCircleSolid';
import ExclamationTriangleSolid from '../../icons/ExclamationTriangleSolid';
import InfoCircleSolid from '../../icons/InfoCircleSolid';

export type MessageVariant = 'contained' | 'outlined';

export type MessageKind = 'info' | 'success' | 'warning' | 'error' | 'default';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  children: ReactNode;
  duration: number;
  kind: MessageKind;
  variant: MessageVariant;
}

type MessageBaseProps = Omit<MessageProps, 'children'>;

const getColor = (kind: MessageKind, { colors }: Theme, isOutlined?: boolean) => {
  if (kind === 'error') return colors.error;
  if (kind === 'info') return colors.info;
  if (kind === 'success') return colors.success;
  if (kind === 'warning') return colors.warning;
  return isOutlined ? colors.border : colors.white;
};

const getIconData = (kind: MessageKind) => {
  if (kind === 'error') return { icon: ExclamationCircleSolid, color: 'error' as ThemeColorsKeys };
  if (kind === 'info') return { icon: InfoCircleSolid, color: 'info' as ThemeColorsKeys };
  if (kind === 'success') return { icon: CheckCircleSolid, color: 'success' as ThemeColorsKeys };
  if (kind === 'warning') return { icon: ExclamationTriangleSolid, color: 'warning' as ThemeColorsKeys };
  return null;
};

const MessageBase = styled.div<MessageBaseProps>(({ theme: { radii, fontSizes, lineHeights } }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 240,
  borderRadius: radii.small,
  fontSize: fontSizes.body2,
  lineHeight: lineHeights.body2,
  fontWeight: 400,
}));

const ContainedMessage = styled(MessageBase)(({ theme, kind }) => ({
  boxShadow: theme.shadows.md,
  padding: '12px 16px',
  backgroundColor: getColor(kind!, theme),
  color: kind === 'default' ? theme.colors.fontRegular : theme.colors.white,
}));

const OutlinedMessage = styled(MessageBase)(({ theme, kind }) => ({
  boxShadow: theme.shadows.sm,
  padding: '11px 15px',
  backgroundColor: theme.colors.white,
  border: `${theme.borderWidths.regular} solid ${getColor(kind!, theme, true)}`,
  color: theme.colors.fontRegular,
}));

export const Message = ({ children, className, ...props }: MessageProps) => {
  const MessageComponent = props!.variant === 'contained' ? ContainedMessage : OutlinedMessage;
  const iconData = props!.variant === 'contained' ? getIconData(props.kind!) : getIconData(props.kind!);

  if (props!.variant === 'contained' && iconData) {
    iconData.color = 'white';
  }

  const parsedChildren = React.Children.map(children, child =>
    typeof child === 'string' ? <span>{child}</span> : child,
  );

  return (
    <MessageComponent {...props} className={classnames(className, 'ck-message')}>
      {iconData && <Icon {...iconData} size={20} />}
      {parsedChildren}
    </MessageComponent>
  );
};
