import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeContext} from '../context/ThemeContext';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {AuthContext} from '../context/AuthContext';

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProtectedScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  const {theme} = useContext(ThemeContext);
  const {status} = useContext(AuthContext);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={
          status !== 'authenticated' ? 'LoginScreen' : 'ProtectedScreen'
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
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
