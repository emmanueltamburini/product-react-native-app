import {ScaledSize, StyleSheet} from 'react-native';
import {ThemeState} from '../context/themeReducer';
import {bigWidthScreen} from '../helpers/utils';

export const loginStyles = (theme: ThemeState, dimensions: ScaledSize) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      paddingHorizontal: bigWidthScreen(dimensions) ? 50 : 30,
      justifyContent: bigWidthScreen(dimensions) ? 'space-around' : 'center',
      height: 600,
      marginTop: bigWidthScreen(dimensions) ? 20 : 0,
      marginBottom: 50,
      flexDirection: bigWidthScreen(dimensions) ? 'row' : 'column',
    },
    title: {
      color: theme.colors.background,
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: bigWidthScreen(dimensions) ? 0 : 20,
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
      marginTop: bigWidthScreen(dimensions) ? 30 : 50,
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
      marginTop: 10,
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
    inputsContainer: {
      flex: bigWidthScreen(dimensions) ? 0.6 : undefined,
      paddingHorizontal: bigWidthScreen(dimensions) ? 50 : 0,
    },
    logoContainer: {
      flex: bigWidthScreen(dimensions) ? 0.4 : undefined,
    },
    buttonText: {
      color: theme.colors.background,
    },
  });
