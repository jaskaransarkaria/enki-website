<script lang="typescript">
  import { goto } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import type { Product } from '@/types/product';

  export let product: Product;
  export let showDetailedView = false;

  let selectedIdx = 0;
</script>

{#if product}
  <button class="container" on:click={$goto(`/shop/product/${product.Id}`)}>
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
      <figure class="img-container">
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
  </button>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 0.25em;
    margin: 4%;
    height: 250px;
    width: 250px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
  }

  .container:hover {
    transform: scale(1.06);
    box-shadow: 0 3px 65px rgb(0 0 0 / 0.2);
  }

  .img-container {
    display: flex;
    height: 100px;
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

  h2 {
    font-size: 0.8em;
  }
  h1,
  h2,
  h3 {
    text-align: center;
  }

  @media (min-width: 360px) {
    .container {
      height: 300px;
      width: 300px;
    }

    h2 {
      font-size: 1.17em;
    }
  }

  @media (min-width: 700px) {
    .container {
      height: 550px;
      width: 550px;
    }

    .img-container {
      height: 250px;
    }

    h2 {
      font-size: 1.5em;
    }
  }

  @media (min-width: 960px) {
    .container {
      height: 450px;
      width: 450px;
    }

    .img-container {
      height: 200px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      height: 385px;
      width: 385px;
    }

    .img-container {
      height: 150px;
    }
  }
  @media (min-width: 1600px) {
    .container {
      height: 385px;
      width: 385px;
    }

    .img-container {
      height: 150px;
    }
  }

  @media (min-width: 2000px) {
    .container {
      height: 450px;
      width: 450px;
    }

    .img-container {
      height: 200px;
    }
  }
</style>
