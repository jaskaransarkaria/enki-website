import { flow } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import type { Category } from '../types/category';
import type { Product } from '../types/product';
interface GetFn<T> {
  (url: string): Promise<T>;
}

export const retrieveStateFn = <T>(
  url: string,
  getState: GetFn<T>,
  defaultValue: T
) =>
  // fetch all the products in a specific category
  // TaskEither is from asynchronous operations that can fail
  flow(
    (url: string) =>
      TE.tryCatch(
        () => getState(url),
        () => new Error(`Error fetching products`)
      ),
    TE.getOrElse(() => T.of(defaultValue))
  )(url);

export const refreshCategory = async (url: string): Promise<Category> =>
  retrieveStateFn(url, getCategory, { Id: '', Name: '', Children: [] })();

export const refreshProducts = async (url: string) =>
  retrieveStateFn(url, getProductArray, [])();

export const refreshCategories = async (url: string) =>
  retrieveStateFn(url, getCategoriesArray, [])();

const getCategory: GetFn<Category> = (url: string): Promise<Category> =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const getProductArray: GetFn<ReadonlyArray<Product>> = (
  url: string
): Promise<ReadonlyArray<Product>> => fetch(url).then((res) => res.json());

const getCategoriesArray: GetFn<ReadonlyArray<Category>> = (
  url: string
): Promise<ReadonlyArray<Category>> =>
  fetch(url)
    .then((res) => res.json())
    .then((obj) => JSON.parse(obj)); // think I have to do this because it's double json encoded
