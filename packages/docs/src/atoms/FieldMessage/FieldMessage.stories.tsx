import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, boolean } from '@storybook/addon-knobs';
import { FieldMessage } from 'coderskit';

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'FieldMessage',
    () => {
      const props = {
        children: text('children', 'Type something'),
        error: boolean('error', false),
      };

      const { children, ...rest } = props;

      return <FieldMessage {...rest}>{children}</FieldMessage>;
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=600%3A796',
      },
    },
  );
