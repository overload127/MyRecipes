export interface IWorkNet<T> {
  isFetching: boolean;
  isFailed: boolean;
  error: string;
  objectData: T;
}
