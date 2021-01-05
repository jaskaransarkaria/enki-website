<script lang="ts">
  import { jewellery } from '../../stores/jewellery';
  import { onMount } from 'svelte';
  let searchValue: string = '';
  let results: any[] = [];

  const fetchJewelleryProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/jewellery-products`
      );
      const parsedResult = await response.json();
      return parsedResult;
    } catch (err) {
      console.error('fetching jewellery products failed', err);
    }
  };

  onMount(async () => {
    const data = await fetchJewelleryProducts();
    jewellery.set(data);
  });

  const searchJewelleryForValue = (event: Event) =>
    event.target.value === ''
      ? []
      : $jewellery.filter((obj) =>
          obj.Name.toLowerCase().match(event.target.value.toLowerCase())
        );
</script>

<form>
  <input
    type="search"
    bind:value={searchValue}
    on:input={(e) => (results = searchJewelleryForValue(e))} />
</form>

<ul>
  {#if searchValue != ''}
  <h1>Total matches: {results.length}</h1>
  {/if}
  {#each results as match}
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
</ul>
