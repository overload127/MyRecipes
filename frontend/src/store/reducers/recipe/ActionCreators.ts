/* eslint-disable indent */
import { AppDispatch, RootState } from 'store/store';
import { recipeAPI } from 'api/api';
import { IRecipeResponse } from 'models/response/RecipeResponse';
import { IParameters, recipeSlice } from './Slice';

export const loadData = (page: number, isDesc: boolean, perPage: number) => async (dispatch: AppDispatch) => {
  dispatch(recipeSlice.actions.startFetching());
  try {
    const result = await recipeAPI.loadPageData(page, isDesc, perPage);
    const recipes: IRecipeResponse[] = result.data.payload.recipes.map((item) => ({ ...item }));
    dispatch(recipeSlice.actions.loadSuccess(recipes));
    const parameters: IParameters = {
      currentPage: result.data.payload.page,
      isDesc: Boolean(result.data.payload.is_desc),
      total: result.data.payload.total,
    };
    dispatch(recipeSlice.actions.setParameters(parameters));
  } catch (e) {
    console.error(e.response?.data?.message);
    console.error(e.message);
    dispatch(recipeSlice.actions.loadError(e.message));
  }
};

export const changePage =
  (page: number, perPage: number) => async (dispatch: AppDispatch, getStore: () => RootState) => {
    const { isDesc } = getStore().recipeReducer.parameters;
    await dispatch(loadData(page, isDesc, perPage));
  };

export const changePerPage = (perPage: number) => async (dispatch: AppDispatch, getStore: () => RootState) => {
  const { currentPage, isDesc, total } = getStore().recipeReducer.parameters;
  await dispatch(
    recipeSlice.actions.setParameters({
      currentPage,
      isDesc,
      total,
    }),
  );
  await dispatch(loadData(currentPage, isDesc, perPage));
};

export default null;
