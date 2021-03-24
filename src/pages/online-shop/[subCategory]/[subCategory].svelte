<script lang="ts">
  import { params } from '@roxi/routify';
  import CategoryView from '@/components/CategoryView/CategoryView.svelte';
  import type { Category } from '@/types/category';

  export let subCategory: string;
  let idToDisplay: string = $params.subCategory;

  const showId = (cat: Category) => {
    idToDisplay = cat.Id;
  };
</script>

<h1>{JSON.stringify($params.subCategory)}</h1>
<h1>{subCategory}</h1>

<CategoryView categoryFn={showId} bind:categoryId={idToDisplay} />
