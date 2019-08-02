import React, { HTMLAttributes, ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
}

export interface CardProps extends CardImageProps {
  as?: ElementType;
  width?: string | number;
  children?: ReactNode;
  inlineBtn?: boolean;
}

const CardContainer = styled.div<CardProps>(props => {
  const { theme, width, image, inlineBtn } = props;
  const { borders, colors, radii } = theme;

  return {
    width,
    border: borders.light,
    background: colors.white,
    borderRadius: radii.small,

    '.ck-card__image': {
      width: '100%',
      height: 160,
      background: `url(${image}) center center / cover no-repeat ${colors.fontPlaceholder}`,
    },

    '.ck-card__wrapper': {
      width: '100%',
      padding: 16,
      boxSizing: 'border-box',
    },

    '.ck-card__content, .ck-card__footer': {
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
  const { className, image, children } = props;

  return (
    <CardContainer {...props} className={classnames(className, 'ck-card')}>
      <CardImage image={image} />
      <div className="ck-card__wrapper">{children}</div>
    </CardContainer>
  );
};

Card.defaultProps = {
  width: 280,
  inlineBtn: false,
};

Card.Content = CardContent;
Card.Footer = CardFooter;
