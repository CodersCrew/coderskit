import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select } from '@storybook/addon-knobs';
import { Badge, Button, Icon, colors as themeColors } from 'coderskit';

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

storiesOf('Atoms', module).add('Badge', () => {
  const props = {
    value: number('value', 3),
    maxLength: number('maxLength', 2),
    color: select('color', colors, 'success') as keyof typeof colors,
    position: select('position', positions, 'rightTop') as keyof typeof positions,
  };

  const { value, ...rest } = props;

  return (
    <div style={{ display: 'flex' }}>
      <Badge {...rest} value={value}>
        <div style={{ ...baseStyle, borderRadius: 4 }} />
      </Badge>
      <Badge {...rest} value={value} circle style={{ marginLeft: 24 }}>
        <div style={{ ...baseStyle, borderRadius: '100%' }} />
      </Badge>
      <Badge {...rest} value={<Icon src="check-solid.svg" />} style={{ marginLeft: 24 }}>
        <div style={{ ...baseStyle, borderRadius: 4 }} />
      </Badge>
      <Badge {...rest} style={{ marginLeft: 24 }}>
        <div style={{ ...baseStyle, borderRadius: 4 }} />
      </Badge>
      <Badge {...rest} style={{ marginLeft: 24 }} circle>
        <div style={{ ...baseStyle, borderRadius: '100%' }} />
      </Badge>
    </div>
  );
});
