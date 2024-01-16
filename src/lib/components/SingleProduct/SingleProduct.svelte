<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import lowInStockTeal from "$lib/assets/low_in_stock_teal_1.png";
  import outOfStockOrange from "$lib/assets/out_of_stock_orange.png";
  import comingSoon from "$lib/assets/coming_soon.png";
  import ImageLoader from "$lib/components/Image/ImageLoader.svelte";
  import DetailedSingleProduct from "$lib/components/DetailedSingleProduct/DetailedSingleProduct.svelte";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  import type { Product } from "$lib/types/product";
  import type { Category } from "$lib/types/category";
  import { getImageFilename } from "$lib/utils/getImageFilename";

  export let variantCategory: Category | null = null;
  export let product: Product | null;
  export let showDetailedView = false;

  let productDescription: string;

  $: if (product) {
    productDescription =
      product?.ProductDetails?.DetailedDescription || product.Description;
  }
  $: outerWidth = 0;
  $: isMobile = outerWidth < 1280;
</script>

<svelte:window bind:outerWidth />
{#if variantCategory}
  <a
    data-sveltekit-preload-data
    class="simple-container"
    href={`./${variantCategory.Id}`}
  >
    <div class="position-img">
      <ImageLoader
        src={`${PUBLIC_BUCKET_URL}/${variantCategory.Description}${
          isAvifSupported ? "-avif" : ""
        }`}
        alt={`${variantCategory.Name}`}
      />
    </div>
    <h3 class="basic-header">{`${variantCategory.Name}`}</h3>
    <h3>Individually priced</h3>
  </a>
{/if}

{#if product}
  {#if showDetailedView}
    <DetailedSingleProduct {product} {productDescription} {isMobile} />
  {:else}
    <a
      data-sveltekit-preload-data
      class="simple-container"
      href={`/shop/product/${product.Id}`}
    >
      {#if product.CurrentStock === 1}
        <div style:position="relative">
          <img
            class="low-in-stock-img"
            src={lowInStockTeal}
            alt="this product is low in stock"
          />
        </div>
      {/if}
      {#if product.CurrentStock <= 0}
        <div style:position="relative">
          <img
            class="low-in-stock-img"
            src={outOfStockOrange}
            alt="this product is out of stock"
          />
        </div>
      {/if}
      <div class="position-img">
        <ImageLoader
          src={product?.ProductImages[0]?.ImageUrl
            ? `${PUBLIC_BUCKET_URL}/${getImageFilename(
                product.ProductImages[0].ImageUrl
              )}${isAvifSupported ? "-avif" : ""}`
            : comingSoon}
          alt={`${product.Name}`}
        />
      </div>
      <div class="prod-details">
        <h3 class="simple-prod-name">
          {`${product.Name}`}
        </h3>
        <h3 data-testid="sale-price">
          {`£${product.SalePrice.toFixed(2)}`}
        </h3>
      </div>
    </a>
  {/if}
{/if}

<style>
  .simple-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
    border-radius: 0.25em;
    margin: 4%;
    height: 250px;
    width: 250px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    padding: 0.2em;
  }

  .simple-container {
    justify-content: center;
  }

  .simple-container:hover {
    transform: scale(1.06);
    box-shadow: 0 3px 65px rgb(0 0 0 / 0.2);
  }

  .position-img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
    width: 80%;
    margin: 1.2em;
  }

  .basic-header {
    margin-top: 1em;
    margin-bottom: 0.8em;
  }

  .simple-prod-name {
    margin-bottom: 0;
  }

  .prod-details {
    margin-top: 1.2em;
  }

  .low-in-stock-img {
    position: absolute;
    right: 45px;
    height: 33.8px;
    width: 30px;
  }

  h3 {
    display: block;
    font-size: 0.7em;
    margin-top: 0;
    text-align: center;
  }

  h3,
  a {
    font-family: "Caviar Dreams";
    color: black;
  }

  a:hover {
    text-decoration: none;
  }

  @media (min-width: 360px) {
    .simple-container {
      height: 150px;
      width: 150px;
      padding: 0.5em;
    }

    .prod-details {
      margin-top: 0.85em;
    }

    .position-img {
      margin: 0em;
    }

    h3 {
      font-size: 0.6em;
    }
  }

  @media (min-width: 700px) {
    .simple-container {
      height: 280px;
      width: 280px;
    }

    .low-in-stock-img {
      right: 100px;
      height: 50.27px;
      width: 45px;
    }

    h3 {
      font-size: 1.2em;
    }
  }

  @media (min-width: 960px) {
    .simple-container {
      height: 400px;
      width: 400px;
    }

    .low-in-stock-img {
      right: 140px;
      height: 61.44px;
      width: 55px;
    }
  }

  @media (min-width: 1280px) {
    .simple-container {
      height: 365px;
      width: 365px;
    }

    .low-in-stock-img {
      right: 120px;
      height: 61.44px;
      width: 55px;
    }
  }

  @media (min-width: 1600px) {
    .simple-container {
      height: 340px;
      width: 340px;
    }
  }

  @media (min-width: 2000px) {
    .simple-container {
      height: 450px;
      width: 450px;
    }

    .low-in-stock-img {
      right: 150px;
      height: 72.61px;
      width: 65px;
    }
  }
</style>
