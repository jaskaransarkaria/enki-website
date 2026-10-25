import { flow } from "fp-ts/lib/function.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as T from "fp-ts/lib/Task.js";
import type { SquareCategory } from "$lib/types/category";
import type { SquareProduct } from "$lib/types/product";

interface GetFn<T> {
  (url: string): Promise<T>;
}

type FetchWrapper = (input: string) => Promise<Response>;

const retrieveStateFn = <T>(url: string, getState: GetFn<T>, defaultValue: T) =>
  // fetch all the products in a specific category
  // TaskEither is from asynchronous operations that can fail
  flow(
    (url: string) =>
      TE.tryCatch(
        () => getState(url),
        () => new Error(`Error fetching products`),
      ),
    TE.getOrElse(() => T.of(defaultValue)),
  )(url);

/**
 * The backend returns an empty 500 body for missing records, which `res.json()`
 * resolves to `undefined`. Coerce anything that isn't an array to `[]` so
 * callers can always treat the result as an array.
 */
const asArray = <T>(data: unknown): T[] => (Array.isArray(data) ? data : []);

export const refreshCategoriesFromServer = async (
  url: string,
  fetchWrapper: FetchWrapper,
): Promise<ReadonlyArray<SquareCategory>> =>
  retrieveStateFn(url, getCategoriesArrayServer(fetchWrapper), [])();

export const refreshCategoryFromServer = async (
  url: string,
  fetchWrapper: FetchWrapper,
): Promise<ReadonlyArray<SquareCategory>> =>
  retrieveStateFn(url, getCategoryFromServer(fetchWrapper), [])();

export const refreshProductsFromServer = async (
  url: string,
  fetchWrapper: FetchWrapper,
): Promise<ReadonlyArray<SquareProduct>> =>
  retrieveStateFn(url, getProductArrayFromServer(fetchWrapper), [])();

export const refreshCategories = async (
  url: string,
): Promise<readonly SquareCategory[]> =>
  retrieveStateFn(url, getCategoriesArray, [])();

const getCategoryFromServer: (
  fW: FetchWrapper,
) => GetFn<ReadonlyArray<SquareCategory>> = (fetchWrapper) => (url) =>
  fetchWrapper(url)
    .then((res) => res.json())
    .then((data) => asArray<SquareCategory>(data));

const getProductArrayFromServer: (
  fW: FetchWrapper,
) => GetFn<ReadonlyArray<SquareProduct>> = (fetchWrapper) => (url) =>
  fetchWrapper(url)
    .then((res) => res.json())
    .then((data) => asArray<SquareProduct>(data));

const getCategoriesArray: GetFn<ReadonlyArray<SquareCategory>> = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => asArray<SquareCategory>(data));

const getCategoriesArrayServer: (
  fW: FetchWrapper,
) => GetFn<ReadonlyArray<SquareCategory>> = (fetchWrapper) => (url) =>
  fetchWrapper(url)
    .then((res) => res.json())
    .then((data) => asArray<SquareCategory>(data));
