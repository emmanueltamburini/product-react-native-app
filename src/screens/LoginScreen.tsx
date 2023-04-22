import React, {useContext, useEffect, useRef} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
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
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/Navigator';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {theme} = useContext(ThemeContext);
  const {signIn, errorMessage, removeError} = useContext(AuthContext);
  const dimensions = useWindowDimensions();

  const passwordInputRef = useRef<TextInput>();
  const removeErrorStatic = useRef(removeError);

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }

    Alert.alert('Bad Login', errorMessage, [
      {text: 'ok', onPress: removeErrorStatic.current},
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    Keyboard.dismiss();
    signIn({email, password});
  };

  const newAccount = () => {
    navigation.replace('RegisterScreen');
  };

  const loginStyle = loginStyles(theme, dimensions);

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyle.keyboardAvoidingView}>
        <View style={loginStyle.formContainer}>
          <View style={loginStyle.logoContainer}>
            <Logo />
          </View>
          <View style={loginStyle.inputsContainer}>
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
              value={email}
              onChangeText={value => onChange(value, 'email')}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <ThemeText ignoreTheme style={loginStyle.label}>
              Password
            </ThemeText>
            <TextInput
              ref={ref => {
                if (ref) {
                  passwordInputRef.current = ref;
                }
              }}
              placeholder="******"
              placeholderTextColor={theme.opacityColor}
              style={[
                loginStyle.inputField,
                Platform.OS === 'ios' && loginStyle.inputFieldIOS,
              ]}
              underlineColorAndroid={theme.colors.background}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              value={password}
              onChangeText={value => onChange(value, 'password')}
              onSubmitEditing={onLogin}
            />

            <View style={loginStyle.buttonContainer}>
              <ThemeButton
                ignoreTheme
                title="Login"
                style={loginStyle.button}
                textStyle={loginStyle.buttonText}
                onPress={onLogin}
              />
            </View>

            <View style={loginStyle.newUserContainer}>
              <TouchableOpacity activeOpacity={0.8} onPress={newAccount}>
                <ThemeText ignoreTheme style={loginStyle.text}>
                  New account
                </ThemeText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
