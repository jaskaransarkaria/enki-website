<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import AddToBasket from '../AddToBasket/AddToBasket.svelte';
  import { flow, pipe } from 'fp-ts/lib/function';
  import * as TE from 'fp-ts/lib/TaskEither';
  import * as T from 'fp-ts/lib/Task';
  import * as E from 'fp-ts/lib/Either';
  


  export let categoryId: string;

  let productArr: unknown = [];

  onMount(async () => {
    // fetch all the products in a specific category
    const get = (url: string): TE.TaskEither<Error, object[]> => TE.tryCatch(
        () => fetch(url).then((res) => res.json()),
        (reason) => new Error(String(reason))
      );

    // cast value to Either Left or Right
    const validateResponse = () => (response: any): E.Either<Error, any> => (response ? E.right(response) : E.left(Error('Invalid api call!')));


    const getProductsByCategory = await pipe(
      get(
      `${process.env.SERVER_URL}/products-by-category?id=${categoryId}`
    ),
    TE.chain(flow(validateResponse(), TE.fromEither)),
    TE.getOrElse((e => TE.of(e)) // get value or return the error
    ));

    const products = await getProductsByCategory()

    productArr = (products instanceof Error) ? [] : products;
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
