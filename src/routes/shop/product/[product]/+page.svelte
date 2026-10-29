<script lang="ts">
  import { onMount } from "svelte";
  import { CLIENT_API_BASE } from "#lib/utils/setServerUrl.js";
  import { page } from "$app/state";
  import { SITE_URL } from "#lib/constants.js";
  import { productDescription, productTitle } from "#lib/utils/seo.js";
  import {
    breadcrumbJsonLd,
    jsonLdScript,
    productImageUrls,
    productJsonLd,
  } from "#lib/utils/structuredData.js";
  import { products } from "#lib/stores/products.js";
  import comingSoon from "#lib/assets/coming_soon.png";
  import Banner from "#lib/components/Banner/Banner.svelte";
  import SingleProduct from "#lib/components/SingleProduct/SingleProduct.svelte";
  import Breadcrumbs from "#lib/components/Breadcrumbs/Breadcrumbs.svelte";

  import type { SquareProduct } from "#lib/types/product.js";
  import LoadingSpinner from "#lib/components/LoadingSpinner/LoadingSpinner.svelte";

  let productToShow: readonly SquareProduct[] = $state(page.data.productToShow);

  // Use the image the page actually shows (variation-level), not the
  // product-level field, which is empty for most items.
  const ogImage = $derived(
    productToShow[0]
      ? (productImageUrls(productToShow[0])[0] ?? `${SITE_URL}${comingSoon}`)
      : `${SITE_URL}${comingSoon}`,
  );

  onMount(async () => {
    if (productToShow.length < 1) {
      const productId = page.url.pathname.split("/").at(-1);
      productToShow = [$products?.find((p) => p.id === productId)].filter(
        (p) => p !== undefined,
      );

      if (productToShow.length < 1) {
        const res = await fetch(`${CLIENT_API_BASE}/product?id=${productId}`);
        if (res.ok) {
          const data = await res.json();
          productToShow = Array.isArray(data) ? data : [];
        }
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
  <meta property="og:image" content={ogImage} />
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

{#if productToShow.length}
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
