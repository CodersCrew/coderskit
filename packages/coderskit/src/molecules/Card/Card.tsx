import React, { HTMLAttributes, ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
}

export interface CardProps extends CardImageProps {
  as?: ElementType;
  width?: string | number;
  children?: ReactNode;
  inlineBtn?: boolean;
}

const CardContainer = styled.div<CardProps>(props => {
  const { theme, width, src, inlineBtn } = props;
  const { borders, colors, radii } = theme;
  const padding = 16;

  return {
    width,
    border: borders.light,
    padding: padding,
    background: colors.white,
    borderRadius: radii.small,

    '.ck-card__image': {
      width: `calc(100% + ${padding} * 2)`,
      margin: `-${padding}px -${padding}px 0 -${padding}px`,
      height: 160,
      background: `url(${src}) center center / cover no-repeat ${colors.fontPlaceholder}`,
    },

    '.ck-card__content': {
      marginTop: padding,
      display: 'flex',
      flexDirection: 'column',

      '> *:not(:first-child)': {
        marginTop: 8,
      },
    },

    '.ck-card__footer': {
      marginTop: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: inlineBtn ? 'flex-start' : 'space-between',
    },
  };
});

const CardImage = (props: CardImageProps) => {
  const className = classnames(props.className, 'ck-card__image');

  return <div {...props} className={className} />;
};

const CardContent = (props: HTMLAttributes<HTMLDivElement>) => {
  const className = classnames(props.className, 'ck-card__content');

  return <div {...props} className={className} />;
};

const CardFooter = (props: HTMLAttributes<HTMLDivElement>) => {
  const className = classnames(props.className, 'ck-card__footer');

  return <div {...props} className={className} />;
};

export const Card = (props: CardProps) => {
  const { className } = props;

  return <CardContainer {...props} className={classnames(className, 'ck-card')} />;
};

Card.defaultProps = {
  width: 280,
  inlineBtn: false,
};

Card.Image = CardImage;
Card.Content = CardContent;
Card.Footer = CardFooter;
