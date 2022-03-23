<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import HexGrid from '$lib/components/HexGrid/HexGrid.svelte';
	import { refreshTags } from '$lib/utils/requests';

	import type { Tag } from '$lib/types/tag';
	import type { Category } from '$lib/types/category';
	import type { BaseFn, Base } from '$lib/types/base';

	export let data: Category[] = [];
	export let categoryId: number;
	export let categoryFn: BaseFn;
	export let prefix = '';

	let tags: readonly Tag[] = [];

	onMount(async () => {
		await fetchAllTags();
	});

	const selectFn: BaseFn = <T extends Base>(cat: T) => {
		// if category selected goto category page as usual
		if (isCategory(cat)) {
			return categoryFn(cat);
		}
		// if tag selected display relevant products on tag page
		if (isTag(cat)) {
			return `/shop/tag/${cat.Name.toLowerCase()}?catid=${categoryId}&tagid=${cat.Id}`;
		}
	};

	const isCategory = (group: unknown): group is Category => 'Children' in (group as Category);

	const isTag = (group: unknown): group is Tag => 'TagTypeId' in (group as Tag);

	const fetchAllTags = async () => {
		tags = await refreshTags(`${import.meta.env.VITE_SERVER_URL}/tags`);
	};

	$: treatedTags = tags
		.filter((tag: Tag) => !tag.Name.includes('SOR '))
		.filter((tag: Tag) => tag.Name.includes(prefix))
</script>

<HexGrid data={[...data, ...treatedTags]} categoryFn={selectFn} />
