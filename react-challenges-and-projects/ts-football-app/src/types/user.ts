export interface IUser {
  id: string | null;
  username: string | null;
  email: string | null;
}

export interface IUserState {
  user: IUser | null;
  isLoggedIn: boolean;
}