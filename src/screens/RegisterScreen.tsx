import React, {useContext, useEffect, useRef} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {ThemeText} from '../components/ThemeText';
import {Background} from '../components/Background';
import {Logo} from '../components/Logo';
import {registerTheme} from '../theme/registerTheme';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeButton} from '../components/ThemeButton';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/Navigator';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {theme} = useContext(ThemeContext);
  const dimensions = useWindowDimensions();
  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  const passwordInputRef = useRef<TextInput>();
  const removeErrorStatic = useRef(removeError);

  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }

    Alert.alert('Bad Register', errorMessage, [
      {text: 'ok', onPress: removeErrorStatic.current},
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({name, email, password});
  };

  const newAccount = () => {
    navigation.replace('LoginScreen');
  };

  const registerStyle = registerTheme(theme, dimensions);

  return (
    <>
      <Background allColor />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={registerStyle.keyboardAvoidingView}>
        <View style={registerStyle.formContainer}>
          <View style={registerStyle.logoContainer}>
            <Logo />
          </View>
          <ScrollView
            style={registerStyle.inputsContainer}
            showsVerticalScrollIndicator>
            <ThemeText ignoreTheme style={registerStyle.title}>
              Register
            </ThemeText>

            <ThemeText ignoreTheme style={registerStyle.label}>
              Name
            </ThemeText>
            <TextInput
              placeholder="Type your name"
              placeholderTextColor={theme.opacityColor}
              style={[
                registerStyle.inputField,
                Platform.OS === 'ios' && registerStyle.inputFieldIOS,
              ]}
              underlineColorAndroid={theme.colors.background}
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              value={name}
              onChangeText={value => onChange(value, 'name')}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <ThemeText ignoreTheme style={registerStyle.label}>
              Email
            </ThemeText>
            <TextInput
              placeholder="Type your email"
              placeholderTextColor={theme.opacityColor}
              style={[
                registerStyle.inputField,
                Platform.OS === 'ios' && registerStyle.inputFieldIOS,
              ]}
              underlineColorAndroid={theme.colors.background}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={email}
              onChangeText={value => onChange(value, 'email')}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <ThemeText ignoreTheme style={registerStyle.label}>
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
                registerStyle.inputField,
                Platform.OS === 'ios' && registerStyle.inputFieldIOS,
              ]}
              underlineColorAndroid={theme.colors.background}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              value={password}
              onChangeText={value => onChange(value, 'password')}
              onSubmitEditing={onRegister}
            />

            <View style={registerStyle.buttonContainer}>
              <ThemeButton
                ignoreTheme
                title="Create account"
                style={registerStyle.button}
                textStyle={registerStyle.buttonText}
                onPress={onRegister}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={newAccount}
            style={registerStyle.loginButton}>
            <ThemeText ignoreTheme style={registerStyle.text}>
              Login
            </ThemeText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
