import { AxiosError } from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { IUserLogin, IUserRegister, UserContextType, UserType, UserResponse } from '../../models/user';
import { loginUser, registerUser } from '../../services/authService/authService';

type ContextProps = {
  children: ReactNode;
};


export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  const register = async (newUser: IUserRegister): Promise<void> => {
    try {
      setLoading(true);
      const data = await registerUser(newUser);
      setUser(data.user);
      setIsLoggedIn(true);
      setError(null);
      setLoading(false);
      localStorage.setItem('userData', JSON.stringify({ name: data.user.name, token: data.token }));
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err);
      }
      setLoading(false);
    }
  };

  const login = async (userData: IUserLogin): Promise<void> => {
    try {
      setLoading(true);
      const data = await loginUser(userData);
      setUser(data.user);
      setIsLoggedIn(true);
      setLoading(false);
      setError(null);
      localStorage.setItem('userData', JSON.stringify({ name: data.user.name, token: data.token }));
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err);
      }
      setLoading(false);
    }
  };

  const keepLogin = (data: UserType) => {
    setIsLoggedIn(true);
    setUser(data);
    setError(null);
  };

  const logout = () => {
    setUser(null);
    setLoading(false);
    setError(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
  };


  return (
    <UserContext.Provider value={{ user, loading, login, register, logout, keepLogin, error, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};