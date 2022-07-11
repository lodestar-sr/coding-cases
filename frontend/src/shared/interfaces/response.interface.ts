/**
 * Key must be a static string
 * */
export type ResponseInterface<Key extends string, T> = {
  [key in Key]: T[];
};
