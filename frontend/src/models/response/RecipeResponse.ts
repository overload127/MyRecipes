export interface IRecipeResponse {
  id: number;
  author_name: string;
  name: string;
  description: string;
  ingredients: string[];
  rating: number;
}

export interface IRecipesPageResponse {
  per_page: number;
  page: number;
  is_desc: boolean;
  total: number;
  recipes: IRecipeResponse[];
}
