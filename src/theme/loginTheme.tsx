import {ScaledSize, StyleSheet} from 'react-native';
import {ThemeState} from '../context/themeReducer';

export const loginStyles = (theme: ThemeState, dimensions: ScaledSize) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      paddingHorizontal: dimensions.width >= 650 ? 200 : 30,
      justifyContent: 'center',
      height: 600,
      marginBottom: 50,
    },
    title: {
      color: theme.colors.background,
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: dimensions.width >= 650 ? 0 : 20,
    },
    label: {
      marginTop: 25,
      color: theme.colors.background,
      fontWeight: 'bold',
    },
    inputField: {
      color: theme.colors.background,
      fontSize: 20,
    },
    inputFieldIOS: {
      borderBottomColor: theme.colors.background,
      borderBottomWidth: 2,
      paddingBottom: 4,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: dimensions.width >= 650 ? 25 : 50,
    },
    button: {
      borderWidth: 2,
      borderColor: theme.colors.background,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.primary,
      paddingVertical: 5,
    },
    newUserContainer: {
      alignItems: 'flex-end',
      marginTop: dimensions.width >= 650 ? 5 : 10,
    },
    newAccountButton: {
      borderColor: theme.colors.primary,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.primary,
      paddingVertical: 5,
    },
    text: {
      color: theme.colors.background,
      fontSize: 18,
    },
  });
