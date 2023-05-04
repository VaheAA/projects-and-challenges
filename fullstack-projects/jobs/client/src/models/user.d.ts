import { AxiosError } from 'axios';

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  name: string;
  email: string;
}

export type UserType = {
  name: string;
};

export type UserResponse = {
  user: UserType,
  token: string;
};


export type UserContextType = {
  user: UserType | null;
  login: (IUserLogin) => Promise<void>;
  register: (IUserRegister) => Promise<void>;
  logout: () => void;
  keepLogin: (UserType) => void;
  isLoggedIn: boolean;
  loading: boolean;
  error: AxiosError | null;
};
