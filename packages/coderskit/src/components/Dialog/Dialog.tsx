import React, { HTMLAttributes } from 'react';
import Modal from 'react-modal';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { Omit } from 'utility-types';
import { transparentize } from 'polished';
import { Divider } from '../..';

type ReactModalProps = Omit<ReactModal.Props, 'overlayClassName' | 'contentClassName'>;

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export type DialogContentProps = HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export interface DialogProps extends ReactModalProps {
  width?: number | string;
}

Modal.setAppElement('#root');

const ModalAdapter = ({ className, ...props }: DialogProps) => {
  const contentClassName = 'ck-dialog__window';
  const overlayClassName = 'ck-dialog__overlay';

  return (
    <Modal
      portalClassName={classnames(className, 'ck-dialog')}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};

const DialogBase = styled(ModalAdapter)(props => {
  const { theme, width } = props;
  const { colors, radii, shadows, fontSizes, fontWeights, lineHeights } = theme;

  return {
    '.ck-dialog__overlay': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: transparentize(0.2, colors.black),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '.ck-dialog__window': {
      maxWidth: width,
      padding: 16,
      backgroundColor: colors.white,
      borderRadius: radii.large,
      boxShadow: shadows.lg,
      outline: 'none',
    },

    '.ck-dialog__header': {
      margin: '-16px -16px 0',
    },

    '.ck-dialog__content': {
      padding: '16px 0',
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      fontWeight: fontWeights.regular,
      color: colors.fontRegular,
    },

    '.ck-dialog__footer': {
      margin: '0 -16px -16px',
    },

    '.ck-dialog__footer-content, .ck-dialog__header-content': {
      padding: '12px 16px',
    },

    '.ck-dialog__footer-content': {
      display: 'flex',
      justifyContent: 'flex-end',
    },

    '.ck-button + .ck-button': {
      marginLeft: 16,
    },
  };
});

const DialogHeader = ({ children, className, ...props }: DialogHeaderProps) => {
  className = classnames(className, 'ck-dialog__header');

  return (
    <div {...props} className={className}>
      <div className="ck-dialog__header-content">{children}</div>
      <Divider />
    </div>
  );
};

const DialogContent = ({ children, className, ...props }: DialogContentProps) => {
  className = classnames(className, 'ck-dialog__content');

  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};

const DialogFooter = ({ children, className, ...props }: DialogFooterProps) => {
  className = classnames(className, 'ck-dialog__footer');

  return (
    <div {...props} className={className}>
      <Divider />
      <div className="ck-dialog__footer-content">{children}</div>
    </div>
  );
};

export const Dialog = (props: DialogProps) => <DialogBase {...props} />;

Dialog.defaultProps = {
  width: 480,
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
