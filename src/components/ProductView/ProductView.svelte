<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import AddToBasket from '../AddToBasket/AddToBasket.svelte';
  import { identity, pipe } from 'fp-ts/lib/function'
  import * as TE from 'fp-ts/lib/TaskEither'


  export let categoryId: string;

  let productArr: object[] = [];

  onMount(async () => {
    // fetch all the products in a specific category

    // A task is a function that returns a promise which is expected to never be rejected.
    // Tasks are expected to always succeed but can fail when an error occurs outside our 
    // expectations. In this case, the error is thrown and breaks the functional pipeline.
    // An analogy to this is awaiting a Promise that throws an error without putting a try-catch-finally block in front.

//     Any arbitrary value can become a Task by using the of operator to lift it into the Task world.
//  This is equivalent to calling Promise.resolve.

// import * as T from 'fp-ts/lib/Task'

// const foo = 'asdf' // string
// const bar = T.of(foo) // T.Task<string>

// // Same As
// const fdsa: T.Task<string> = () => Promise.resolve(foo)

// An Either is a type that represents a synchronous operation that can succeed or fail. Much like Option, where 
// it is Some or None, the Either type is either Right or Left. Right represents success and Left represents failure.
// The Either type is a union type of Left and Right.

// Eithers are essential for capturing error states in functional programming. We need the Eithers because we cannot break pipelines by throwing errors. Error states must either be handled or propagated up the call stack.

// Eithers are also advantageous to their try-catch-finally counterparts because the error is always type-safe. When you use a catch block, the error is always of type unknown. This is inconvenient for you as the client because you need to use instanceof to narrow down the error type.

// With Eithers, we know every possible error state based on the type signature. We can choose to handle them in a switch statement or continue to propagate up the call stack.

// TaskEither is an asynchronous operation that can fail.

// import { pipe } from 'fp-ts/lib/function'
// import * as TE from 'fp-ts/lib/TaskEither'
// ;(async () => {
//   const ok = await pipe(
//     TE.tryCatch(
//       () => axios.get('https://httpstat.us/200'),
//       (reason) => new Error(`${reason}`),
//     ),
//     TE.map((resp) => resp.data),
//   )()

//   console.log(ok)
//   // { _tag: 'Right', right: { code: 200, description: 'OK' } }
// })()

    const fetchProductsByCategoryIdFunctional = await pipe(
      TE.tryCatch(
        () => fetch(`${process.env.SERVER_URL}/products-by-category?id=${categoryId}`),
        (reason) => new Error(`${reason}`),
      ),
      await TE.map(async (resp: any) => {
        const result = await resp.json()
        return result
      })
      )


  function get(url: string): TE.TaskEither<Error, any> {
    return TE.tryCatch(() => fetch(url).then(res => res.json()), reason => new Error(String(reason)))
  }

    // const fetchProductsByCategoryIdFunctional = async () => {
    //   const ok = await pipe(
    //   TE.tryCatch(
    //     () => fetch(`${process.env.SERVER_URL}/products-by-category?id=${categoryId}`),
    //     (reason) => new Error(`${reason}`),
    //   ),
    //   TE.map((resp) => resp.json())
    //   )()
    //   console.log(ok)
    // }

    const letsSee = await get(`${process.env.SERVER_URL}/products-by-category?id=${categoryId}`)()
    const unpack = await letsSee
    console.log("lets", unpack)

    const fetchProductsByCategoryId = async (id: string) => {
      const response = await fetch(
        `${process.env.SERVER_URL}/products-by-category?id=${id}`
      );
      const result = await response.json();
      return result;
    };
    productArr = await fetchProductsByCategoryId(categoryId);
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
