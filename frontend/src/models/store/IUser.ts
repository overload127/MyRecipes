export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  urlAvatar: string | null;
  birthday: string | null;
  gender: number;
  phone: string | null;
}
