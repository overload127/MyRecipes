export interface IPageDataResponse {
  page: number;
  is_desc: number;
  total: number;
  per_page: number;
  recipes: IRecipeLiteResponse[];
}

export interface IRecipeLiteResponse {
  id: number;
  author_name: string;
  name: string;
  description: string;
  mean_rating: number;
}

export interface IRecipeFullResponse extends IRecipeLiteResponse {
  ingredients: string[];
  user_rating: number | null;
  steps: IStepResponse[];
  food_energy: IFoodEnergyResponse;
}

export interface IStepResponse {
  id: number;
  label: string;
  mean_time: number;
  description: string;
}

export interface IFoodEnergyResponse {
  fat: number;
  ethanol: number;
  proteins: number;
  carbohydrates: number;
  organicAcids: number;
  polyols: number;
  fiber: number;
}
