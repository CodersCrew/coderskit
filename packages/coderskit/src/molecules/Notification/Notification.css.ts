import { css, keyframes } from '@emotion/core';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export default css`
  .ck-message {
    position: fixed;
    z-index: 1000;
  }
  .ck-message-notice {
    background: #fff;
    display: block;
    width: auto;
    line-height: 1.5;
    position: relative;
    padding: 0;
    border-radius: 0;
    background: none;
    margin: 0;
    border: none;
    box-shadow: none;

    & + & {
      margin-top: 16px;
    }
  }
  .ck-message-notice-closable {
    padding-right: 20px;
  }
  .ck-message-notice-close {
    position: absolute;
    right: 5px;
    top: 3px;
    color: #000;
    cursor: pointer;
    outline: none;
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
    text-decoration: none;
  }
  .ck-message-notice-close-x:after {
    content: '×';
  }
  .ck-message-notice-close:hover {
    opacity: 1;
    filter: alpha(opacity=100);
    text-decoration: none;
  }
  .ck-message-fade-enter {
    opacity: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;
  }
  .ck-message-fade-leave {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;
  }
  .ck-message-fade-enter.ck-message-fade-enter-active {
    animation-name: ${fadeIn};
    animation-play-state: running;
  }
  .ck-message-fade-leave.ck-message-fade-leave-active {
    animation-name: ${fadeOut};
    animation-play-state: running;
  }
`;
