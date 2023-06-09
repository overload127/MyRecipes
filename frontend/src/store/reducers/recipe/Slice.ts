import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipeResponse } from 'models/response/RecipeResponse';

interface IWorkNet<T> {
  isFetching: boolean;
  isFailed: boolean;
  error: string;
  objectData: T;
}

export interface IParameters {
  currentPage: number;
  isDesc: boolean;
  total: number;
}

export interface IAction {
  idEditTask: number | null;
  description: string;
}

interface IRecipeState {
  isInit: boolean;
  parameters: IParameters;
  data: IWorkNet<IRecipeResponse[]>;
  action: IAction;
}

const initialState: IRecipeState = {
  isInit: false,
  parameters: {
    currentPage: 0,
    isDesc: false,
    total: 0,
  },
  data: {
    isFetching: false,
    isFailed: false,
    error: '',
    objectData: [],
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
      state.data.isFetching = true;
    },
    loadSuccess(state, action: PayloadAction<IRecipeResponse[]>) {
      state.data.isFailed = false;
      state.data.error = '';
      state.data.isFetching = false;
      state.data.objectData = action.payload;
    },
    loadError(state, action: PayloadAction<string>) {
      state.data.isFetching = false;
      state.data.isFailed = true;
      state.data.error = action.payload;
    },
    setParameters(state, action: PayloadAction<IParameters>) {
      state.parameters = action.payload;
    },
  },
});

export default recipeSlice.reducer;
