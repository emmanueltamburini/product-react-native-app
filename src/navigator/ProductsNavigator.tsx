import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProductScreen} from '../screens/ProductScreen';
import {ThemeContext} from '../context/ThemeContext';

export type ProductStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
};

const Stack = createStackNavigator<ProductStackParams>();

export const ProductsNavigator = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="ProductsScreen"
      screenOptions={{
        headerShown: true,
        cardStyle: {backgroundColor: theme.colors.background},
        headerStyle: {elevation: 0, shadowColor: 'transparent'},
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{title: 'Products'}}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{title: 'Products'}}
      />
    </Stack.Navigator>
  );
};
