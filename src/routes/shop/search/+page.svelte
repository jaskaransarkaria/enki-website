<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import { getImageFilename } from "$lib/utils/getImageFilename";
</script>

<svelte:head>
  <title
    >{`Enki - Search Results: ${$page.url.searchParams.get(
      "search-term"
    )}`}</title
  >
  {#if $page.data.data.length}
    <meta
      property="og:title"
      content={`Enki - Search Results: ${$page.url.searchParams.get(
        "search-term"
      )}`}
    />
    <meta property="og:url" content={$page.url.toString()} />
    <meta
      property="og:image"
      content={`${PUBLIC_BUCKET_URL}/${
        $page.data.data[0]?.ProductImages[0]?.ImageUrl
          ? getImageFilename($page.data.data[0]?.ProductImages[0]?.ImageUrl)
          : "/coming-soon.png"
      }`}
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
  We found {$page.data.data.length} results for "{decodeURIComponent(
    $page.url.searchParams.get("search-term")
  ).toLowerCase()}"
</h2>
{#if $page.data.data.length}
  <ProductView productArr={$page.data.data} sorted />
{/if}

<style>
  h2 {
    text-align: center;
    font-family: "Caviar Dreams";
  }
</style>
