<script lang="typescript">
  import { goto } from '@roxi/routify';

  let searchValue = '';
</script>

<input
  data-testid="search-bar"
  type="search"
  bind:value={searchValue}
  on:keydown={(e) => {
    if (e.key === 'Enter') {
      $goto(`/shop/search`, {
        'search-term': encodeURIComponent(searchValue),
      });
      searchValue = '';
    }
  }}
/>
