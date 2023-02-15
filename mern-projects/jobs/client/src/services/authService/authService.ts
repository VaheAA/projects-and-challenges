import { IUserLogin, IUserRegister, UserResponse } from '../../models/user';
import $authHost from './index.';



// Register user 
export const registerUser = async (userObj: IUserRegister): Promise<UserResponse> => {
  const { data } = await $authHost.post('/register',
    userObj
  );
  return data;
};

// Login user
export const loginUser = async (userObj: IUserLogin): Promise<UserResponse> => {
  const { data } = await $authHost.post('/login',
    userObj
  );
  return data;
};