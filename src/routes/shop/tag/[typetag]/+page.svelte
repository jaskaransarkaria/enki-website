<script lang="ts">
  import { page } from "$app/stores";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";

  const categoryId = parseInt($page.url.searchParams.get("catid"), 10);
</script>

<svelte:head>
  <meta property="og:title" content="Enki" />
  <meta property="og:url" content={$page.url.toString()} />
  <meta
    property="og:image"
    content={`https://enki.imgix.net/${$page.url.searchParams.get(
      "catid"
    )}?auto=format,compress`}
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content={`Shop at Enki for gifts in the ${$page.url.searchParams.get(
      "tagid"
    )} category`}
  />
  <meta property="og:locale" content="en_GB" />
</svelte:head>

{#if Boolean(categoryId)}
  <Breadcrumbs
    selectedCategoryId={categoryId}
    extraCrumbs={[
      {
        Name: $page.params.typetag.split("-")[1],
        Id: parseInt($page.url.searchParams.get("tagid"), 0),
        tagUrl: $page.url.toString(),
        params: `?catId=${$page.url.searchParams.get(
          "catid"
        )}&tagid=${$page.url.searchParams.get("tagid")}`,
      },
    ]}
  />
{/if}

<ProductView productArr={$page.data.data} />
