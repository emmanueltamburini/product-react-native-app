import React, {useContext} from 'react';
import {
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {ThemeText} from '../components/ThemeText';
import {Background} from '../components/Background';
import {Logo} from '../components/Logo';
import {loginStyles} from '../theme/loginTheme';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeButton} from '../components/ThemeButton';

export const LoginScreen = () => {
  const {theme} = useContext(ThemeContext);
  const dimensions = useWindowDimensions();
  const loginStyle = loginStyles(theme, dimensions);

  return (
    <>
      <Background />
      <View style={loginStyle.formContainer}>
        <Logo />
        <ThemeText ignoreTheme style={loginStyle.title}>
          Login
        </ThemeText>
        <ThemeText ignoreTheme style={loginStyle.label}>
          Email
        </ThemeText>
        <TextInput
          placeholder="Type your email"
          placeholderTextColor={theme.opacityColor}
          style={[
            loginStyle.inputField,
            Platform.OS === 'ios' && loginStyle.inputFieldIOS,
          ]}
          underlineColorAndroid={theme.colors.background}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <ThemeText ignoreTheme style={loginStyle.label}>
          Password
        </ThemeText>
        <TextInput
          placeholder="******"
          placeholderTextColor={theme.opacityColor}
          style={[
            loginStyle.inputField,
            Platform.OS === 'ios' && loginStyle.inputFieldIOS,
          ]}
          underlineColorAndroid={theme.colors.background}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="visible-password"
        />
        <View style={loginStyle.buttonContainer}>
          <ThemeButton
            ignoreTheme
            title="Login"
            style={loginStyle.button}
            onPress={console.log}
          />
        </View>
        <View style={loginStyle.newUserContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={console.log}>
            <ThemeText ignoreTheme style={loginStyle.text}>
              New account
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
