<script context="module" lang="ts">
  import { refreshProductsFromServer } from "$lib/utils/requests";
  import { searchProducts } from "$lib/utils/search";

  export async function load({ fetch, url }) {
    // pull the category data from api
    const result = await refreshProductsFromServer(
      `${import.meta.env.VITE_SERVER_URL}/get-all-products`,
      fetch
    );

    const reg = new RegExp(
      `\\b${decodeURIComponent(url.searchParams.get("search-term"))}`,
      "i"
    );
    const data = searchProducts(reg, result);

    return {
      props: {
        data,
      },
    };
  }

  export const router = false;
</script>

<script lang="ts">
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import { page } from "$app/stores";

  import type { Product } from "$lib/types/product";

  export let data: readonly Product[];
</script>

<svelte:head>
  <title
    >{`Enki - Search Results: ${$page.url.searchParams.get(
      "search-term"
    )}`}</title
  >
  {#if data.length}
    <meta
      property="og:title"
      content={`Enki - Search Results: ${$page.url.searchParams.get(
        "search-term"
      )}`}
    />
    <meta property="og:url" content={$page.url.toString()} />
    <meta
      property="og:image"
      content={`https://enki.imgix.net/${data[0].Id}-0?auto=format,compress`}
    />
    <meta property="og:type" content="website" />
    <meta
      property="og:description"
      content={`Shop at Enki for gifts that match the search: ${$page.url.searchParams.get(
        "search-term"
      )}`}
    />
    <meta property="og:locale" content="en_GB" />
  {/if}
</svelte:head>

<h2>
  we found {data.length} results for "{decodeURIComponent(
    $page.url.searchParams.get("search-term")
  ).toLowerCase()}"
</h2>
{#if data.length}
  <ProductView productArr={data} />
{/if}

<style>
  h2 {
    margin-top: 40%;
    text-align: center;
    font-family: "Caviar Dreams";
  }

  @media (min-width: 360px) {
    h2 {
      margin-top: 37.5%;
    }
  }

  @media (min-width: 700px) {
    h2 {
      margin-top: 12%;
    }
  }

  @media (min-width: 1600px) {
    h2 {
      margin-top: 6%;
    }
  }

  @media (min-width: 1960px) {
    h2 {
      margin-top: 6%;
    }
  }
</style>
