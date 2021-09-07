import { flow } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import type { Category } from '@/types/category';
import type { Product } from '@/types/product';
import type { Tag } from '@/types/tag';

interface GetFn<T> {
  (url: string): Promise<T>;
}

const retrieveStateFn = <T>(url: string, getState: GetFn<T>, defaultValue: T) =>
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

export const refreshCategory = async (
  url: string
): Promise<ReadonlyArray<Category>> => retrieveStateFn(url, getCategory, [])();

export const refreshProducts = async (
  url: string
): Promise<readonly Product[]> => retrieveStateFn(url, getProductArray, [])();

export const refreshCategories = async (
  url: string
): Promise<readonly Category[]> =>
  retrieveStateFn(url, getCategoriesArray, [])();

export const refreshTags = async (url: string): Promise<readonly Tag[]> =>
  retrieveStateFn(url, getTagsArray, [])();

const getCategory: GetFn<ReadonlyArray<Category>> = (
  url: string
): Promise<ReadonlyArray<Category>> => fetch(url).then((res) => res.json());

const getProductArray: GetFn<ReadonlyArray<Product>> = (
  url: string
): Promise<ReadonlyArray<Product>> => fetch(url).then((res) => res.json());

const getCategoriesArray: GetFn<ReadonlyArray<Category>> = (
  url: string
): Promise<ReadonlyArray<Category>> => fetch(url).then((res) => res.json());

const getTagsArray: GetFn<ReadonlyArray<Tag>> = (
  url: string
): Promise<ReadonlyArray<Tag>> => fetch(url).then((res) => res.json());
