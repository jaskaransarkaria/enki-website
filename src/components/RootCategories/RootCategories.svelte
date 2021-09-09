<script lang="typescript">
  import { onMount } from 'svelte';
  import { refreshCategories } from '@/libs/requests';
  import HexGrid from '@/components/HexGrid/HexGrid.svelte';
  import { categories } from '@/stores/categories';
  import { goto } from '@roxi/routify';

  import type { Category } from '@/types/category';

  let data: Category[] = [];

  const orderCategories = (resp: Category[]) =>
    resp.sort((a: Category, b: Category) => (a.Name < b.Name ? -1 : 1));

  const categoryFn: (cat: Category) => void = /*istanbul ignore next*/ (
    category: Category
  ) => {
    categories.set(category);
    $goto(`./${category.Id}`);
  };

  onMount(async () => {
    // pull the category data from api
    const result = await refreshCategories(
      `${process.env.SERVER_URL}/categories`
    );
    data = orderCategories([...result]);
  });
</script>

<div class="opening-times">
  <h1>OPENING TIMES</h1>
  <h2>Monday - Sunday: 10am - 5pm</h2>
</div>

<HexGrid {data} {categoryFn} />

<style>
  .opening-times {
    display: block;
    flex-direction: column;
    grid-row: 1;
    grid-column: 2;
    text-align: center;
  }
</style>
