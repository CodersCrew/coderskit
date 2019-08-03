import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import createChainedFunction from 'rc-util/lib/createChainedFunction';
import classnames from 'classnames';
import Notice from './Notice';

let seed = 0;
const now = Date.now();

interface Props {
  transitionName?: string;
  animation?: string;
  className?: string;
  maxCount?: number;
  closeIcon?: React.ReactNode;
  style: object;
}

interface NoticeProps {
  key?: string;
  updateKey?: string;
  content?: any;
  add(props: NoticeProps): void;
  remove(key: string): void;
  onClick?(): void;
  onClose?(): void;
}

interface State {
  notices: NoticeProps[];
}

const getUuid = () => `rcNotification_${now}_${seed++}`;

class Notification extends Component<Props, State> {
  static defaultProps = {
    animation: 'fade',
    style: {
      top: 65,
      left: '50%',
    },
  };

  static newInstance: any;

  state: State = {
    notices: [],
  };

  getTransitionName = () => {
    let { transitionName, animation } = this.props;

    if (!transitionName && animation) {
      transitionName = `ck-message-${animation}`;
    }

    return transitionName!;
  };

  add = (notice: NoticeProps) => {
    const key = (notice.key = notice.key || getUuid());
    const { maxCount } = this.props;

    this.setState(({ notices }) => {
      const noticeIndex = notices.map(v => v.key).indexOf(key);
      const updatedNotices = notices.concat();

      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, notice);
      } else {
        if (maxCount && notices.length >= maxCount) {
          notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
          updatedNotices.shift();
        }
        updatedNotices.push(notice);
      }

      return {
        notices: updatedNotices,
      };
    });
  };

  remove = (key: string) => {
    this.setState(({ notices }) => {
      return {
        notices: notices.filter(notice => notice.key !== key),
      };
    });
  };

  renderNotice = (notice: NoticeProps, index: number) => {
    const { closeIcon } = this.props;
    const { notices } = this.state;

    const update = Boolean(index === notices.length - 1 && notice.updateKey);
    const key = notice.updateKey ? notice.updateKey : notice.key;
    const onClose: any = createChainedFunction(this.remove.bind(this, notice.key!), notice.onClose!);

    return (
      <Notice
        prefixCls="ck-message"
        {...notice}
        key={key}
        update={update}
        onClose={onClose}
        onClick={notice.onClick}
        closeIcon={closeIcon}
      >
        {notice.content}
      </Notice>
    );
  };

  render() {
    const { className, style } = this.props;
    const { notices } = this.state;
    const noticeNodes: any = notices.map(this.renderNotice);

    return (
      <div className={classnames('ck-message', className)} style={style}>
        <Animate transitionName={this.getTransitionName()}>{noticeNodes}</Animate>
      </div>
    );
  }
}

Notification.newInstance = (properties: any, callback: (notice: any) => any) => {
  const { getContainer = null, ...props } = properties || {};

  let messagesRootElement = document.getElementById('ck-messages-root')!;

  if (!messagesRootElement) {
    messagesRootElement = document.createElement('div');
    messagesRootElement.id = 'ck-messages-root';
  }

  if (getContainer) {
    const root = getContainer();
    root.appendChild(messagesRootElement);
  } else {
    document.body.appendChild(messagesRootElement);
  }

  let called = false;

  function ref(notification: NoticeProps) {
    if (called) {
      return;
    }

    called = true;

    callback({
      notice(noticeProps: NoticeProps) {
        notification.add(noticeProps);
      },

      removeNotice(key: string) {
        notification.remove(key);
      },

      component: notification,

      destroy() {
        ReactDOM.unmountComponentAtNode(messagesRootElement);
        messagesRootElement.parentNode!.removeChild(messagesRootElement);
      },
    });
  }
  return ReactDOM.createPortal(<Notification {...props} ref={ref} />, messagesRootElement);
};

export default Notification;
