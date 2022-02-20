<script lang="ts">
  import { onMount } from 'svelte';
  import { products } from '@/stores/products';
  import { refreshProducts } from '@/libs/requests';

  onMount(async () => {
    if ($products && $products.length === 0) {
      const fetchedData = await refreshProducts(
        `${process.env.SERVER_URL}/get-all-products`
      );
      products.set(fetchedData);
    }
  });
</script>
