<script lang="ts">
  import { onMount } from 'svelte';
  import { jewellery } from '../../stores/jewellery';
  import { refreshProducts } from '../../libs/requests';

  import type { Product } from '../../types/product';

  let searchValue: string = '';

  let data: readonly Product[] = [];

  const searchJewelleryForValue = (event: Event) =>
    event.target.value === ''
      ? []
      : $jewellery.filter((obj) =>
          obj.Name.toLowerCase().match(event.target.value.toLowerCase())
        );

  onMount(async () => {
    data = await refreshProducts(
      `${process.env.SERVER_URL}/jewellery-products`
    );
    jewellery.set(data as readonly Product[]);
  });
</script>

<form>
  <input
    type="search"
    bind:value={searchValue}
    on:input={(e) => (data = searchJewelleryForValue(e))} />
</form>

<ul>
  {#if searchValue != ''}
    <h1>Total matches: {data.length}</h1>
    {#each data as match}
      <h1>{match.Name}</h1>
      <h1>CategoryId: {match.CategoryId}</h1>
      <h1>Product Id: {match.Id}</h1>
      <h1>Price: {match.SalePrice}</h1>
      <ol>
        <h1>Tags</h1>
        {#each match.ProductTags as tag}
          <h2>{tag.Name}</h2>
        {/each}
      </ol>
    {/each}
  {/if}
</ul>
