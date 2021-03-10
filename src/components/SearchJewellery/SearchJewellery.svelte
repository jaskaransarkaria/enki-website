<script lang="ts">
  import { onMount } from 'svelte';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import { jewellery } from '@/stores/jewellery';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  let searchValue: string = '';

  let data: readonly Product[] = [];

  const searchJewelleryForValue = (value: string) =>
    value === ''
      ? []
      : $jewellery.filter((obj) =>
          obj.Name.toLowerCase().match(value.toLowerCase())
        );

  onMount(async () => {
    if ($jewellery.length === 0) {
      data = await refreshProducts(
        `${process.env.SERVER_URL}/jewellery-products`
      );
      jewellery.set(data);
    }
  });
</script>

<form>
  <input
    type="search"
    bind:value={searchValue}
    on:input={(e) => (data = searchJewelleryForValue(e.currentTarget.value))} />
</form>

<ul>
  {#if searchValue != ''}
    <h1>Total matches: {data.length}</h1>
    {#each data as match}
      <SingleProduct product={match} />
    {/each}
  {/if}
</ul>
