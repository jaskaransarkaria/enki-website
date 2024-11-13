import { flow } from "fp-ts/lib/function.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as T from "fp-ts/lib/Task.js";
import type { SquareCategory } from "$lib/types/category";
import type { SquareProduct } from "$lib/types/product";

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
): Promise<ReadonlyArray<SquareCategory>> =>
  retrieveStateFn(url, getCategoriesArrayServer(fetchWrapper), [])();

export const refreshCategoryFromServer = async <T>(
  url: string,
  fetchWrapper: () => Promise<T>
): Promise<ReadonlyArray<SquareCategory>> =>
  retrieveStateFn(url, getCategoryFromServer(fetchWrapper), [])();

export const refreshProductsFromServer = async <T>(
  url: string,
  fetchWrapper: () => Promise<T>
): Promise<ReadonlyArray<SquareProduct>> =>
  retrieveStateFn(url, getProductArrayFromServer(fetchWrapper), [])();

export const refreshCategories = async (
  url: string
): Promise<readonly SquareCategory[]> =>
  retrieveStateFn(url, getCategoriesArray, [])();

const getCategoryFromServer: (
  fW: (a: string) => Promise<any>
) => GetFn<ReadonlyArray<SquareCategory>> =
  (fetchWrapper: (a: string) => Promise<any>) =>
  (url: string): Promise<ReadonlyArray<SquareCategory>> =>
    fetchWrapper(url).then((res) => res.json());

const getProductArrayFromServer: (
  fW: (a: string) => Promise<any>
) => GetFn<ReadonlyArray<SquareProduct>> =
  (fetchWrapper: (a: string) => Promise<any>) =>
  (url: string): Promise<ReadonlyArray<SquareProduct>> =>
    fetchWrapper(url).then((res) => res.json());

const getCategoriesArray: GetFn<ReadonlyArray<SquareCategory>> = (
  url: string
): Promise<ReadonlyArray<SquareCategory>> =>
  fetch(url).then((res) => res.json());

const getCategoriesArrayServer: (
  fW: (a: string) => Promise<any>
) => GetFn<ReadonlyArray<SquareCategory>> =
  (fetchWrapper: (a: string) => Promise<any>) =>
  (url: string): Promise<ReadonlyArray<SquareCategory>> =>
    fetchWrapper(url).then((res) => res.json());
