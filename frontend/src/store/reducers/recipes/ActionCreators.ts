/* eslint-disable indent */
import { AppDispatch, RootState } from 'store/store';
import { recipeAPI } from 'api/api';
import { IRecipeLite } from 'models/business/RecipeBusiness';
import { IParameters, recipeSlice } from './Slice';

// const checkAndConvertRecipesData = (rawRecipe: IRecipeResponse[]): IRecipe[] => {
//   return rawRecipe.map((recipe) => ({
//     id: recipe.id,
//     authorName: recipe.author_name,
//     name: recipe.name,
//     description: recipe.description,
//     ingredients: recipe.ingredients,
//     meanRating: recipe.mean_rating,
//     userRating: recipe.user_rating,
//     steps: recipe.steps.map((step) => ({
//       id: step.id,
//       label: step.label,
//       meanTime: step.mean_time,
//       description: step.description,
//     })),
//     foodEnergy: {
//       fat: 0,
//       ethanol: 0,
//       proteins: 0,
//       carbohydrates: 0,
//       organicAcids: 0,
//       polyols: 0,
//       fiber: 0,
//     },
//   }));
// };

export const loadRecipesByPage =
  (page: number, isDesc: boolean, perPage: number) => async (dispatch: AppDispatch, getStore: () => RootState) => {
    const { isFetching } = getStore().recipesReducer.recipes;
    if (isFetching) return;
    dispatch(recipeSlice.actions.startFetching());
    try {
      const result = await recipeAPI.loadPageData(page, isDesc, perPage);
      const recipes: IRecipeLite[] = result.data.recipes.map((item) => ({
        id: item.id,
        authorName: item.author_name,
        name: item.name,
        description: item.description,
        meanRating: item.mean_rating,
      }));
      const parameters: IParameters = {
        currentPage: result.data.page,
        isDesc: Boolean(result.data.is_desc),
        total: result.data.total,
        perPage: result.data.per_page,
      };
      dispatch(recipeSlice.actions.loadSuccess(recipes));
      dispatch(recipeSlice.actions.setParameters(parameters));
    } catch (e) {
      console.error(e.response?.data?.message);
      console.error(e.message);
      dispatch(recipeSlice.actions.loadError(e.message));
    }
  };

export const changePage =
  (page: number, perPage: number) => async (dispatch: AppDispatch, getStore: () => RootState) => {
    const { isDesc } = getStore().recipesReducer.parameters;
    await dispatch(loadRecipesByPage(page, isDesc, perPage));
  };

export const changePerPage =
  (page: number, perPage: number) => async (dispatch: AppDispatch, getStore: () => RootState) => {
    const { isDesc, total } = getStore().recipesReducer.parameters;
    await dispatch(
      recipeSlice.actions.setParameters({
        currentPage: page - 1,
        isDesc,
        total,
        perPage,
      }),
    );
  };

export default null;
