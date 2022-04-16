<script lang="ts">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import { basket } from "$lib/stores/basket";
  import { updateBasket } from "$lib/utils/basket";

  import type { Product } from "$lib/types/product";

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
      class={`add-to-basket ${detailed ? "narrow" : ""}`}
      on:click={() => {
        if (browser) {
          basket.set(updateBasket(product, $basket, "incrementQuantity"));
          addedToBasket = true;
        }
      }}
    >
      Add to Basket
    </button>
  {:else}
    <button
      class={`goto-basket ${detailed ? "narrow" : ""}`}
      in:fade={{ duration: 500 }}
      on:click={() => goto("/shop/basket")}
    >
      Go to Basket
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
    margin-bottom: 0em;
  }

  .narrow {
    width: 46%;
    font-size: 0.65em;
  }

  .add-to-basket {
    background-color: white;
    border: none;
    border-radius: 4px;
    transition: filter 0.25s;
    border: 1px solid #ff6600;
    color: #ff6600;
  }

  .goto-basket {
    background-color: white;
    border: none;
    border-radius: 4px;
    transition: filter 0.25s;
    border: 1px solid #008080;
    color: #008080;
  }

  .goto-basket:hover {
    color: #00b2b2;
    border: 1px solid #00b2b2;
    cursor: pointer;
  }

  .add-to-basket:hover {
    color: #ff8c00;
    border: 1px solid #ff8c00;
    cursor: pointer;
  }

  @media (min-width: 960px) {
    .narrow {
      font-size: 1em;
      width: 30%;
    }
  }

  @media (min-width: 2000px) {
    .narrow {
      font-size: 1em;
      width: 20%;
    }
  }
</style>
