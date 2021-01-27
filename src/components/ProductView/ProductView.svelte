<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import AddToBasket from '../AddToBasket/AddToBasket.svelte';
  import { pipe } from 'fp-ts/lib/function';
  import * as TE from 'fp-ts/lib/TaskEither';
  import type * as E from 'fp-ts/lib/Either';

  export let categoryId: string;

  interface Product {}

  interface GetProductsFn {
    (url: string): Promise<Product[]>;
  }

  let productArr: Product[] | E.Either<Error, ReadonlyArray<Product>> = [];

  const retrieveStateFn = (
    serverUrl: string,
    catId: string,
    getProducts: GetProductsFn
  ) => (): Promise<E.Either<Error, ReadonlyArray<Product>>> => {
    // fetch all the products in a specific category
    const get = (url: string): TE.TaskEither<Error, ReadonlyArray<Product>> =>
      // TaskEither is from asynchronous operations that can fail
      TE.tryCatch(
        () => getProducts(url),
        () => new Error(`Error fetching `)
      );

    const getProductsByCategory = pipe(
      `${serverUrl}/products-by-category?id=${catId}`,
      get,
      TE.chain((result) => TE.of(result))
    );
    return getProductsByCategory();
  };

  const getProducts: GetProductsFn = (url: string): Promise<Product[]> =>
    fetch(url).then((res) => res.json());

  onMount(async () => {
    productArr = await retrieveStateFn(
      process.env.SERVER_URL as string,
      categoryId,
      getProducts
    )();
    console.log(productArr);
  });
</script>

<style>
  .products-container {
    display: grid;
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  button {
    width: 22.5vw;
    height: 25px;
  }

  button,
  button:active {
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
</style>

<div class="products-container">
  {#each productArr as product}
    <button>
      {`${product.Name} -- ${product.Id} -- ${product.SalePrice} -- ${product.ProductImages[0]}`}
    </button>
    <div>
      <AddToBasket productId={product.Id.toString()} />
      <button on:click={$goto('/payment/checkout')}> Goto Checkout </button>
    </div>
  {/each}
</div>
