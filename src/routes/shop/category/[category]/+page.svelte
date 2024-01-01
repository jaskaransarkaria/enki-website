<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import CategoryView from "$lib/components/CategoryView/CategoryView.svelte";

  import type { Base } from "$lib/types/base";

  const tags = $page.data.tags;

  $: categoryToShow = $page.data.categoryToShow;
  $: productArr = $page.data.productArr;
  $: selectCategory = (category: Base) => `/shop/category/${category.Id}`;
</script>

<svelte:head>
  <title>{`Enki - ${categoryToShow.Name}`}</title>
  <meta property="og:title" content={`Enki - ${categoryToShow.Name}`} />
  <meta property="og:url" content={$page.url.toString()} />
  <meta
    property="og:image"
    content={`${PUBLIC_BUCKET_URL}/${categoryToShow.Description}`}
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content={`Shop at Enki for gifts in the ${categoryToShow.Name} category`}
  />
  <meta property="og:locale" content="en_GB" />
</svelte:head>

<CategoryView
  categoryFn={selectCategory}
  {categoryToShow}
  whitelistedUserAgent={$page.data.whitelistedUserAgent}
  {productArr}
  {tags}
/>
