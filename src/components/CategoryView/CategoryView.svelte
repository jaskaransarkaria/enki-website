<script lang="typescript">
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import { refreshCategory } from '@/libs/requests';
  import { categories } from '@/stores/categories';
  import type { Category } from '@/types/category';

  const INVALID_CATEGORY_ID = 0;

  export let categoryFn: (cat: Category) => void;
  export let categoryId: number;

  let categoryToShow: Category | undefined;
  let isValidCategoryStore =
    $categories &&
    $categories?.Children !== undefined &&
    categoryId !== INVALID_CATEGORY_ID;

  const refreshSetCategories = async (id: number) => {
    if (id) {
      const data: ReadonlyArray<Category> = await refreshCategory(
        `${process.env.SERVER_URL}/category?id=${id.toString()}`
      );
      categories.set(data[0]);
    }
  };

  const showCategory = (
    id: number,
    categoryStore: Category
  ): Category | undefined => {
    // find the id from $categories (store)
    if (categoryStore.Id === id) {
      return categoryStore;
    } else if (categoryStore.Children) {
      // serach each category/children branch recursively
      for (const cat of categoryStore.Children) {
        if (cat.Id === id) {
          return cat;
        } else if (cat.Children) {
          const result = showCategory(id, cat);
          if (result) {
            return result;
          }
        }
      }
    } else {
      // category id doesn't match and is the end of the branch in the tree
      return undefined;
    }
  };

  onMount(async () => {
    categoryToShow = isValidCategoryStore
      ? showCategory(categoryId, Object.assign({}, $categories))
      : undefined;
    // prevent from making unnecessary http calls will only call if there is nothing in store
    if (
      !categoryToShow ||
      !$categories ||
      $categories?.Id === INVALID_CATEGORY_ID
    ) {
      await refreshSetCategories(categoryId);
    }
  });

  $: categoryToShow = showCategory(categoryId, Object.assign({}, $categories));
</script>

{#if categoryToShow}
  {#if categoryToShow.Children.length}
    {#each categoryToShow.Children as cat}
      <button on:click={() => categoryFn(cat)}> {cat.Name} {cat.Id}</button>
    {/each}
  {/if}
  <ProductView {categoryId} />
{/if}
<h1>{categoryToShow?.Id || 'no "categoryToShow" from CategoryView'}</h1>
