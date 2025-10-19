<script lang="ts">
  import { PUBLIC_BUCKET_URL, PUBLIC_SERVER_URL } from "$env/static/public";
  import { page } from "$app/state";
  import CategoryView from "$lib/components/CategoryView/CategoryView.svelte";
  import { onMount } from "svelte";
  import { readonlyAllCategories } from "$lib/stores/categories";
  import { refreshCategories } from "$lib/utils/requests";
  import type { SquareCategory } from "$lib/types/category";

  let loadingFromStore: boolean = page.data.loadingFromStore;

  let categoryToShow = $derived(page.data.categoryToShow);
  let productArr = $derived(page.data.productArr);

  let imgHash = $derived(
    decodeURIComponent(page.url.searchParams.get("imgHash") ?? ""),
  );
  let name = $derived(
    decodeURIComponent(page.url.searchParams.get("name") ?? ""),
  );

  let catId = $derived(
    page.url.pathname.split("/")?.at(-1)?.split("?")?.at(0) ?? "",
  );

  $effect(() => {
    if (categoryToShow.length < 1 && $readonlyAllCategories.length > 0) {
      categoryToShow = recursiveCatSearch(
        catId,
        $readonlyAllCategories,
        {} as SquareCategory,
      );

      categoryToShow.children.sort(
        (a: SquareCategory, b: SquareCategory) =>
          a.category_data.parent_category.ordinal -
          b.category_data.parent_category.ordinal,
      );
    }
  });

  const recursiveCatSearch = (
    id: string,
    arr: readonly SquareCategory[],
    res: SquareCategory,
  ) => {
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
  <meta property="og:url" content={page.url.toString()} />
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
  whitelistedUserAgent={page.data.whitelistedUserAgent}
  {productArr}
  {loadingFromStore}
/>
