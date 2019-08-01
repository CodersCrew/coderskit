import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, select } from '@storybook/addon-knobs';
import {
  Typography,
  colors as themeColors,
  fontSizes,
  fontWeights,
  ThemeFontSizesKeys,
  ThemeColorsKeys,
  ThemeFontWeightsKeys,
} from 'coderskit';

const typographyGroup = 'Typography';

const asElements = {
  none: 'none',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  span: 'span',
  div: 'div',
  label: 'label',
};

const elements = { none: 'none', ...Object.keys(fontSizes).reduce((acc, key) => ({ ...acc, [key]: key }), {}) };
const weights = { none: 'none', ...Object.keys(fontWeights).reduce((acc, key) => ({ ...acc, [key]: key }), {}) };
const colors = { none: 'none', ...Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {}) };

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Typography',
    () => {
      const props = {
        el: select('el', elements, 'none', typographyGroup) as ThemeFontSizesKeys,
        as: select('as', asElements, 'none', typographyGroup),
        children: text('children', 'Type something', typographyGroup),
        weight: select('weight', weights, 'none', typographyGroup) as ThemeFontWeightsKeys,
        color: select('color', colors, 'none', typographyGroup) as ThemeColorsKeys,
      };

      const { children, ...rest } = props;

      // eslint-disable-next-line no-restricted-syntax
      for (const key of ['el', 'weight', 'color', 'as']) {
        if (rest[key] === 'none') {
          delete rest[key];
        }
      }

      return <Typography {...rest}>{children}</Typography>;
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=618%3A110',
      },
    },
  );
