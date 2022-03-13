<script lang="typescript">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { refreshCategories } from '@/libs/requests';
  import { readonlyAllCategories } from '@/stores/categories';

  import type { Category } from '@/types/category';
  import type { Base } from '@/types/base';

  interface TagCrumb extends Base {
    tagUrl: string;
    params: string;
  }

  export let extraCrumbs: TagCrumb[] = [];
  export let selectedCategoryId: number;

  let breadcrumbs: Base[];

  const rootShop: Category = {
    Id: 0,
    Name: 'Shop',
    ParentId: 0,
    Children: [],
    NominalCode: '',
  };

  onMount(async () => {
    if (!$readonlyAllCategories?.length) {
      // pull the category data from api
      const result = await refreshCategories(
        `${process.env.SERVER_URL}/categories`
      );
      readonlyAllCategories.set([...result]);
    }
  });

  const recursiveCatSearch = (
    id: number,
    categories: readonly Category[],
    results: readonly Category[]
  ): readonly Category[] => {
    // dive deep and find the category then work upwards to the root
    for (const cat of categories) {
      if (cat.Id === id) {
        if (cat.ParentId === null) {
          return [...results, cat];
        }
        // search for the ParentId
        return recursiveCatSearch(cat.ParentId, $readonlyAllCategories, [
          ...results,
          cat,
        ]);
      } else if (cat?.Children?.length) {
        results = recursiveCatSearch(id, cat.Children, results);
      }
    }

    return results;
  };

  const handleBreadcrumbClick = (breadcrumb: Base | TagCrumb) => {
    const breadcrumbUrl =
      'tagUrl' in breadcrumb
        ? `${breadcrumb.tagUrl}${breadcrumb.params}`
        : `/shop/${breadcrumb.Id}`;

    breadcrumb.Name === 'Shop' ? $goto('/shop') : $goto(breadcrumbUrl);
  };

  $: breadcrumbs = [
    rootShop,
    ...recursiveCatSearch(selectedCategoryId, $readonlyAllCategories, [])
      .slice()
      .reverse(),
    ...extraCrumbs,
  ];
</script>

{#if selectedCategoryId}
  {#each breadcrumbs as breadcrumb (breadcrumb.Id)}
    <button on:click={() => handleBreadcrumbClick(breadcrumb)}>
      <img
        src="https://enki.imgix.net/empty_hex_1.png?auto=format,compress"
        alt="breadcrumb icon"
      />
      {breadcrumb.Name}
    </button>
  {/each}
{/if}

<style>
  button {
    display: inline-flex;
    align-items: center;
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    font-family: 'Caviar Dreams';
    text-transform: capitalize;
    text-align: end;
  }

  img {
    width: 15px;
    padding: 0.25em;
  }
</style>
