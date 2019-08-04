import React, { useEffect } from 'react';
import { Global, SerializedStyles } from '@emotion/core';
import { Theme } from '..';

const mountedComponents = {};

export interface GlobalStylesProps {
  component: string;
  styles: (theme: Theme) => SerializedStyles;
}

export const GlobalStyles = ({ component, styles }: GlobalStylesProps) => {
  useEffect(() => {
    mountedComponents[component] += 1;

    return () => {
      mountedComponents[component] -= 1;

      if (mountedComponents[component] === 0) {
        delete mountedComponents[component];
      }
    };
  }, []);

  if (typeof mountedComponents[component] === 'undefined') {
    mountedComponents[component] = 0;
    return <Global styles={styles} />;
  }

  return null;
};
