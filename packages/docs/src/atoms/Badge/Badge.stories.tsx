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
        <Button>Badge button</Button>
      </Badge>
      <Badge {...rest} value={value} circle style={{ marginLeft: 24 }}>
        <div
          style={{
            background: 'url("https://randomuser.me/api/portraits/women/76.jpg") no-repeat center/cover',
            width: 40,
            height: 40,
            borderRadius: '100%',
          }}
        />
      </Badge>
      <Badge {...rest} value={<Icon src="check-solid.svg" />} style={{ marginLeft: 24 }}>
        <div
          style={{
            background: 'url("https://randomuser.me/api/portraits/women/82.jpg") no-repeat center/cover',
            width: 40,
            height: 40,
            borderRadius: 4,
          }}
        />
      </Badge>
      <Badge {...rest} style={{ marginLeft: 24 }}>
        <div
          style={{
            backgroundColor: 'lightGrey',
            width: 40,
            height: 40,
            borderRadius: 4,
          }}
        />
      </Badge>
      <Badge {...rest} style={{ marginLeft: 24 }} circle>
        <div
          style={{
            backgroundColor: 'lightGrey',
            width: 40,
            height: 40,
            borderRadius: '100%',
          }}
        />
      </Badge>
    </div>
  );
});
