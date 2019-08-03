import React, { ReactNode } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { theme, Theme, globalStyle, initializeNotifications } from '../..';

export interface StylesProviderProps {
  children: ReactNode;
  theme?: Theme;
}

export const StylesProvider = (props: StylesProviderProps) => {
  return (
    <ThemeProvider theme={props.theme || theme}>
      <Global styles={globalStyle} />
      {props.children}
      {initializeNotifications()}
    </ThemeProvider>
  );
};
