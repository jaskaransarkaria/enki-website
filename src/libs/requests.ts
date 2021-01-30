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

export const retrieveStateFn = (
    serverUrl: string,
    catId: string,
    getProducts: GetProductsFn
  ) => (): Promise<E.Either<Error, ReadonlyArray<Product>>> => {
    // fetch all the products in a specific category
    const get = (url: string): TE.TaskEither<Error, ReadonlyArray<Product>> =>
      // TaskEither is from asynchronous operations that can fail
      TE.tryCatch(
        () => getProducts(url),
        () => new Error(`Error fetching products`)
      );

    const getProductsByCategory = pipe(
      `${serverUrl}/products-by-category?id=${catId}`,
      get,
      TE.chain((result) => TE.of(result))
    );
    return getProductsByCategory();
  };
export interface GetProductsFn {
    (url: string): Promise<Product[]>;
  }

export interface Product {
  Name: string;
  Id: string;
  SalePrice: string;
  ProductImages: string[]
}

