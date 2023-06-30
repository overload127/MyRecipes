export interface IProfileResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  url_avatar: string | null;
  birthday: string | null;
  gender: number;
  phone: string | null;
}
