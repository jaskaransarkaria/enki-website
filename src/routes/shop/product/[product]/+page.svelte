<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_BUCKET_URL, PUBLIC_SERVER_URL } from "$env/static/public";
  import { page } from "$app/state";
  import { productDescription, productTitle } from "$lib/utils/seo";
  import {
    breadcrumbJsonLd,
    jsonLdScript,
    productJsonLd,
  } from "$lib/utils/structuredData";
  import { products } from "$lib/stores/products";
  import comingSoon from "$lib/assets/coming_soon.png";
  import Banner from "$lib/components/Banner/Banner.svelte";
  import SingleProduct from "$lib/components/SingleProduct/SingleProduct.svelte";
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";

  import type { SquareProduct } from "$lib/types/product";
  import LoadingSpinner from "$lib/components/LoadingSpinner/LoadingSpinner.svelte";

  let productToShow: readonly SquareProduct[] = $state(page.data.productToShow);

  onMount(async () => {
    if (productToShow.length < 1) {
      const productId = page.url.pathname.split("/").at(-1);
      productToShow = [$products?.find((p) => p.id === productId)].filter(
        (p) => p !== undefined,
      );

      if (productToShow.length < 1) {
        const res = await fetch(`${PUBLIC_SERVER_URL}/product?id=${productId}`);
        productToShow = await res.json();
      }
    }
  });
</script>

<svelte:head>
  <title>{productTitle(productToShow[0]?.item_data?.name)}</title>
  <meta
    name="description"
    content={productDescription(productToShow[0]?.item_data?.description_html)}
  />
  <meta
    property="og:title"
    content={productTitle(productToShow[0]?.item_data?.name)}
  />
  <meta
    property="og:description"
    content={productDescription(productToShow[0]?.item_data?.description_html)}
  />
  <meta
    property="og:image"
    content={`${PUBLIC_BUCKET_URL}/${
      productToShow[0]?.custom_attribute_values.image_arr.string_value.split(
        ",",
      )[0]
        ? productToShow[0]?.custom_attribute_values.image_arr.string_value.split(
            ",",
          )[0]
        : comingSoon
    }`}
  />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_GB" />
  {#if productToShow[0]}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html jsonLdScript(productJsonLd(productToShow[0]))}
  {/if}
  {#if page.data.breadcrumbTrail?.length}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html jsonLdScript(breadcrumbJsonLd(page.data.breadcrumbTrail))}
  {/if}
</svelte:head>

{#if productToShow.length || page.data.whitelistedUserAgent}
  <Banner hasProducts />
  <Breadcrumbs
    selectedCategoryId={productToShow[0].item_data.categories[0].id}
  />
  <div>
    <SingleProduct product={productToShow[0]} showDetailedView />
  </div>
{:else}
  <div>
    <LoadingSpinner />
  </div>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3em;
  }
</style>
