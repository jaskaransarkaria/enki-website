<script lang="typescript">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';
  import { basket } from '@/stores/basket';
  import { updateBasket } from '@/libs/basket';

  import type { Product } from '@/types/product';

  export let product: Product;
  export let detailed = false;

  let addedToBasket =
    $basket.findIndex((item) => item.id === product.Id.toString()) === -1
      ? false
      : true;
</script>

{#if product}
  {#if !addedToBasket}
    <button
      class={`add-to-basket ${detailed ? 'narrow' : ''}`}
      on:click={() => {
        basket.set(updateBasket(product, $basket, 'incrementQuantity'));
        addedToBasket = true;
      }}
    >
      Add to Basket
    </button>
  {:else}
    <button
      class={`goto-basket ${detailed ? 'narrow' : ''}`}
      in:fade={{ duration: 500 }}
      on:click={() => $goto('/shop/basket')}
    >
      Goto Basket
    </button>
  {/if}
{/if}

<style>
  button {
    cursor: pointer;
    border: none;
    width: 80%;
    border-radius: 4px;
    transition: filter 0.25s;
  }

  .narrow {
    width: 35%;
    font-size: 0.65em;
  }

  .add-to-basket {
    background-color: #fa6603;
  }

  .goto-basket {
    background-color: #30a74b;
  }

  .add-to-basket:hover {
    filter: grayscale(20%);
  }

  @media (min-width: 700px) {
    .narrow {
      font-size: 1em;
      width: 80%;
    }
  }
</style>
