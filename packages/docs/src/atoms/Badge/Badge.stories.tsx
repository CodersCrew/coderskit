import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { number, select } from '@storybook/addon-knobs';
import { omit } from 'lodash-es';
import { Badge, Icon, colors as themeColors } from 'coderskit';
import content from './Badge.md';

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

const readme = { content };

const Circle = () => <div style={{ ...baseStyle, borderRadius: '100%' }} />;

const Square = () => <div style={{ ...baseStyle, borderRadius: 4 }} />;

const Wrapper: React.FC = ({ children }) => <div style={{ display: 'flex' }}>{children}</div>;

const IconElement = <Icon src="check-solid.svg" />;

const getBadgeProps = () => ({
  value: number('value', 3),
  maxLength: number('maxLength', 2),
  color: select('color', colors, 'success') as keyof typeof colors,
  position: select('position', positions, 'rightTop') as keyof typeof positions,
});

storiesOf('Badge', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Empty badge', () => {
    const props = omit(getBadgeProps(), ['value']);

    return (
      <Wrapper>
        <Badge {...props}>
          <Square />
        </Badge>
        <Badge {...props} style={{ marginLeft: 24 }} circle>
          <Circle />
        </Badge>
      </Wrapper>
    );
  })
  .add('Badge with number', () => {
    const props = getBadgeProps();

    return (
      <Wrapper>
        <Badge {...props}>
          <Square />
        </Badge>
        <Badge {...props} circle style={{ marginLeft: 24 }}>
          <Circle />
        </Badge>
      </Wrapper>
    );
  })
  .add('Badge with icon', () => {
    const props = omit(getBadgeProps(), ['value']);

    return (
      <Wrapper>
        <Badge {...props} value={IconElement}>
          <Square />
        </Badge>
        <Badge {...props} value={IconElement} circle style={{ marginLeft: 24 }}>
          <Circle />
        </Badge>
      </Wrapper>
    );
  })
  .add('Standalone badge', () => {
    const props = getBadgeProps();

    const { value, ...rest } = props;

    return (
      <Wrapper>
        <Badge {...rest} value={value} />
        <Badge {...rest} value={IconElement} style={{ marginLeft: 24 }} />
      </Wrapper>
    );
  });
