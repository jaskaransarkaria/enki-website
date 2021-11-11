<script lang="typescript">
  import { goto } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import type { Product } from '@/types/product';

  export let product: Product;
  export let showDetailedView = false;

  let selectedIdx = 0;
</script>

{#if product}
  <div class="container">
    <h2>{`${product.Name}`}</h2>
    {#if showDetailedView}
      {#if product.ProductImages}
        <figure class="img-thumbnail-container">
          <figure class="selected-image">
            <img
              src={`https://enki.imgix.net/${product.Id}-${selectedIdx}`}
              alt={`${product.Id} image number ${selectedIdx + 1} of ${
                product.ProductImages.length
              }`}
            />
          </figure>
          <figure class="thumbnails">
            {#each product.ProductImages as _, idx (idx)}
              <img
                on:click={() => (selectedIdx = idx)}
                src={`https://enki.imgix.net/${product.Id}-${idx}`}
                alt={`${product.Id} image number ${idx + 1} of ${
                  product.ProductImages.length
                }`}
              />
            {/each}
          </figure>
        </figure>
      {/if}
      <h3>{`${product.Description}`}</h3>
      <h3>
        {`£${product.SalePrice} -- ${
          product.CurrentStock === 0
            ? 'sold out'
            : product.CurrentStock + ' in stock'
        }`}
      </h3>
    {:else}
      <figure
        on:click={$goto(`/shop/product/${product.Id}`)}
        class="img-container"
      >
        <img
          src={`https://enki.imgix.net/${product.Id}-0`}
          alt={`${product.Name}`}
        />
      </figure>
      <h2>
        {`£${product.SalePrice} -- ${
          product.CurrentStock === 0
            ? 'sold out'
            : product.CurrentStock + ' in stock'
        }`}
      </h2>
    {/if}
    <AddToBasket {product} detailed={showDetailedView} />
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 0.25em;
    margin: 4%;
    height: 90%;
  }

  .img-container {
    cursor: pointer;
    display: flex;
    height: 60%;
    width: 80%;
  }

  .img-thumbnail-container {
    display: grid;
    grid-template-columns: 8fr 2fr;
  }

  .img-container img,
  .img-thumbnail-container img {
    display: block;
    max-width: 100%;
    max-height: 90%;
    width: auto;
    height: auto;
    margin: auto;
  }

  .selected-image {
    margin-right: 0;
  }

  .thumbnails {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    margin-left: 0;
  }

  .thumbnails img {
    cursor: pointer;
    width: 70px;
    transition: transform 0.2s;
    height: 70px;
    padding: 10px;
  }

  .thumbnails img:hover {
    transform: scale(
      1.5
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  @media (max-width: 700px) {
    .thumbnails img {
      height: 60px;
      width: 60px;
    }

    .thumbnails {
      margin-right: 0;
    }

    h1 {
      text-align: center;
    }

    .img-thumbnail-container {
      align-items: center;
    }

    .thumbnails {
      display: flex;
      flex-direction: column;
    }
  }
</style>
