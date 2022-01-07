<script lang="typescript">
  import { onMount } from 'svelte';
  import { refreshCategories } from '@/libs/requests';
  import HexGrid from '@/components/HexGrid/HexGrid.svelte';
  import { categories, readonlyAllCategories } from '@/stores/categories';
  import { goto } from '@roxi/routify';

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
    const result = await refreshCategories(
      `${process.env.SERVER_URL}/categories`
    );
    readonlyAllCategories.set([...result]);

    data = orderCategories([...result]);
  });
</script>

<div class="opening-times">
  <img
    src="https://enki.imgix.net/moving_header.svg?wm=webp&q=90"
    alt="Enki"
    loading="eager"
  />
  <h1>online shop</h1>
</div>

<HexGrid {data} {categoryFn} />

<style>
  .opening-times {
    position: relative;
    top: 135px;
    margin-bottom: 100px;

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
