<script lang="typescript">
  import { fade } from 'svelte/transition';
  import { basket } from '@/stores/basket';
  import { updateBasket } from '@/libs/basket';
  import { goto } from '@roxi/routify';

  export let productId: number;
  export let productName: string;

  let flipped = true;
  let flipTranistionEnded = false;

  function flip(node: HTMLElement, { delay = 0, duration = 600 }) {
    return {
      delay,
      duration,
      css: (t: any, u: number) => `
        transform: rotateX(${1 - u * 180}deg);
				opacity: ${1 - u};
			`,
    };
  }
</script>

{#if productId}
  {#if flipped}
    <button
      class="add-to-basket"
      transition:flip
      on:outroend={() => (flipTranistionEnded = true)}
      on:click={() => {
        basket.set(
          updateBasket(
            { id: productId.toString(), name: productName },
            $basket,
            'incrementQuantity'
          )
        );
        flipped = false;
      }}
    >
      Add to Basket
    </button>
  {/if}
  {#if flipTranistionEnded}
    <button
      class="goto-basket"
      transition:fade={{ delay: 100, duration: 700 }}
      on:click={$goto('/online-shop/basket')}
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
