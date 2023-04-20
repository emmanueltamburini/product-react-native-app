import React, {useContext} from 'react';
import {View, StyleSheet, useWindowDimensions, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

export const Logo = () => {
  const {theme} = useContext(ThemeContext);
  const dimensions = useWindowDimensions();
  console.log(dimensions);
  const styles = stylesFunction();

  const image = theme.dark
    ? require('../assets/react-logo-black.png')
    : require('../assets/react-logo-white.png');

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const stylesFunction = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    image: {
      width: 110,
      height: 100,
    },
  });
};
