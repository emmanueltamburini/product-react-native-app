import React, {createContext, useEffect, useMemo, useReducer} from 'react';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  User,
} from '../interfaces/appInterfaces';
import {AuthState, authReducer} from './authReducer';
import productApi from '../api/productApi';
import {getData, removeData, storeData} from '../helpers/utils';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ContextProps {
  errorMessage: string;
  token?: string;
  user?: User;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (body: RegisterData) => void;
  signIn: (body: LoginData) => void;
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
        if (!(await storeData('token', data.token))) {
          dispatch({
            type: 'ADD_ERROR',
            payload: 'Please check your device space',
          });
        }
      } catch (error) {
        console.log(error);
        removeData('token');
        dispatch({type: 'NOT_AUTHENTICATED'});
      }
    } else {
      removeData('token');
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
        (error as any).response?.data?.errors[0].msg ||
        'Bad information') as string;
      dispatch({type: 'ADD_ERROR', payload: errorMessage});
    }
  };

  const signUp = async (body: RegisterData) => {
    try {
      const {data} = await productApi.post<LoginResponse>('/user', body);

      const {token, user} = data;

      dispatch({type: 'SIGN_UP', payload: {token, user}});

      if (!(await storeData('token', data.token))) {
        dispatch({
          type: 'ADD_ERROR',
          payload: 'Please check your device space',
        });
      }
    } catch (error) {
      const errorMessage: string = ((error as any).response?.data?.msg ||
        (error as any).response?.data?.errors[0].msg ||
        'Bad information') as string;
      dispatch({type: 'ADD_ERROR', payload: errorMessage});
    }
  };

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    removeData('token');
  };

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
