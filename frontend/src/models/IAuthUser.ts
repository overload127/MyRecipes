export interface IAuthUser {
  id: string;
  name: string;
  isAnonym: boolean;
}

export interface ITokenData {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  name: string;
}

export const anonym: IAuthUser = {
  id: 'anonym',
  name: 'anonym',
  isAnonym: true,
};
