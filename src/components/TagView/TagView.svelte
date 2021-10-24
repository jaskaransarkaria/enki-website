<script lang="typescript">
  import { onMount } from 'svelte';
  import HexGrid from '@/components/HexGrid/HexGrid.svelte';
  import { refreshTags } from '@/libs/requests';

  import type { Tag } from '@/types/tag';
  import type { Category } from '@/types/category';
  import type { BaseFn, Base } from '@/types/base';

  export let data: Category[];
  export let categoryFn: BaseFn;

  let tags: readonly Tag[] = [];

  onMount(async () => {
    await fetchAllTags();
  });

  const selectFn: BaseFn = <T extends Base>(cat: T) => {
    // if tag selected show serach results from tags
    // if category selected goto category page as usual
    if (isCategory(cat)) {
      categoryFn(cat);
    }

    if (isTag(cat)) {
      console.log('woo', cat);
    }
  };

  const isCategory = (group: unknown): group is Category =>
    (group as Category).Children !== undefined;

  const isTag = (group: unknown): group is Tag =>
    (group as Tag).TagTypeId !== undefined;

  const fetchAllTags = async () => {
    tags = await refreshTags(`${process.env.SERVER_URL}/tags`);
  };
</script>

<HexGrid data={[...tags, ...data]} categoryFn={selectFn} />
