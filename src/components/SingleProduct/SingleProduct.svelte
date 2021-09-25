<script lang="typescript">
  import { goto, url } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import type { Product } from '@/types/product';

  export let product: Product;
  export let showDetailedView = false;
</script>

{#if product}
  <div class="container">
    {#if showDetailedView}
      {#if product.ProductImages}
        {#each product.ProductImages as _, idx (idx)}
          <figure class="img-container">
            <img
              src={`https://enki.imgix.net/${product.Id}-${idx}`}
              alt={`${product.Id} image number ${idx + 1} of ${
                product.ProductImages.length
              }`}
            />
          </figure>
        {/each}
      {/if}
      <h2>{`${product.Name} -- ${product.Id}`}</h2>
      <h3>{`${product.Description}`}</h3>
      <h3>{`${product.SalePrice} -- ${product.CurrentStock} in stock`}</h3>
    {:else}
      <h1>{`${product.Name}`}</h1>
      <figure on:click={$goto(`${$url()}/${product.Id}`)} class="img-container">
        <img
          src={`https://enki.imgix.net/${product.Id}-0`}
          alt={`${product.Name}`}
        />
      </figure>
      <h2>
        {`${product.SalePrice} -- ${
          product.CurrentStock === 0
            ? 'sold out'
            : product.CurrentStock + ' in stock'
        }`}
      </h2>
    {/if}
    <AddToBasket productId={product.Id} />
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .img-container {
    cursor: pointer;
    display: flex;
    height: 60%;
    width: 80%;
  }

  .img-container img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: auto;
  }
</style>
