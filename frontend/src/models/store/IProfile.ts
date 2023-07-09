export interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  urlAvatar: string | null;
  birthday: string | null;
  gender: number;
  phone: string | null;
  socialNetworks: ISocialNetwork[];
  tags: TagType[];
}

export interface ISocialNetwork {
  id: number;
  url: string;
  type: string;
}

export type TagType = {
  key: string;
  label: string;
};
