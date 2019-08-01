import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { number, select } from '@storybook/addon-knobs';
import { omit } from 'lodash-es';
import { Badge, Icon, colors as themeColors } from 'coderskit';
import readme from './Badge.md';

const positions = {
  leftTop: 'leftTop',
  rightTop: 'rightTop',
  rightBottom: 'rightBottom',
  leftBottom: 'leftBottom',
};

const colors = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

const baseStyle = {
  backgroundColor: 'lightGrey',
  width: 40,
  height: 40,
};

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=17%3A236',
};

const getBadgeProps = () => ({
  value: number('value', 3),
  maxLength: number('maxLength', 2),
  color: select('color', colors, 'success') as keyof typeof colors,
  position: select('position', positions, 'rightTop') as keyof typeof positions,
});

storiesOf('Badge', module)
  .addDecorator(withDesign)
  .add(
    'Empty badge',
    () => {
      const props = omit(getBadgeProps(), ['value']);

      return (
        <div style={{ display: 'flex' }}>
          <Badge {...props}>
            <div style={{ ...baseStyle, borderRadius: 4 }} />
          </Badge>
          <Badge {...props} style={{ marginLeft: 24 }} circle>
            <div style={{ ...baseStyle, borderRadius: '100%' }} />
          </Badge>
        </div>
      );
    },
    {
      design,
      readme: {
        content: readme,
      },
    },
  )
  .add(
    'Badge with number',
    () => {
      const props = getBadgeProps();

      return (
        <div style={{ display: 'flex' }}>
          <Badge {...props}>
            <div style={{ ...baseStyle, borderRadius: 4 }} />
          </Badge>
          <Badge {...props} circle style={{ marginLeft: 24 }}>
            <div style={{ ...baseStyle, borderRadius: '100%' }} />
          </Badge>
        </div>
      );
    },
    {
      design,
      readme: {
        content: readme,
      },
    },
  )
  .add(
    'Badge with icon',
    () => {
      const props = omit(getBadgeProps(), ['value']);

      return (
        <div style={{ display: 'flex' }}>
          <Badge {...props} value={<Icon src="check-solid.svg" />}>
            <div style={{ ...baseStyle, borderRadius: 4 }} />
          </Badge>
          <Badge {...props} value={<Icon src="check-solid.svg" />} circle style={{ marginLeft: 24 }}>
            <div style={{ ...baseStyle, borderRadius: '100%' }} />
          </Badge>
        </div>
      );
    },
    {
      design,
      readme: {
        content: readme,
      },
    },
  )
  .add(
    'Standalone badge',
    () => {
      const props = getBadgeProps();

      const { value, ...rest } = props;

      return (
        <div style={{ display: 'flex' }}>
          <Badge {...rest} value={value} />
          <Badge {...rest} value={<Icon src="check-solid.svg" />} style={{ marginLeft: 24 }} />
        </div>
      );
    },
    {
      design,
      readme: {
        content: readme,
      },
    },
  );
