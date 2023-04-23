import React, {createContext, useEffect, useMemo, useReducer} from 'react';
import {LoginData, LoginResponse, User} from '../interfaces/appInterfaces';
import {AuthState, authReducer} from './authReducer';
import productApi from '../api/productApi';
import {getData, storeData} from '../helpers/utils';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ContextProps {
  errorMessage: string;
  token?: string;
  user?: User;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: (data: LoginData) => void;
  logout: () => void;
  removeError: () => void;
}

const providerValueDummy: ContextProps = {
  errorMessage: '',
  status: 'checking',
  signUp: () => {},
  signIn: () => {},
  logout: () => {},
  removeError: () => {},
};

export const AuthContext = createContext<ContextProps>({
  ...providerValueDummy,
});

const authInitialState: AuthState = {
  status: 'checking',
  token: undefined,
  user: undefined,
  errorMessage: '',
};

export const AuthProvider = ({children}: Props) => {
  const [auth, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentToken = await getData('token');

    if (currentToken) {
      try {
        const {data} = await productApi.get<LoginResponse>('/auth');
        const {token, user} = data;

        dispatch({type: 'SIGN_IN', payload: {token, user}});
      } catch (error) {
        console.log(error);
        dispatch({type: 'NOT_AUTHENTICATED'});
      }
    } else {
      dispatch({type: 'NOT_AUTHENTICATED'});
    }
  };

  const signIn = async (body: LoginData) => {
    try {
      const {data} = await productApi.post<LoginResponse>('/auth/login', body);

      const {token, user} = data;

      dispatch({type: 'SIGN_IN', payload: {token, user}});

      if (!(await storeData('token', data.token))) {
        dispatch({
          type: 'ADD_ERROR',
          payload: 'Please check your device space',
        });
      }
    } catch (error) {
      const errorMessage: string = ((error as any).response?.data?.msg ||
        'Bad information') as string;
      dispatch({type: 'ADD_ERROR', payload: errorMessage});
    }
  };

  const signUp = () => {};
  const logout = () => {};
  const removeError = () => dispatch({type: 'REMOVE_ERROR'});

  const providerValue = useMemo(
    () => ({
      ...auth,
      signUp,
      signIn,
      logout,
      removeError,
    }),
    [auth],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
