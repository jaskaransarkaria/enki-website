<script lang="typescript">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import HexGrid from '@/components/HexGrid/HexGrid.svelte';
  import { refreshTags } from '@/libs/requests';

  import type { Tag } from '@/types/tag';
  import type { Category } from '@/types/category';
  import type { BaseFn, Base } from '@/types/base';

  export let categoryId: number;
  export let data: Category[];
  export let categoryFn: BaseFn;

  let tags: readonly Tag[] = [];

  onMount(async () => {
    await fetchAllTags();
  });

  const selectFn: BaseFn = <T extends Base>(cat: T) => {
    // if category selected goto category page as usual
    if (isCategory(cat)) {
      categoryFn(cat);
    }
    // if tag selected display relevant products on tag page
    if (isTag(cat)) {
      $goto(`/online-shop/tag/${cat.Name}`, {
        catId: categoryId,
        tagId: cat.Id,
      });
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
