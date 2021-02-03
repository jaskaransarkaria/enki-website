<script lang="ts">
  import { onMount } from 'svelte';
  import { jewellery } from '../../stores/jewellery';
  import { retrieveStateFn } from '../../libs/requests';

  import type { JewelleryProduct } from '../../types/jewellery-product';
  import type { GetFn } from '../../libs/requests';

  let searchValue: string = '';

  let data: readonly JewelleryProduct[] = [];

  const searchJewelleryForValue = (event: Event) =>
    event.target.value === ''
      ? []
      : $jewellery.filter((obj) =>
          obj.Name.toLowerCase().match(event.target.value.toLowerCase())
        );

  const getJewelleryProducts: GetFn<JewelleryProduct> = (
    url: string
  ): Promise<ReadonlyArray<JewelleryProduct>> =>
    fetch(url).then((res) => res.json());

  const refreshJewelleryProducts = async (): Promise<JewelleryProduct[]> => {
    const result = await retrieveStateFn(
      `${process.env.SERVER_URL}/jewellery-products`,
      getJewelleryProducts
    )()();

    return result['_tag'] === 'Right'
      ? (result.right as JewelleryProduct[])
      : [];
  };

  onMount(async () => {
    data = await refreshJewelleryProducts();
    jewellery.set(data);
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
