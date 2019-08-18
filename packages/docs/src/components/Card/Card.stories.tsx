import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import { Card, Typography, Button, Icon } from 'coderskit';
import sidebar from './Card.md';

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=246%3A5',
};

const readme = { sidebar };

const widthRange = {
  range: true,
  min: 280,
  max: 450,
  step: 10,
};

const elements = {
  div: 'div',
  article: 'article',
};

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .addParameters({ design, readme })
  .add('Card', () => {
    const props = {
      src: text('image', 'popcorn.jpg'),
      width: number('width', 280, widthRange),
      inlineBtn: boolean('inline buttons', false),
      as: select('as', elements, 'div') as keyof typeof elements,
    };

    const data = {
      header: text('header', 'Card title'),
      content: text(
        'content',
        'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.',
      ),
    };

    return (
      <>
        <Card {...props}>
          <Card.Image />
          <Card.Content>
            <Typography el="h3">{data.header}</Typography>
            <Typography el="body2">{data.content}</Typography>
          </Card.Content>
          <Card.Footer>
            <Button variant="outlined" color="gray">
              <Icon src="edit-solid.svg" />
            </Button>
            <Button>Details</Button>
          </Card.Footer>
        </Card>
      </>
    );
  });
