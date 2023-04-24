import React, {useContext, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeState} from '../context/themeReducer';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {theme} = useContext(ThemeContext);
  const styles = stylesFunction(theme);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name ? route.params.name : 'New Product',
    });
  }, [navigation, route]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={50} color={theme.colors.text} />
    </SafeAreaView>
  );
};

const stylesFunction = (theme: ThemeState) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
