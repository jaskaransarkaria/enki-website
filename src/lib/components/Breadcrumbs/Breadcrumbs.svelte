<script lang="ts">
  import { PUBLIC_SERVER_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import emptyHex from "$lib/assets/empty_hex_1.png";
  import { refreshCategories } from "$lib/utils/requests";
  import { readonlyAllCategories } from "$lib/stores/categories";

  import type { Category } from "$lib/types/category";
  import type { Base } from "$lib/types/base";

  interface TagCrumb extends Base {
    tagUrl: string;
    params: string;
  }

  type Crumb = Category | TagCrumb;

  export let extraCrumbs: TagCrumb[] = [];
  export let selectedCategoryId: number;

  let breadcrumbs: Crumb[];

  const rootShop: Category = {
    Id: 0,
    Name: "Shop",
    ParentId: 0,
    Children: [],
    NominalCode: "",
    Description: "",
  };

  onMount(async () => {
    if (!$readonlyAllCategories?.length) {
      // pull the category data from api
      const result = await refreshCategories(`${PUBLIC_SERVER_URL}/categories`);
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

  const handleBreadcrumbClick = async (breadcrumb: Category | TagCrumb) => {
    const breadcrumbUrl =
      "tagUrl" in breadcrumb
        ? `${breadcrumb.tagUrl}${breadcrumb.params}`
        : `/shop/category/${breadcrumb.Id}?name=${encodeURIComponent(
            breadcrumb.Name
          )}&imgHash=${breadcrumb.Description}`;

    breadcrumb.Name === "Shop"
      ? await goto("/shop")
      : await goto(breadcrumbUrl);
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
    <button
      data-testid="breadcrumb"
      on:click={async () => await handleBreadcrumbClick(breadcrumb)}
    >
      <img src={emptyHex} alt="breadcrumb icon" />
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
    font-family: "Caviar Dreams";
    text-transform: capitalize;
    text-align: end;
  }

  img {
    width: 15px;
    padding: 0.25em;
  }
</style>
