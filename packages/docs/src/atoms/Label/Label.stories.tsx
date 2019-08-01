import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, boolean } from '@storybook/addon-knobs';
import { Label } from 'coderskit';

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Label',
    () => {
      const props = {
        children: text('children', 'Type something'),
        disabled: boolean('disabled', false),
      };

      const { children, ...rest } = props;

      return <Label {...rest}>{children}</Label>;
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=602%3A0',
      },
    },
  );
