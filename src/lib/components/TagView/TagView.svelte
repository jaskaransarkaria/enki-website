<script lang="ts">
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import TagFlex from "$lib/components/TagFlex/TagFlex.svelte";
  import isCategory from "$lib/types/isCategory";

  import type { Tag } from "$lib/types/tag";
  import type { Category } from "$lib/types/category";
  import type { BaseFn, Base } from "$lib/types/base";

  export let data: Category[] = [];
  export let categoryId: number = 0;
  export let categoryFn: BaseFn = () => undefined;
  export let prefix = "";
  export let showHex = true;
  export let tags: readonly Tag[] = [];

  const selectFn: BaseFn = <T extends Base>(cat: T) => {
    // if category selected goto category page as usual
    if (isCategory(cat)) {
      return categoryFn(cat);
    }
    // if tag selected display relevant products on tag page
    if (isTag(cat)) {
      return `/shop/tag/${cat.Name.toLowerCase()}?catid=${categoryId}&tagid=${
        cat.Id
      }`;
    }
  };

  const isTag = (group: unknown): group is Tag => "TagTypeId" in (group as Tag);

  $: treatedTags = tags
    ?.filter((tag: Tag) => !tag.Name.includes("SOR "))
    ?.filter((tag: Tag) => tag.Name.includes(prefix))
    // order alphabetically z to a
    ?.sort((tagA: Tag, tagB: Tag) => {
      if (tagA.Name < tagB.Name) {
        return 1;
      }
      if (tagA.Name > tagB.Name) {
        return -1;
      }

      return 0;
    });
</script>

{#if showHex}
  <HexGrid data={[...data, ...treatedTags]} categoryFn={selectFn} />
{:else}
  <TagFlex data={[...treatedTags]} categoryFn={selectFn} />
{/if}
