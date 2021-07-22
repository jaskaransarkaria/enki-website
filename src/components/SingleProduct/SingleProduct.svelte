<script lang="ts">
  import { goto, url } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import type { Product } from '@/types/product';

  export let product: Product;
  export let showDetailedView: boolean = false;
</script>

<style>
  .container {
    border: 2px solid salmon;
  }
</style>

<div class="container">
  {#if showDetailedView}
    {#each product.ProductImages as _, idx}
      <img
        src={`https://enki.imgix.net/${product.Id}-${idx}`}
        alt={`${product.Id} image number ${idx + 1} of ${product.ProductImages.length}`} />
    {/each}
    <h2>{`${product.Name} -- ${product.Id}`}</h2>
    <h3>{`${product.Description}`}</h3>
    <h3>{`${product.SalePrice} -- ${product.CurrentStock} in stock`}</h3>
  {:else}
    <img
      src={`https://enki.imgix.net/${product.Id}-0`}
      alt={`${product.Name}`} />
    <button on:click={$goto(`${$url()}/${product.Id}`)}>
      {`${product.Name} -- ${product.Id} -- ${product.SalePrice} -- ${product.CurrentStock} in stock`}
    </button>
  {/if}

  <AddToBasket productId={product.Id.toString()} />
  <button on:click={$goto('/payment/checkout')}>Goto Checkout</button>
</div>
