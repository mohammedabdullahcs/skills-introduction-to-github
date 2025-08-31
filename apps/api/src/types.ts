export type Result<T, E = string> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

export const createSuccess = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

export const createError = <E = string>(error: E): Result<never, E> => ({
  success: false,
  error,
});