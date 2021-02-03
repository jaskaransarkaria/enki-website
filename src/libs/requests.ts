import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import type E from 'fp-ts/lib/Either';
import type { Category } from '../types/category';

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

export const refreshCategory = async (
  url: string
): Promise<Category | ReadonlyArray<Category>> => {
  const result = await retrieveStateFn(url, getCategory)()();

  return result['_tag'] === 'Right'
    ? result.right
    : { Id: '', Name: '', Children: [] };
};

export const getCategory: GetFn<Category> = (url: string): Promise<Category> =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));
