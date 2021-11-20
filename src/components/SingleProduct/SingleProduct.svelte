<script lang="typescript">
  import { goto } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import type { Product } from '@/types/product';

  export let product: Product;
  export let showDetailedView = false;

  let selectedIdx = 0;
</script>

{#if product}
  <button
    class={showDetailedView ? 'details-container' : 'container'}
    on:click={$goto(`/shop/product/${product.Id}`)}
  >
    {#if showDetailedView}
      <h2>{`${product.Name}`}</h2>
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
      <div class="detailed-products-footer">
        <div class="product-details">
          <h4>{`${product.Description}`}</h4>
          <h4>
            {`£${product.SalePrice} -- ${
              product.CurrentStock === 0
                ? 'sold out'
                : product.CurrentStock + ' in stock'
            }`}
          </h4>
        </div>
        <AddToBasket {product} detailed={showDetailedView} />
      </div>
    {:else}
      <h3 class="basic-header">{`${product.Name}`}</h3>
      <figure class="img-container">
        <img
          src={`https://enki.imgix.net/${product.Id}-0`}
          alt={`${product.Name}`}
        />
      </figure>
      <h3 class="basic-header">
        {`£${product.SalePrice} -- ${
          product.CurrentStock === 0
            ? 'sold out'
            : product.CurrentStock + ' in stock'
        }`}
      </h3>
      <AddToBasket {product} detailed={showDetailedView} />
    {/if}
  </button>
{/if}

<style>
  .container,
  .details-container {
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

  .details-container {
    height: 265px;
    width: 265px;
    justify-content: auto;
    justify-self: auto;
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
    margin: 0;
    height: 160px;
  }

  .img-container img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }

  .img-thumbnail-container img {
    width: 75%;
  }

  .selected-image {
    margin-right: 0;
    padding-right: 15px;
    width: 130px;
  }

  .selected-image img {
    transition: all 0.4s ease-in-out;
  }

  .selected-image img:hover {
    transform: scale(1.75) translateY(7.5%);
    cursor: zoom-in;
  }

  .detailed-products-footer {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
  }

  .product-details {
    display: flex;
  }

  .thumbnails {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    margin-left: 0;
  }

  .thumbnails img {
    cursor: pointer;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
    width: 70px;
    transition: transform 0.2s;
    height: 70px;
    padding: 4px;
  }

  .thumbnails img:hover {
    box-shadow: none;
    transform: scale(
      1.5
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }

  h2 {
    font-size: 0.8em;
  }

  h4 {
    font-size: 0.7em;
  }

  h3 {
    font-size: 0.7em;
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  @media (min-width: 360px) {
    .container,
    .details-container {
      height: 300px;
      width: 300px;
    }

    .img-thumbnail-container {
      height: 200px;
    }

    .img-thumbnail-container img {
      height: 70%;
    }

    .img-container {
      height: 125px;
    }

    h3 {
      font-size: 0.8;
    }
  }

  @media (min-width: 700px) {
    .container {
      height: 550px;
      width: 550px;
    }

    .details-container {
      height: 650px;
      width: 650px;
    }

    .img-container {
      height: 250px;
    }

    h2 {
      font-size: 2em;
      justify-self: start;
    }

    h4 {
      font-size: 1em;
    }

    .img-thumbnail-container {
      height: 375px;
    }

    .img-thumbnail-container img {
      width: 100%;
      height: 100%;
    }

    .selected-image {
      width: 250px;
      justify-self: center;
    }

    .product-details {
      display: block;
    }

    .detailed-products-footer {
      width: 100%;
      height: 110px;
      padding: 1.5%;
      flex-wrap: wrap;
      justify-content: space-between;
      justify-content: center;
    }

    .thumbnails {
      grid-template-rows: repeat(3, 1fr);
    }

    .thumbnails img {
      width: 90px;
      height: 90px;
    }

    h3 {
      font-size: 1.4em;
    }
  }

  @media (min-width: 960px) {
    .container {
      height: 450px;
      width: 450px;
    }

    .details-container {
      height: 775px;
      width: 775px;
    }

    .img-thumbnail-container {
      height: 425px;
      margin: 10px;
    }

    .selected-image {
      width: 300px;
      align-self: center;
      justify-self: center;
    }

    .detailed-products-footer {
      height: 250px;
    }

    .img-container {
      height: 200px;
    }

    h4 {
      font-size: 1.25em;
    }

    .thumbnails img {
      width: 130px;
      height: 130px;
      padding: 10px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      height: 385px;
      width: 385px;
    }

    .details-container {
      width: 900px;
      height: 900px;
    }

    .img-thumbnail-container {
      height: 525px;
    }

    .img-container {
      height: 150px;
    }

    .selected-image {
      width: 400px;
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
