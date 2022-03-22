<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import HexGrid from '$lib/components/HexGrid/HexGrid.svelte';
	import { categories, readonlyAllCategories } from '$lib/stores/categories';

	import type { Category } from '$lib/types/category';
	import type { Base, BaseFn } from '$lib/types/base';

	export let data: Base[];

	const categoryFn: BaseFn = (category: Base) => {
		categories.set(category as Category);
		goto(`${$page.url}/category/${category.Id}`);
	};
</script>

<svelte:head>
	{#if $readonlyAllCategories && $readonlyAllCategories.length === 0}
		<link
			rel="preload"
			as="fetch"
			href={`${import.meta.env.VITE_SERVER_URL}/categories`}
			crossorigin="anonymous"
		/>
	{/if}
</svelte:head>

<HexGrid {data} {categoryFn} />
