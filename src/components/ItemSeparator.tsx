import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeState} from '../context/themeReducer';

export const ItemSeparator = () => {
  const {theme} = useContext(ThemeContext);
  const styles = stylesFunction(theme);

  return <View style={styles.separator} />;
};

const stylesFunction = (theme: ThemeState) =>
  StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      opacity: 0.2,
      marginVertical: 5,
      borderBottomColor: theme.colors.text,
    },
  });
