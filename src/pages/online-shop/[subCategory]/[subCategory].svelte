<script lang="ts">
  import { params } from '@roxi/routify';
  import CategoryView from '@/components/CategoryView/CategoryView.svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import { refreshCategory } from '@/libs/requests';
  import { categories } from '@/stores/categories';
  import type { Category } from '@/types/category';

  export let subCategory: string;
  let showProduct = false;
  let productToShow: string;
  let categoryToShow: string = $params.subCategory;

  const showCategoryOrProducts = async (cat: Category) => {
    const isCat = await isIdCategory(cat.Id);
    if (isCat) {
      categoryToShow = cat.Id;
    } else {
      showProduct = true;
      productToShow = cat.Id;
    }
  };

  // TODO: refactor all this it's a horrible amount of api calls (maybe store all the categories in mem?)
  const isIdCategory = async (id: string) => {
    const data = await refreshCategory(
      `${process.env.SERVER_URL}/category?id=${id}`
    );
    if (data.Id) {
      categories.set(data);
      // does cat have children?
      if (data.Children.length) {
        return true;
      }
    }
    return false;
  };
</script>

<h1>{JSON.stringify($params.subCategory)}</h1>
<h1>{subCategory}</h1>

<CategoryView categoryFn={showCategoryOrProducts} categoryId={categoryToShow} />

{#if showProduct}
  <ProductView categoryId={productToShow} />
{/if}
