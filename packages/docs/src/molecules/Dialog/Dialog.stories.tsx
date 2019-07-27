import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { Dialog, Button, Typography } from 'coderskit';

storiesOf('Molecules', module).add('Modal', () => {
  const props = {
    isOpen: boolean('isOpen', true),
    ariaHideApp: boolean('ariaHideApp', true),
    shouldFocusAfterRender: boolean('shouldFocusAfterRender', true),
    shouldCloseOnOverlayClick: boolean('shouldCloseOnOverlayClick', true),
    shouldCloseOnEsc: boolean('shouldCloseOnEsc', true),
    shouldReturnFocusAfterClose: boolean('shouldReturnFocusAfterClose', true),
    contentLabel: text('contentLabel', 'Example modal'),
    role: text('role', 'dialog'),
    closeTimeoutMS: number('closeTimeoutMS', 0),
  };

  const actions = {
    onAfterOpen: action('onAfterOpen'),
    onRequestClose: action('onRequestClose'),
  };

  const data = {
    header: text('header', 'Header content'),
    content: text(
      'content',
      'Praesent accumsan tortor id sapien pellentesque, sit amet congue turpis tempor. Donec maximus sed erat sed faucibus. Suspendisse ut lorem in nibh semper dictum eu quis nunc. Sed auctor commodo maximus. Vestibulum mollis at leo a dignissim. Suspendisse varius fermentum pulvinar. Integer nec est ut est congue dignissim vitae non lorem.',
    ),
  };

  return (
    <Dialog {...props} {...actions}>
      <Dialog.Header>
        <Typography el="h3">{data.header}</Typography>
      </Dialog.Header>
      <Dialog.Content>{data.content}</Dialog.Content>
      <Dialog.Footer>
        <Button variant="outlined" color="gray">
          Cancel
        </Button>
        <Button>Confirm</Button>
      </Dialog.Footer>
    </Dialog>
  );
});
