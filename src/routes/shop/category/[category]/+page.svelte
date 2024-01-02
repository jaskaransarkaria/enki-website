<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import CategoryView from "$lib/components/CategoryView/CategoryView.svelte";

  const tags = $page.data.tags;

  $: categoryToShow = $page.data.categoryToShow;
  $: productArr = $page.data.productArr;

  $: imgHash = decodeURIComponent($page.url.searchParams.get("imgHash"));
  $: name = decodeURIComponent($page.url.searchParams.get("name"));
</script>

<svelte:head>
  <title>{`Enki - ${name}`}</title>
  <meta property="og:title" content={`Enki - ${name}`} />
  <meta property="og:url" content={$page.url.toString()} />
  <meta property="og:image" content={`${PUBLIC_BUCKET_URL}/${imgHash}`} />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content={`Shop at Enki for gifts in the ${name} category`}
  />
  <meta property="og:locale" content="en_GB" />
</svelte:head>

<CategoryView
  {categoryToShow}
  whitelistedUserAgent={$page.data.whitelistedUserAgent}
  {productArr}
  {tags}
/>
