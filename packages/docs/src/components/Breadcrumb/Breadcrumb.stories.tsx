import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { boolean, select, number, text } from '@storybook/addon-knobs';
import { Breadcrumb, colors as themeColors } from 'coderskit';
import sidebar from './Breadcrumb.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=262%3A31',
};

const readme = { sidebar };

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
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Breadcrumb', () => {
    const props = {
      name: text('name', 'Item 1'),
      color: select('color', colors, 'fontPlaceholder') as keyof typeof colors,
      size: number('size', 14),
      src: select('src', icons, icons.user) as keyof typeof icons,
      separator: select('separator', separators, separators.slash) as keyof typeof separators,
      isIconVisible: boolean('iconVisible', true),
      isDividerVisible: boolean('dividerVisible', true),
      href: text('href', 'javascript:;'),
    };

    return (
      <div style={{ display: 'flex' }}>
        <Breadcrumb {...props} />
        <Breadcrumb {...props} />
        <Breadcrumb {...props} isDividerVisible={false} />
      </div>
    );
  });
