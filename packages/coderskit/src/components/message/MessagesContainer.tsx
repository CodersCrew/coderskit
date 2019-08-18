import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { Message, MessageProps, MessageVariant, MessageKind } from './Message';

export interface MessageArgs {
  duration?: number;
  kind?: MessageKind;
  variant?: MessageVariant;
}

interface MessagesContainerState {
  messages: MessageProps[];
}

type messageFunc = (message: MessageProps) => void;

const MessagesEmmiter = {
  events: {},
  dispatch: function(eventName: string, messageConfig: MessageProps) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((callback: messageFunc) => callback(messageConfig));
  },
  subscribe: function(eventName: string, callback: messageFunc) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  },
};

const ADD_MESSAGE = 'addMessage';
const REMOVE_MESSAGE = 'removeMessage';

const ContainerBase = styled.div(() => {
  return {
    position: 'fixed',
    right: 32,
    top: 32,

    '.ck-message': {
      '* + .ck-icon, .ck-icon + *': {
        marginLeft: 12,
      },

      '+ .ck-message': {
        marginTop: 16,
      },
    },
  };
});

export class MessagesContainer extends React.Component<{}, MessagesContainerState> {
  state: MessagesContainerState = {
    messages: [],
  };

  componentDidMount() {
    MessagesEmmiter.subscribe(ADD_MESSAGE, this.addMessage);
    MessagesEmmiter.subscribe(REMOVE_MESSAGE, this.removeMessage);
  }

  addMessage = (message: MessageProps) => {
    this.setState(
      ({ messages }) => ({
        messages: [message, ...messages],
      }),
      () => {
        setTimeout(() => {
          MessagesEmmiter.dispatch(REMOVE_MESSAGE, message);
        }, message.duration);
      },
    );
  };

  removeMessage = (message: MessageProps) => {
    this.setState(({ messages }) => ({
      messages: messages.filter(({ id }) => id !== message.id),
    }));
  };

  render() {
    return createPortal(
      <ContainerBase>
        {this.state.messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </ContainerBase>,
      document.querySelector('body')!,
    );
  }
}

let currentMessageId = 0;

export const message = (
  children: ReactNode,
  { duration = 3000, kind = 'default', variant = 'outlined' }: MessageArgs = {},
) => {
  const id = String(currentMessageId);
  currentMessageId += 1;

  const messageConfig = { id, children, duration, kind, variant };

  MessagesEmmiter.dispatch(ADD_MESSAGE, messageConfig);
};
