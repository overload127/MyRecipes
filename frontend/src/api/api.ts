import { AxiosResponse } from 'axios';
import { IRecipesPageResponse } from 'models/response/RecipeResponse';
import { IAuthResponse } from 'models/response/AuthResponse';
import { IProfileResponse } from 'models/response/ProfileResponse';
import { IProfileSocialNetworksRequest } from 'models/request/ProfileRequest';
import { instancePublic, instancePrivate } from './instances';

export const authAPI = {
  async login(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return instancePublic.post<IAuthResponse>('/auth/token/', {
      username,
      password,
    });
  },

  async logout(refresh: string): Promise<void> {
    return instancePrivate.post('/auth/token/logout/', {
      refresh,
    });
  },
};

export const recipeAPI = {
  loadPageData(page: number, isDesc: boolean, perPage: number): Promise<AxiosResponse<IRecipesPageResponse>> {
    return instancePublic.get<IRecipesPageResponse>(
      `/api/v1/recipes?page=${page}&is_desc=${Number(isDesc)}&per_page=${perPage}`,
      {},
    );
  },
};

// remove
type UserDataType = {
  email: string;
  id: number;
  username: string;
};

// remove
export const testPrivateAPI = {
  test(): Promise<AxiosResponse<UserDataType[]>> {
    return instancePrivate.get<UserDataType[]>('/auth/users/', {});
  },
};

export const profileAPI = {
  async getDataProfile(): Promise<AxiosResponse<IProfileResponse>> {
    return instancePrivate.get<IProfileResponse>('/core/profile/', {});
  },
  async updateAvatar(formData: FormData): Promise<AxiosResponse> {
    return instancePrivate.patch('/core/profile/upload-avatar/', formData, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async deleteAvatar(): Promise<AxiosResponse> {
    return instancePrivate.delete('/core/profile/upload-avatar/', {});
  },
  async updateProfileBaseData(
    id: string,
    firstName: string,
    lastName: string,
    birthday: string | null,
    gender: number,
    phoneNumber: string,
  ): Promise<AxiosResponse<IProfileResponse>> {
    return instancePrivate.patch<IProfileResponse>('/core/profile/update-base/', {
      id,
      first_name: firstName,
      last_name: lastName,
      birthday,
      gender,
      phone: phoneNumber,
    });
  },
  async updateProfileSocialNetworks(
    socialNetworksData: IProfileSocialNetworksRequest,
  ): Promise<AxiosResponse<IProfileResponse>> {
    return instancePrivate.patch<IProfileResponse>('/core/profile/update-social-networks/', {
      ...socialNetworksData,
    });
  },
};
