<script lang="ts">
  import { page } from "$app/state";
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import comingSoon from "$lib/assets/coming_soon.png";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import { products } from "$lib/stores/products";

  $effect(() => {
    products.set(page.data.data);
  });
</script>

<svelte:head>
  <title
    >{`Enki - Search Results: ${page.url.searchParams.get(
      "search-term",
    )}`}</title
  >
  {#if page.data.data.length}
    <meta
      property="og:title"
      content={`Enki - Search Results: ${page.url.searchParams.get(
        "search-term",
      )}`}
    />
    <meta property="og:url" content={page.url.toString()} />
    <meta
      property="og:image"
      content={`${PUBLIC_BUCKET_URL}/${
        page.data.data[0]?.custom_attribute_values.image_arr.string_value
          .length > 0
          ? page.data.data[0]?.custom_attribute_values.image_arr.string_value.split(
              ",",
            )[0]
          : comingSoon
      }`}
    />
    <meta property="og:type" content="website" />
    <meta
      property="og:description"
      content={`Shop at Enki for gifts that match the search: ${page.url.searchParams.get(
        "search-term",
      )}`}
    />
    <meta property="og:locale" content="en_GB" />
  {/if}
</svelte:head>

<h2>
  We found {page.data.data.length} results for "{decodeURIComponent(
    page.url.searchParams.get("search-term"),
  )?.toLowerCase()}"
</h2>
{#if page.data.data.length}
  <ProductView productArr={page.data.data} sortBy="relevant" sorted />
{/if}

<style>
  h2 {
    text-align: center;
    font-family: "Caviar Dreams";
  }
</style>
