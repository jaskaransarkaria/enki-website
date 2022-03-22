<script context="module" lang="ts">
	import { refreshCategoryFromServer } from '$lib/utils/requests';
	import type { Category } from '$lib/types/category' 

  const traverseCategoryObj = (
    id: number,
    returnedCaptegoryObj: Category
  ): Category => {
    if (returnedCaptegoryObj?.Id === id) {
      return returnedCaptegoryObj;
    } else if (returnedCaptegoryObj.Children) {
      // serach each category/children branch recursively
      for (const cat of returnedCaptegoryObj.Children) {
        if (cat.Id === id) {
          return cat;
        } else if (cat.Children) {
          const result = traverseCategoryObj(id, cat);
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

  export async function load({ fetch, params, url }) {
		// pull the category data from api

		const result = await refreshCategoryFromServer(`${import.meta.env.VITE_SERVER_URL}/category?id=${params.category}`, fetch);
		const category = traverseCategoryObj(parseInt(params.category, 10), result[0])

    return {
      props: {
      	categoryToShow: category
      }
    };
  }

  export const prerender = true;
  export const browser = true;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import CategoryView from '$lib/components/CategoryView/CategoryView.svelte';
	import type { Base } from '$lib/types/base';

	export let categoryToShow: Category;

  const selectCategory = (category: Base) => {
    goto(`/shop/category/${category.Id}`);
	};

</script>

<CategoryView categoryFn={selectCategory} {categoryToShow}  />
