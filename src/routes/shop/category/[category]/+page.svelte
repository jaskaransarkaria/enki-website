<script lang="ts">
  import { PUBLIC_BUCKET_URL, PUBLIC_SERVER_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import CategoryView from "$lib/components/CategoryView/CategoryView.svelte";
  import { onMount } from "svelte";
  import { readonlyAllCategories } from "$lib/stores/categories";
  import { refreshCategories } from "$lib/utils/requests";

  let loadingFromStore: boolean = $page.data.loadingFromStore;

  $: categoryToShow = $page.data.categoryToShow;
  $: productArr = $page.data.productArr;

  $: imgHash = decodeURIComponent($page.url.searchParams.get("imgHash"));
  $: name = decodeURIComponent($page.url.searchParams.get("name"));

  $: catId = $page.url.pathname.split("/").at(-1).split("?").at(0);

  $: {
    if (categoryToShow.length < 1 && $readonlyAllCategories.length > 0) {
      categoryToShow = recursiveCatSearch(catId, $readonlyAllCategories, {});

      categoryToShow.children.sort(
        (a, b) =>
          a.category_data.parent_category.ordinal -
          b.category_data.parent_category.ordinal
      );
    }
  }

  const recursiveCatSearch = (id, arr, res) => {
    for (const c of arr) {
      if (!c.children) {
        c.children = [];
      }

      if (c?.id === id) {
        return c;
      }

      res = recursiveCatSearch(id, c.children, res);
    }
    return res;
  };

  onMount(async () => {
    if (!$readonlyAllCategories?.length) {
      const result = await refreshCategories(`${PUBLIC_SERVER_URL}/categories`);
      readonlyAllCategories.set([...result]);
    }
  });
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
  {loadingFromStore}
/>
