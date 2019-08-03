import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { select, boolean, text } from '@storybook/addon-knobs';
import { TextArea } from 'coderskit';
import content from './TextArea.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=243%3A0',
};

const readme = { content };

const textAreaGroup = 'TextArea';
const statusGroup = '.Status';
const labelGroup = '.Label';
const messageGroup = '.Message';

const dimensions = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const statuses = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading',
};

const resize = {
  none: 'none',
  both: 'both',
  horizontal: 'horizontal',
  vertical: 'vertical',
};

const getTextAreaProps = () => ({
  disabled: boolean('disabled', false, textAreaGroup),
  dimensions: select('dimensions', dimensions, 'default', textAreaGroup) as keyof typeof dimensions,
  resize: select('resize', resize, 'none', textAreaGroup) as keyof typeof resize,
  placeholder: text('placeholder', 'Placeholder', textAreaGroup),
  name: text('name', 'text-area-name', textAreaGroup),
});

const getStatusProps = () => ({
  status: select('status', statuses, 'default', statusGroup) as keyof typeof statuses,
  noIcon: boolean('noIcon', false, statusGroup),
});

const getLabelProps = () => ({
  label: text('label', 'Label', labelGroup),
});

const getMessages = () => ({
  help: text('help', 'Help message', messageGroup),
  error: boolean('error', false, messageGroup),
});

storiesOf('Atoms|TextArea', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Default textarea', () => {
    const props = getTextAreaProps();
    const statusProps = getStatusProps();
    const labelProps = getLabelProps();
    const messageProps = getMessages();

    return (
      <TextArea.Field>
        <TextArea.Label htmlFor={props.name}>{labelProps.label}</TextArea.Label>
        <TextArea.Status {...statusProps}>
          <TextArea {...props} />
        </TextArea.Status>
        <TextArea.Message error={messageProps.error}>{messageProps.help}</TextArea.Message>
      </TextArea.Field>
    );
  });
