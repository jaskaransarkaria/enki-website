<script lang="typescript">
  import { goto } from '@roxi/routify';
  export let width = 300;

  let searchValue = '';
</script>

<input
  data-testid="search-bar"
  type="search"
  style={`width: ${width}px`}
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
