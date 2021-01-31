import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import type E from 'fp-ts/lib/Either';

const orderCatergories = (resp: object[]) =>
  resp.sort((a: object, b: object) => (a.Name < b.Name ? -1 : 1));

export const fetchCategories = async () => {
  const response = await fetch(`${process.env.SERVER_URL}/categories`);
  const parsedResult = JSON.parse(await response.json());
  return orderCatergories(parsedResult);
};

export const retrieveStateFn = <T>(
  url: string,
  getState: GetFn<T>
) => (): (() => Promise<E.Either<Error, T | ReadonlyArray<T>>>) => {
  // fetch all the products in a specific category
  const get = (url: string): TE.TaskEither<Error, T | ReadonlyArray<T>> =>
    // TaskEither is from asynchronous operations that can fail
    TE.tryCatch(
      () => getState(url),
      () => new Error(`Error fetching products`)
    );

  return pipe(
    url,
    get,
    TE.chain((result) => TE.of(result))
  );
};
export interface GetFn<T> {
  (url: string): Promise<T | ReadonlyArray<T>>;
}


export const getCategoryId: GetFn<string> = (url: string): Promise<string> => fetch(url).then((res) => res.json());
