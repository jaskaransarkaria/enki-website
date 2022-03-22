<script context="module" lang="ts">
	import { refreshCategoriesFromServer } from '$lib/utils/requests';
	import type { Base } from '$lib/types/base';

	const orderCategories = (resp: Base[]) =>
		resp.sort((a: Base, b: Base) => (a.Name < b.Name ? -1 : 1));

  export async function load({ fetch }) {
		// pull the category data from api
			const result = await refreshCategoriesFromServer(`${import.meta.env.VITE_SERVER_URL}/categories`, fetch);
    return {
      props: {
        data: orderCategories([...result])
      }
    };
  }

  export const prerender = true;
  export const browser = true;
</script>

<script lang="ts">
	import RootCategories from '$lib/components/RootCategories/RootCategories.svelte';

  export let data;
</script>

<RootCategories {data} />
