export interface IRecipeLite {
  id: number;
  authorName: string;
  name: string;
  description: string;
  meanRating: number;
}

export interface IRecipeFull extends IRecipeLite {
  ingredients: string[];
  userRating: number | null;
  steps: IStep[];
  foodEnergy: IFoodEnergy;
}

export interface IStep {
  id: number;
  label: string;
  meanTime: number;
  description: string;
}

export interface IFoodEnergy {
  fat: number;
  ethanol: number;
  proteins: number;
  carbohydrates: number;
  organicAcids: number;
  polyols: number;
  fiber: number;
}
