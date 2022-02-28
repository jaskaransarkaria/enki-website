<script lang="ts">
  import HexGrid from '@/components/HexGrid/HexGrid.svelte';

  import type { Category } from '@/types/category';
  import type { BaseFn } from '@/types/base';

  export let data: Category[] = [];
  export let categoryFn: BaseFn;

  $: shopByType = data.filter(
    (cat: Category) =>
      cat.Name.toLowerCase() === 'fine jewellery' ||
      cat.Name.toLowerCase() === 'costume jewellery'
  );
  $: shopByArtist = data.filter(
    (cat: Category) =>
      cat.Name.toLowerCase() !== 'fine jewellery' &&
      cat.Name.toLowerCase() !== 'costume jewellery'
  );
</script>

<h1>Shop by artist</h1>
<HexGrid data={shopByArtist} {categoryFn} />
<h1>Shop by type</h1>
<HexGrid data={shopByType} {categoryFn} showFullPage={false} />

<style>
  h1 {
    position: relative;
    display: block;
    flex-direction: column;
    grid-row: 1;
    grid-column: 2;
    text-align: center;
    font-family: 'Welcomehome3 Regular';
  }
</style>
