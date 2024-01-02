<script lang="ts">
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import TagFlex from "$lib/components/TagFlex/TagFlex.svelte";

  import type { Tag } from "$lib/types/tag";
  import type { Category } from "$lib/types/category";

  export let data: Category[] = [];
  export let prefix = "";
  export let showHex = true;
  export let tags: readonly Tag[] = [];

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
  <HexGrid data={[...data, ...treatedTags]} />
{:else}
  <TagFlex data={[...treatedTags]} />
{/if}
