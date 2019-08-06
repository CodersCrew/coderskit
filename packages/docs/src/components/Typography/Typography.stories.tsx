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
import sidebar from './Typography.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=618%3A110',
};

const readme = { sidebar };

const typographyGroup = 'Typography';

const asElements = {
  unset: 'unset',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  span: 'span',
  div: 'div',
  label: 'label',
};

const elements = { unset: 'unset', ...Object.keys(fontSizes).reduce((acc, key) => ({ ...acc, [key]: key }), {}) };
const weights = { unset: 'unset', ...Object.keys(fontWeights).reduce((acc, key) => ({ ...acc, [key]: key }), {}) };
const colors = { unset: 'unset', ...Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {}) };

const getTypographyProps = () => ({
  el: select('el', elements, 'unset', typographyGroup) as ThemeFontSizesKeys,
  as: select('as', asElements, 'unset', typographyGroup),
  children: text('children', 'Type something', typographyGroup),
  weight: select('weight', weights, 'unset', typographyGroup) as ThemeFontWeightsKeys,
  color: select('color', colors, 'unset', typographyGroup) as ThemeColorsKeys,
});

storiesOf('Atoms|Typography', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Default typography', () => {
    const props = getTypographyProps();
    const { children, ...rest } = props;

    // eslint-disable-next-line no-restricted-syntax
    for (const key of ['el', 'weight', 'color', 'as']) {
      if (rest[key] === 'unset') {
        delete rest[key];
      }
    }

    return <Typography {...rest}>{children}</Typography>;
  });
