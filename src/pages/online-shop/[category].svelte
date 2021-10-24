<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import CategoryView from '@/components/CategoryView/CategoryView.svelte';

  import type { Base } from '@/types/base';

  export let category: string;
  let categoryId: number;

  const selectCategory = (category: Base) => {
    categoryId = category.Id;
    $goto(`./${category.Id}`);
  };

  $: categoryId = parseInt(category, 10);
</script>

<h1>PARAMS {$params.category}</h1>
<h1>{category}</h1>

<CategoryView categoryFn={selectCategory} {categoryId} />
