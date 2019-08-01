import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text } from '@storybook/addon-knobs';
import { Divider } from 'coderskit';

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Divider',
    () => {
      const props = {
        children: text('children', 'Label text'),
      };

      const { children } = props;

      return <Divider>{children}</Divider>;
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=112%3A446',
      },
    },
  );
