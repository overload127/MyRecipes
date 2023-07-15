import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipeLite, IRecipeFull } from 'models/business/RecipeBusiness';
import { IWorkNet } from 'models/business/IUtils';

export interface IParameters {
  currentPage: number;
  isDesc: boolean;
  total: number;
  perPage: number;
}

// Не ясно. Возможно нужен будет для редактирования рецептов.
export interface IAction {
  idEditTask: number | null;
  description: string;
}

interface IRecipesState {
  isInit: boolean;
  parameters: IParameters;
  recipes: IWorkNet<IRecipeLite[]>;
  displayFullRecipe: IWorkNet<IRecipeFull | null>;
  action: IAction;
}

const initialState: IRecipesState = {
  isInit: false,
  parameters: {
    currentPage: 0,
    perPage: 10,
    isDesc: false,
    total: 0,
  },
  recipes: {
    isFetching: false,
    isFailed: false,
    error: '',
    objectData: [],
  },
  displayFullRecipe: {
    isFetching: false,
    isFailed: false,
    error: '',
    objectData: null,
  },
  action: {
    idEditTask: null,
    description: '',
  },
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    init(state) {
      state.isInit = true;
    },
    startFetching(state) {
      state.recipes.isFetching = true;
    },
    loadSuccess(state, action: PayloadAction<IRecipeLite[]>) {
      state.recipes.isFailed = false;
      state.recipes.error = '';
      state.recipes.isFetching = false;
      state.recipes.objectData = action.payload;
    },
    loadError(state, action: PayloadAction<string>) {
      state.recipes.isFetching = false;
      state.recipes.isFailed = true;
      state.recipes.error = action.payload;
    },
    setParameters(state, action: PayloadAction<IParameters>) {
      state.parameters = action.payload;
    },
  },
});

export default recipeSlice.reducer;
