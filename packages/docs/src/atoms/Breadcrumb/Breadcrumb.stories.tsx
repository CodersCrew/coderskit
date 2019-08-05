import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, number, text } from '@storybook/addon-knobs';
import { Breadcrumb, colors as themeColors } from 'coderskit';
import readme from './Breadcrumb.md';

const colors = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

const icons = {
  user: 'user-solid.svg',
};

const separators = {
  slash: 'slash-solid.svg',
  arrow: 'arrow-right-solid.svg',
  chevron: 'chevron-right-solid.svg',
};

storiesOf('Atoms', module)
  .addParameters({
    readme: {
      content: readme,
    },
  })
  .add('Breadcrumb', () => {
    const props = {
      name: text('name', 'Item 1'),
      color: select('color', colors, 'fontPlaceholder') as keyof typeof colors,
      size: number('size', 14),
      src: select('src', icons, icons.user) as keyof typeof icons,
      separator: select('separator', separators, separators.slash) as keyof typeof separators,
      iconVisible: boolean('iconVisible', true),
      dividerVisible: boolean('dividerVisible', true),
      href: text('href', 'javascript:;'),
    };

    return (
      <div style={{ display: 'flex' }}>
        <Breadcrumb {...props} />
        <Breadcrumb {...props} />
        <Breadcrumb {...props} dividerVisible={false} />
      </div>
    );
  });
