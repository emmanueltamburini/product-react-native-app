import {RootStackParams} from '../navigator/Navigator';

type ComponentKey = keyof RootStackParams;

export interface MenuItem {
  name: string;
  icon: string;
  component: ComponentKey;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  status: boolean;
  google: boolean;
  image: string;
  uid: string;
}
