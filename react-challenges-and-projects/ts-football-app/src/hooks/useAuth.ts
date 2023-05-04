import { auth } from '../firebase/firebase';
import { IUser } from '../types/user';


export const useAuth = () => {
  auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  });

  let userData: IUser | null = null;

  if (localStorage.getItem('currentUser')) {
    const userObject = JSON.parse(localStorage.getItem('currentUser')!);
    userData = {
      id: userObject.uid,
      username: userObject.displayName,
      email: userObject.email
    };
  }

  return {
    userData
  };
};