import {User} from '../interfaces/appInterfaces';

type AuthAction =
  | {type: 'SIGN_IN'; payload: {token: string; user: User}}
  | {type: 'SIGN_UP'; payload: {token: string; user: User}}
  | {type: 'ADD_ERROR'; payload: string}
  | {type: 'REMOVE_ERROR'}
  | {type: 'NOT_AUTHENTICATED'}
  | {type: 'LOGOUT'};

export interface AuthState {
  errorMessage: string;
  token?: string;
  user?: User;
  status: 'checking' | 'authenticated' | 'not-authenticated';
}

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        user: undefined,
        status: 'not-authenticated',
        token: undefined,
        errorMessage: action.payload,
      };

    case 'REMOVE_ERROR':
      return {...state, errorMessage: ''};

    case 'SIGN_UP':
    case 'SIGN_IN':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };

    case 'NOT_AUTHENTICATED':
    case 'LOGOUT':
      return {
        ...state,
        errorMessage: '',
        status: 'not-authenticated',
        token: undefined,
        user: undefined,
      };

    default:
      return state;
  }
};
