import React, {useContext} from 'react';
import {View, StyleSheet, useWindowDimensions, ScaledSize} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeState} from '../context/themeReducer';

export const Background = () => {
  const {theme} = useContext(ThemeContext);
  const dimensions = useWindowDimensions();
  const styles = stylesFunction(theme, dimensions);

  return <View style={styles.container} />;
};

const stylesFunction = (theme: ThemeState, dimensions: ScaledSize) => {
  const width =
    dimensions.width >= 650 ? dimensions.width * 1.4 : dimensions.width * 2.1;
  const height =
    dimensions.width >= 650 ? dimensions.height * 2.4 : dimensions.height * 1.4;

  const rotate = dimensions.width >= 650 ? '-150deg' : '-60deg';
  const top = dimensions.width >= 650 ? -550 : -250;
  const right = dimensions.width >= 650 ? -300 : undefined;

  return StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: theme.colors.primary,
      top,
      right,
      width,
      height,
      transform: [{rotate}],
    },
  });
};
