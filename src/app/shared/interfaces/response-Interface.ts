export interface IResponseInterface<T> {
  data: {
    result: T
  };
  success: boolean;
  message: string;
}
