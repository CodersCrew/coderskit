import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import { boolean, text, number, optionsKnob, select } from '@storybook/addon-knobs';
import { Tooltip, Input } from 'coderskit';
import content from './Tooltip.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=220%3A631',
};

const readme = { content };

const triggers = {
  hover: 'hover',
  focus: 'focus',
  click: 'click',
};

const placements = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottomRight',
  leftTop: 'leftTop',
  leftBottom: 'leftBottom',
  rightTop: 'rightTop',
  rightBottom: 'rightBottom',
};

const getTooltipProps = () => ({
  id: text('id', 'tooltip-id'),
  overlay: text('overlay', 'Tooltip content'),
  mouseEnterDelay: number('mouseEnterDelay', 0),
  mouseLeaveDelay: number('mouseLeaveDelay', 0.1),
  trigger: optionsKnob('trigger', triggers, ['hover'], { display: 'check' }) as (keyof typeof triggers)[],
  defaultVisible: boolean('defaultVisible', false),
  destroyTooltipOnHide: boolean('destroyTooltipOnHide', false),
  placement: select('placement', placements, 'top') as keyof typeof placements,
});

const getActions = () => ({
  onVisibleChange: action('onVisibleChange'),
  afterVisibleChange: action('afterVisibleChange'),
  onPopupAlign: action('onPopupAlign'),
});

storiesOf('Atoms|Tooltip', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Default tooltip', () => {
    const props = getTooltipProps();
    const actions = getActions();

    return (
      <Tooltip {...props} {...actions}>
        <Input value="Input with tooltip" />
      </Tooltip>
    );
  });
