import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ThemeText} from '../components/ThemeText';
import {ThemeButton} from '../components/ThemeButton';
import {AuthContext} from '../context/AuthContext';

export const ProtectedScreen = () => {
  const styles = stylesFunction();
  const {logout, user} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ThemeText style={styles.title}>Protected Screen</ThemeText>
      <ThemeButton title="Logout" onPress={logout} />
      <ThemeText>{JSON.stringify(user, null, 5)}</ThemeText>
    </SafeAreaView>
  );
};

const stylesFunction = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
    },
  });
