<script lang="ts">
  import { page } from "$app/stores";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";

  import type { Base, BaseFn } from "$lib/types/base";

  export let data: { data: Base[] } = { data: [] };

  const whitelistedUserAgent = $page.data.whitelistedUserAgent;
  const queryParams = $page.url.toString().split("?")[1];

  const categoryFn: BaseFn = (category: Base) =>
    `${$page.url.toString().split("?")[0]}/category/${category.Id}${
      queryParams ? "?" + queryParams : ""
    }`;
</script>

<HexGrid data={data.data} {categoryFn} {whitelistedUserAgent} />
