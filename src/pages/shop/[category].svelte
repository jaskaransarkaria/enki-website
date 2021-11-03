<script lang="ts">
  import { goto } from '@roxi/routify';
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

<CategoryView categoryFn={selectCategory} {categoryId} />
