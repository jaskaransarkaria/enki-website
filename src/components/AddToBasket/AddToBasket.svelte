<script lang="typescript">
  import { fade } from 'svelte/transition';
  import { basket } from '@/stores/basket';
  import { updateBasket } from '@/libs/basket';
  import { goto } from '@roxi/routify';

  export let productId: number;
  export let productName: string;

  let addedToBasket = false;
</script>

{#if productId}
  {#if !addedToBasket}
    <button
      class="add-to-basket"
      on:click={() => {
        basket.set(
          updateBasket(
            { id: productId.toString(), name: productName },
            $basket,
            'incrementQuantity'
          )
        );
        addedToBasket = true;
      }}
    >
      Add to Basket
    </button>
  {/if}
  {#if addedToBasket}
    <button
      class="goto-basket"
      in:fade={{ duration: 500 }}
      on:click={() => $goto('/online-shop/basket')}
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

  .add-to-basket {
    background-color: #fa6603;
  }

  .goto-basket {
    background-color: #30a74b;
  }

  .add-to-basket:hover {
    filter: grayscale(20%);
  }
</style>
