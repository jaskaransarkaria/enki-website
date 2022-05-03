import { flow } from "fp-ts/lib/function.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as T from "fp-ts/lib/Task.js";
import type { Category } from "$lib/types/category";
import type { Product } from "$lib/types/product";
import type { Tag } from "$lib/types/tag";

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

export const refreshCategoriesFromServer = async <T>(
  url: string,
  fetchWrapper: () => Promise<T>
): Promise<ReadonlyArray<Category>> =>
  retrieveStateFn(url, getCategoriesArrayServer(fetchWrapper), [])();

export const refreshCategoryFromServer = async <T>(
  url: string,
  fetchWrapper: () => Promise<T>
): Promise<ReadonlyArray<Category>> =>
  retrieveStateFn(url, getCategoryFromServer(fetchWrapper), [])();

export const refreshProductsFromServer = async <T>(
  url: string,
  fetchWrapper: () => Promise<T>
): Promise<ReadonlyArray<Product>> =>
  retrieveStateFn(url, getProductArrayFromServer(fetchWrapper), [])();

export const refreshCategories = async (
  url: string
): Promise<readonly Category[]> =>
  retrieveStateFn(url, getCategoriesArray, [])();

export const refreshTags = async (url: string): Promise<readonly Tag[]> =>
  retrieveStateFn(url, getTagsArray, [])();

const getCategoryFromServer: (
  fW: (a: string) => Promise<any>
) => GetFn<ReadonlyArray<Category>> =
  (fetchWrapper: (a: string) => Promise<any>) =>
  (url: string): Promise<ReadonlyArray<Category>> =>
    fetchWrapper(url).then((res) => res.json());

const getProductArrayFromServer: (
  fW: (a: string) => Promise<any>
) => GetFn<ReadonlyArray<Product>> =
  (fetchWrapper: (a: string) => Promise<any>) =>
  (url: string): Promise<ReadonlyArray<Product>> =>
    fetchWrapper(url).then((res) => res.json());

const getCategoriesArray: GetFn<ReadonlyArray<Category>> = (
  url: string
): Promise<ReadonlyArray<Category>> => fetch(url).then((res) => res.json());

const getCategoriesArrayServer: (
  fW: (a: string) => Promise<any>
) => GetFn<ReadonlyArray<Category>> =
  (fetchWrapper: (a: string) => Promise<any>) =>
  (url: string): Promise<ReadonlyArray<Category>> =>
    fetchWrapper(url).then((res) => res.json());

const getTagsArray: GetFn<ReadonlyArray<Tag>> = (
  url: string
): Promise<ReadonlyArray<Tag>> => fetch(url).then((res) => res.json());
