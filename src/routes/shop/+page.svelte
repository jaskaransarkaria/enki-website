<script lang="ts">
  import { page } from "$app/stores";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import { readonlyAllCategories } from "$lib/stores/categories";

  import type { BaseFn } from "$lib/types/base";
  import type { SquareCategory } from "$lib/types/category";
  import { onMount } from "svelte";

  export let data: { data: SquareCategory[] } = { data: [] };

  const whitelistedUserAgent = $page.data.whitelistedUserAgent;
  const queryParams = $page.url.toString().split("?")[1];

  const categoryFn: BaseFn = (category: SquareCategory) =>
    `${$page.url.toString().split("?")[0]}/category/${category.id}${
      queryParams ? "?" + queryParams : ""
    }`;

  onMount(async () => {
    readonlyAllCategories.set(data.data);
  });
</script>

<svelte:head>
  <title>{"Enki - Shop"}</title>
</svelte:head>

<HexGrid data={data.data} {categoryFn} {whitelistedUserAgent} />
