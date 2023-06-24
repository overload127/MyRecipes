import { AxiosResponse } from 'axios';
import { ITransportContainer } from 'models/response/TransportContainer';
import { IRecipesPageResponse } from 'models/response/RecipeResponse';
import { IAuthResponse } from 'models/response/AuthResponse';
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
  loadPageData(
    page: number,
    isDesc: boolean,
    perPage: number,
  ): Promise<AxiosResponse<ITransportContainer<IRecipesPageResponse>>> {
    return instancePublic.get<ITransportContainer<IRecipesPageResponse>>(
      `/api/v1/recipes?page=${page}&is_desc=${Number(isDesc)}&per_page=${perPage}`,
      {},
    );
  },
};

type UserDataType = {
  email: string;
  id: number;
  username: string;
};

export const testPrivateAPI = {
  test(): Promise<AxiosResponse<UserDataType[]>> {
    return instancePrivate.get<UserDataType[]>('/auth/users/', {});
  },
};

// ================

// export const cmsAPI = {
//   async news(): Promise<AxiosResponse<Array<INewResponse>>> {
//     return instancePublic.get<Array<INewResponse>>('/cms/news', {});
//   },
//   async product(): Promise<AxiosResponse<IProductResponse>> {
//     return instancePublic.get<IProductResponse>('/cms/product', {});
//   },
// };

// export const cityAPI = {
//   async detail(): Promise<AxiosResponse<ICityResponse>> {
//     return instancePrivate.get<ICityResponse>('/city/detail', {});
//   },
//   async rts(): Promise<AxiosResponse<Array<string>>> {
//     return instancePrivate.get<Array<string>>('/city/rts', {});
//   },
// };
