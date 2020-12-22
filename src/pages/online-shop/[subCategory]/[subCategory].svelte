<script lang="ts">
  import { params } from '@roxi/routify';
  import ProductView from '../../../components/ProductView/ProductView.svelte';

  export let subCategory: string;
</script>

<h1>{JSON.stringify($params.subCategory)}</h1>
<h1>{subCategory}</h1>
<ProductView categoryId={subCategory} />
