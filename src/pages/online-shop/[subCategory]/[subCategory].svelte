<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import CategoryView from '@/components/CategoryView/CategoryView.svelte';
  import type { Category } from '@/types/category';

  let idToDisplay: number = parseInt($params.subCategory, 10);

  const showId = (cat: Category) => {
    idToDisplay = cat.Id;
    console.log(
      'updating category to display from subcat page',
      cat.Id,
      idToDisplay
    );
    $goto(`./${cat.Id}`);
  };
</script>

<h1>{JSON.stringify($params.subCategory)}</h1>

<CategoryView categoryFn={showId} categoryId={idToDisplay} />
