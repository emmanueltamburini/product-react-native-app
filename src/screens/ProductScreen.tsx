import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeState} from '../context/themeReducer';

export const ProductScreen = () => {
  const {theme} = useContext(ThemeContext);
  const styles = stylesFunction(theme);

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
