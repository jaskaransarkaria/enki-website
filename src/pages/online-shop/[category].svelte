<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import type { Category } from '@/types/category';
  import CategoryView from '@/components/CategoryView/CategoryView.svelte';

  export let category: string;
  let categoryId: number = parseInt(category, 10);

  const selectCategory = (category: Category): void => {
    categoryId = category.Id;
    $goto(`./${category.Id}`);
  };
</script>

<h1>PARAMS {$params.category}</h1>
<h1>{category}</h1>

<CategoryView categoryFn={selectCategory} {categoryId} />
