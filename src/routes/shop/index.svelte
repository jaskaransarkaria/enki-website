<script context="module" lang="ts">
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import { refreshCategoriesFromServer } from "$lib/utils/requests";
  import type { Base, BaseFn } from "$lib/types/base";

  const orderCategories = (resp: Base[]) =>
    resp.sort((a: Base, b: Base) => (a.Name < b.Name ? -1 : 1));

  export async function load({ fetch }) {
    // pull the category data from api
    const result = await refreshCategoriesFromServer(
      `${import.meta.env.VITE_SERVER_URL}/categories`,
      fetch
    );
    return {
      props: {
        data: orderCategories([...result]),
      },
    };
  }

  export const prerender = true;
</script>

<script lang="ts">
  import { page } from "$app/stores";

  export let data: Base[];
  const categoryFn: BaseFn = (category: Base) =>
    `${$page.url}/category/${category.Id}`;
</script>

<HexGrid {data} {categoryFn} />
