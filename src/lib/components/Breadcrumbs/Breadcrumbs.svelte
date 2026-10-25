<script lang="ts">
  import { PUBLIC_SERVER_URL } from "$app/env/public";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import emptyHex from "#lib/assets/empty_hex_1.png";
  import { refreshCategories } from "#lib/utils/requests.js";
  import {
    readonlyAllCategories,
    InitialValue,
  } from "#lib/stores/categories.js";

  import { type SquareCategory } from "#lib/types/category.js";

  type Crumb = SquareCategory;

  interface Props {
    selectedCategoryId: string;
  }

  let { selectedCategoryId }: Props = $props();

  const recursiveCatSearch = (
    id: string,
    categories: readonly SquareCategory[],
    results: readonly SquareCategory[],
  ): readonly SquareCategory[] => {
    // dive deep and find the category then work upwards to the root
    for (const cat of categories) {
      if (cat.id === id) {
        if (cat.category_data.parent_category.id === null) {
          return [...results, cat];
        }
        // search for the ParentId
        return recursiveCatSearch(
          cat.category_data.parent_category.id,
          $readonlyAllCategories,
          [...results, cat],
        );
      } else if (cat?.children?.length) {
        results = recursiveCatSearch(id, cat.children, results);
      }
    }

    return results;
  };

  let breadcrumbs: Crumb[] = $derived([
    InitialValue[0],
    ...recursiveCatSearch(selectedCategoryId, $readonlyAllCategories, [])
      .slice()
      .reverse(),
  ]);

  onMount(async () => {
    if (!$readonlyAllCategories?.length) {
      const result = await refreshCategories(`${PUBLIC_SERVER_URL}/categories`);
      readonlyAllCategories.set([...result]);
    }
  });

  const handleBreadcrumbClick = async (breadcrumb: SquareCategory) => {
    const breadcrumbUrl = `/shop/category/${breadcrumb.id}`;

    if (breadcrumb.category_data.name === "Shop") {
      // eslint-disable-next-line svelte/no-navigation-without-resolve
      await goto("/shop");
    } else {
      // eslint-disable-next-line svelte/no-navigation-without-resolve
      await goto(breadcrumbUrl);
    }
  };
</script>

{#if selectedCategoryId}
  {#each breadcrumbs as breadcrumb (breadcrumb.id)}
    <button
      data-testid="breadcrumb"
      onclick={async () => await handleBreadcrumbClick(breadcrumb)}
    >
      <img src={emptyHex} alt="breadcrumb icon" />
      {breadcrumb?.category_data?.name}
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
    font-family: "Caviar Dreams";
    text-transform: capitalize;
    text-align: end;
  }

  img {
    width: 15px;
    padding: 0.25em;
  }
</style>
