import 'react-native-gesture-handler';
import React from 'react';
import {Navigator} from './src/navigator/Navigator';
import {ThemeProvider} from './src/context/ThemeContext';
import {PermissionProvider} from './src/context/PermissionContext';
import {AuthProvider} from './src/context/AuthContext';
import {ProductProvider} from './src/context/ProductContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const App = () => {
  return (
    <AppState>
      <Navigator />
    </AppState>
  );
};

const AppState = ({children}: Props) => {
  return (
    <PermissionProvider>
      <ProductProvider>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </ProductProvider>
    </PermissionProvider>
  );
};
