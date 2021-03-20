<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import { categories } from '@/stores/categories';
  import type { Category } from '@/types/category';
  import CategoryView from '@/components/CategoryView/CategoryView.svelte';

  export let category: string;
  const selectCategory = (category: Category): void => {
    categories.set(category);
    $goto(`./${$params.category}/${category.Id}`);
  };
</script>

<h1>PARAMS {$params.category}</h1>
<h1>{category}</h1>

<CategoryView categoryFn={selectCategory} bind:categoryId={category} />
