import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import { boolean, text, number } from '@storybook/addon-knobs';
import { Dialog, Button, Typography } from 'coderskit';
import content from './Dialog.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=222%3A0',
};

const readme = { content };

const getDialogProps = () => ({
  ariaHideApp: boolean('ariaHideApp', true),
  shouldFocusAfterRender: boolean('shouldFocusAfterRender', true),
  shouldCloseOnOverlayClick: boolean('shouldCloseOnOverlayClick', true),
  shouldCloseOnEsc: boolean('shouldCloseOnEsc', true),
  shouldReturnFocusAfterClose: boolean('shouldReturnFocusAfterClose', true),
  contentLabel: text('contentLabel', 'Example modal'),
  role: text('role', 'dialog'),
  closeTimeoutMS: number('closeTimeoutMS', 0),
});

const getActions = () => ({
  onAfterOpen: action('onAfterOpen'),
  onRequestClose: action('onRequestClose'),
});

const getData = () => ({
  header: text('header', 'Header content'),
  content: text(
    'content',
    'Praesent accumsan tortor id sapien pellentesque, sit amet congue turpis tempor. Donec maximus sed erat sed faucibus. Suspendisse ut lorem in nibh semper dictum eu quis nunc. Sed auctor commodo maximus. Vestibulum mollis at leo a dignissim. Suspendisse varius fermentum pulvinar. Integer nec est ut est congue dignissim vitae non lorem.',
  ),
});

const DialogComponent = ({ props, data, actions }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);

  const handleRequestClose = (e: MouseEvent | KeyboardEvent) => {
    setIsOpen(false);
    actions.onRequestClose(e);
  };

  return (
    <>
      <Dialog {...props} {...actions} isOpen={isOpen} onRequestClose={handleRequestClose}>
        <Dialog.Header>
          <Typography el="h3">{data.header}</Typography>
        </Dialog.Header>
        <Dialog.Content>{data.content}</Dialog.Content>
        <Dialog.Footer>
          <Button onClick={handleRequestClose} variant="outlined" color="gray">
            Cancel
          </Button>
          <Button onClick={handleRequestClose}>Confirm</Button>
        </Dialog.Footer>
      </Dialog>
      <Button onClick={handleClick}>Open dialog</Button>
    </>
  );
};

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Dialog', () => {
    const props = getDialogProps();
    const actions = getActions();
    const data = getData();

    return <DialogComponent props={props} data={data} actions={actions} />;
  });
