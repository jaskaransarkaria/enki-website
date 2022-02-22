<script lang="typescript">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { refreshCategories } from '@/libs/requests';
  import HexGrid from '@/components/HexGrid/HexGrid.svelte';
  import { categories, readonlyAllCategories } from '@/stores/categories';

  import type { Category } from '@/types/category';
  import type { Base, BaseFn } from '@/types/base';

  let data: Base[] = [];

  const orderCategories = (resp: Base[]) =>
    resp.sort((a: Base, b: Base) => (a.Name < b.Name ? -1 : 1));

  const categoryFn: BaseFn = /*istanbul ignore next*/ (category: Base) => {
    categories.set(category as Category);
    $goto(`./${category.Id}`);
  };

  onMount(async () => {
    // pull the category data from api
    if ($readonlyAllCategories && $readonlyAllCategories.length === 0) {
      const result = await refreshCategories(
        `${process.env.SERVER_URL}/categories`
      );
      readonlyAllCategories.set([...result]);

      data = orderCategories([...result]);
    } else {
      data = orderCategories([...$readonlyAllCategories]);
    }
  });
</script>

<svelte:head>
  {#if $readonlyAllCategories && $readonlyAllCategories.length === 0}
    <link
      rel="preload"
      as="fetch"
      href={`${process.env.SERVER_URL}/categories`}
      crossorigin="anonymous"
    />
  {/if}
</svelte:head>

<div class="opening-times">
  <h1>welcome to the online shop</h1>
</div>

<HexGrid {data} {categoryFn} />

<style>
  .opening-times {
    position: relative;
    display: block;
    flex-direction: column;
    grid-row: 1;
    grid-column: 2;
    text-align: center;
  }

  h1 {
    font-family: 'Welcomehome3 Regular';
  }
</style>
