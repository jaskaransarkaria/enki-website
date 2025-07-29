<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import comingSoon from "$lib/assets/coming_soon.png";
  import AddToBasket from "$lib/components/AddToBasket/AddToBasket.svelte";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";

  import type { SquareProduct, VariationData } from "$lib/types/product";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  export let product: SquareProduct;
  export let isMobile: boolean;

  const createImgArr = (
    parentProduct: SquareProduct,
    product: VariationData
  ): { src: string; alt: string }[] =>
    product?.custom_attribute_values?.image_arr.string_value.length > 0 &&
    product?.custom_attribute_values?.image_arr.string_value.includes(",") &&
    product?.custom_attribute_values?.image_arr.string_value.split(",").length >
      0
      ? product.custom_attribute_values.image_arr.string_value
          .split(",")
          .map((img, idx) => ({
            src: `${PUBLIC_BUCKET_URL}/${img}${isAvifSupported ? "-avif" : ""}`,
            alt: `${parentProduct.item_data.name} image ${idx + 1}`,
          }))
      : [
          {
            src:
              product?.custom_attribute_values.image_arr.string_value.length > 0
                ? `${PUBLIC_BUCKET_URL}/${
                    product?.custom_attribute_values.image_arr.string_value
                  }${isAvifSupported ? "-avif" : ""}`
                : comingSoon,
            alt: `${parentProduct.item_data.name} image 1`,
          },
        ];

  let clientWidth: number = 0;

  let selectedProductVariation = product.item_data.variations[0];
</script>

{#if isMobile}
  <div class="details-container">
    {#if selectedProductVariation.custom_attribute_values.image_arr.string_value.length > 0 && selectedProductVariation.custom_attribute_values.image_arr.string_value.split(",").length > 0}
      <div
        class="mobile-img-container"
        data-testid="mobile-img-container"
        style:width={clientWidth ? clientWidth + "px" : "90vw"}
      >
        <SwipeImage imgArr={createImgArr(product, selectedProductVariation)} />
      </div>
    {/if}
    <div class="detailed-products-footer">
      {#if product.item_data.variations.length > 1}
        <select
          role="combobox"
          name="variations"
          id="variations"
          bind:value={selectedProductVariation}
        >
          {#each product.item_data.variations as v}
            <option value={v}
              >{product.item_data.name} -- {v.item_variation_data.name}</option
            >
          {/each}
        </select>
      {/if}
      <h2>
        {`${product.item_data.name}`}
      </h2>
      <h4>
        {`£${(
          selectedProductVariation.item_variation_data.price_money.amount / 100
        ).toFixed(2)}`}
      </h4>
      <div class="mobile-details">
        {#if parseInt(selectedProductVariation.item_variation_data.quantity, 10) > 0}
          <AddToBasket
            {product}
            variation={selectedProductVariation}
            detailed
          />
        {/if}
        <h4>
          {`${
            ("quantity" in selectedProductVariation.item_variation_data
              ? parseInt(
                  selectedProductVariation.item_variation_data.quantity,
                  10
                )
              : 0) <= 0
              ? "sold out"
              : selectedProductVariation.item_variation_data?.quantity +
                " in stock"
          }`}
        </h4>
      </div>
    </div>
    <div class="description-html">
      {@html product.item_data.description_html}
    </div>
  </div>
{:else}
  <div class="details-container">
    <div class="desktop-left-container">
      <div class="desktop-img-container" data-testid="desktop-img-container">
        <SwipeImage imgArr={createImgArr(product, selectedProductVariation)} />
      </div>
    </div>
    <div class="detailed-products-footer">
      <h2>
        {`${product.item_data.name}`}
      </h2>

      <h4>
        {`£${(
          selectedProductVariation.item_variation_data.price_money.amount / 100
        ).toFixed(2)}`}
      </h4>
      <div class="description-html">
        {@html product.item_data.description_html}
      </div>
      <h5>
        {`${
          ("quantity" in selectedProductVariation.item_variation_data
            ? parseInt(
                selectedProductVariation.item_variation_data.quantity,
                10
              )
            : 0) <= 0
            ? "sold out"
            : selectedProductVariation.item_variation_data?.quantity +
              " in stock"
        }`}
      </h5>
      {#if product.item_data.variations.length > 1}
        <select
          role="combobox"
          name="variations"
          id="variations"
          bind:value={selectedProductVariation}
        >
          {#each product.item_data.variations as v}
            <option value={v}
              >{product.item_data.name} -- {v.item_variation_data.name}</option
            >
          {/each}
        </select>
        <br />
      {/if}
      {#if parseInt(selectedProductVariation.item_variation_data.quantity, 10) > 0}
        <AddToBasket {product} variation={selectedProductVariation} detailed />
      {/if}
    </div>
  </div>
{/if}

<style>
  h2,
  h4,
  h5 {
    font-family: "Caviar Dreams";
  }

  .description-html :global {
    font-family: "Caviar Dreams";
  }

  .description {
    margin-bottom: 0;
    font-weight: lighter;
    margin-top: 0em;
  }

  .details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    border-radius: 0.25em;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    justify-content: auto;
    justify-self: auto;
    text-align: left;
    cursor: auto;
  }

  .detailed-products-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    margin: 0.6em;
  }

  .detailed-products-footer > * {
    display: inline;
  }

  .mobile-img-container {
    display: flex;
    justify-content: center;
  }

  .mobile-details {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .mobile-prod-name {
    margin-top: 1em;
    margin-bottom: 0;
  }

  @media (min-width: 360px) {
    .detailed-products-footer {
      margin: 0.8em;
    }
  }

  @media (min-width: 700px) {
    h2 {
      font-size: 2em;
      justify-self: start;
    }

    h4 {
      font-size: 1em;
    }

    .detailed-products-footer {
      width: 50%;
      justify-content: space-between;
      margin: auto;
    }

    .mobile-prod-name {
      margin-top: 2em;
    }
  }

  @media (min-width: 960px) {
    h4 {
      font-size: 1.25em;
    }
  }

  @media (min-width: 1280px) {
    h2,
    h4,
    h5 {
      text-align: start;
    }

    h5 {
      font-size: 1em;
    }

    h2 {
      margin-bottom: 0em;
    }

    .details-container {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      align-self: flex-start;
    }

    .desktop-left-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 4%;
    }

    .desktop-img-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
      border-radius: 0.25em;
      margin: 4%;
      width: 30vw;
      height: 30vw;
    }

    .detailed-products-footer {
      width: 30%;
      flex-direction: column;
      height: 100%;
      margin: 2em;
      margin-top: 4%;
    }
  }

  @media (min-width: 1600px) {
    .details-container {
      align-items: flex-start;
      justify-content: center;
    }
  }
</style>
