<script lang="typescript">
  import { goto } from '@roxi/routify';
  import ImageLoader from '@/components/Image/ImageLoader.svelte';
  import type { Category } from '@/types/category';

  export let variantCategory: Category;
</script>

<p>{JSON.stringify(variantCategory)}</p>

<button class="simple-container" on:click={$goto(`./${variantCategory.Id}`)}>
  <div class="position-img">
    <ImageLoader
      src={`https://enki.imgix.net/${variantCategory.Id}?auto=format`}
      alt={`${variantCategory.Name}`}
    />
  </div>
  <h3 class="basic-header">{`${variantCategory.Name}`}</h3>
</button>
