import { UserResponse } from '../models/user';

export function getToken(): UserResponse | null {
  let userData: UserResponse;

  if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData') as string);
    return userData as UserResponse;
  } else {
    return null;
  }
}