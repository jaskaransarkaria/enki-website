<script lang="ts">
  import { page } from "$app/state";
  import HexGrid from "#lib/components/HexGrid/HexGrid.svelte";
  import { readonlyAllCategories } from "#lib/stores/categories.js";

  import type { BaseFn } from "#lib/types/base.js";
  import type { SquareCategory } from "#lib/types/category.js";
  import { onMount } from "svelte";

  interface Props {
    data?: { data: SquareCategory[] };
  }

  let { data = { data: [] } }: Props = $props();
  const queryParams = page.url.toString().split("?")[1];
  const categoryFn: BaseFn = (category: SquareCategory) =>
    `${page.url.toString().split("?")[0]}/category/${category.id}${queryParams ? "?" + queryParams : ""}`;

  onMount(async () => {
    readonlyAllCategories.set(data.data);
  });
</script>

<svelte:head>
  <title>Shop Gifts Online | Enki, Kings Heath Birmingham</title>
  <meta
    name="description"
    content="Gifts, homeware, toys, books and jewellery from UK makers, chosen by our Kings Heath shop. Free UK delivery on orders over £40."
  />
  <meta
    property="og:title"
    content="Shop Gifts Online | Enki, Kings Heath Birmingham"
  />
  <meta
    property="og:description"
    content="Gifts, homeware, toys, books and jewellery from UK makers, chosen by our Kings Heath shop. Free UK delivery on orders over £40."
  />
</svelte:head>

<HexGrid data={data.data} {categoryFn} />
