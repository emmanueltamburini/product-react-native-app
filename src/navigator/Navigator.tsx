import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeContext} from '../context/ThemeContext';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {ProductsNavigator} from './ProductsNavigator';

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProductsNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  const {theme} = useContext(ThemeContext);
  const {status} = useContext(AuthContext);

  if (status === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={
          status !== 'authenticated' ? 'LoginScreen' : 'ProductsNavigator'
        }
        screenOptions={{
          headerShown: false,
        }}>
        {status !== 'authenticated' ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen
            name="ProductsNavigator"
            component={ProductsNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
