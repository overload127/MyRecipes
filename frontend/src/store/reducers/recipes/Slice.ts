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
    objectData: [
      {
        id: 1,
        authorName: 'Admin',
        name: 'Самый вкусный Шавуха 1!',
        description: `Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
        Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.`,
        meanRating: 1,
      },
      {
        id: 2,
        authorName: 'Admin',
        name: 'Самый вкусный Шавуха 2!',
        description: `Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
        Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.`,
        meanRating: 3.5,
      },
    ],
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
