import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export type AvatarVariant = 'img' | 'text';
export type AvatarSize = 'tiny' | 'small' | 'default' | 'large';
export type AvatarShape = 'circle' | 'square';
export type AvatarUrl = 'string';

export interface AvatarProps extends HTMLAttributes<any> {
    variant: AvatarVariant;
    size: AvatarSize;
    shape: AvatarShape;
    url?: AvatarUrl;
    children?: React.ReactNode;
}

const AvatarBase = styled.div<AvatarProps>(props => {

    const { shadows } = props.theme;

    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        border: 'none',
        borderRadius: props.shape === 'circle' ? '20px' : props.shape === 'square' && props.size === 'tiny' || 'small' ? '4px' : '8px',
        width: props.size === 'tiny' ? '16px' : props.size === 'small' ? '24px' : props.size === 'default' ? '32px' : '40px',
        height: props.size === 'tiny' ? '16px' : props.size === 'small' ? '24px' : props.size === 'default' ? '32px' : '40px',
        boxShadow: shadows.xs,
    }

});

const AvatarText = styled(AvatarBase)(({ ...props }) => {
    const { colors, fontSizes, lineHeights, fontWeights } = props.theme;
    const { size } = props;

    return {
        backgroundColor: colors.primary,
        color: colors.white,
        lineHeight: size === 'tiny' || 'small' ? lineHeights.caption1 : lineHeights.body1,
        fontSize: size === 'tiny' ? fontSizes.caption2 : size === 'small' ? fontSizes.caption1 : size === 'default' ? fontSizes.body2 : fontSizes.h3,
        fontWeight: size === 'tiny' || 'small' ? fontWeights.medium : fontWeights.bold,
        textTransform: 'uppercase',
        textAlign: 'center',
    }
})

const AvatarImg = styled(AvatarBase)(({ ...props }) => {

    return {
        background: "url('https://randomuser.me/api/portraits/men/52.jpg')",
        backgroundSize: 'cover',
        color: 'transparent',
    }
})

export const Avatar = (props: AvatarProps) => {
    const className = classnames(props.className, 'cc-avatar');

    const AvatarContainer = props.variant === 'img' ? AvatarImg : AvatarText;

    return (
    <AvatarContainer {...props} className={className}>
        {props.children}
    </AvatarContainer>
    );
 };