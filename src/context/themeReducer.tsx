import {Theme} from '@react-navigation/native';

type ThemeAction = {type: 'SET_LIGHT_THEME'} | {type: 'SET_DARK_THEME'};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  opacityColor: string;
  opacityContrastColor: string;
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  opacityColor: 'rgba(255,255,255,0.4)',
  opacityContrastColor: 'rgba(0,0,0,0.4)',
  colors: {
    primary: '#5856D6',
    background: 'white',
    card: 'white',
    text: 'black',
    border: 'black',
    notification: 'teal',
  },
};

export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  opacityColor: 'rgba(0,0,0,0.4)',
  opacityContrastColor: 'rgba(255,255,255,0.4)',
  colors: {
    primary: '#5856D6',
    background: 'black',
    card: 'black',
    text: 'white',
    border: 'white',
    notification: 'teal',
  },
};

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      return {...lightTheme};

    case 'SET_DARK_THEME':
      return {...darkTheme};

    default:
      return state;
  }
};
