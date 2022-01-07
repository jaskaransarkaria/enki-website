<script lang="ts">
  import { goto } from '@roxi/routify';
  import SearchProducts from '@/components/SearchProducts/SearchProducts.svelte';
  import { tweened } from 'svelte/motion';
  import { quartInOut } from 'svelte/easing';

  const left = tweened(0, {
    duration: 500,
  });

  const growSearch = tweened(0, {
    duration: 500,
  });

  const searchLeft = tweened(0, {
    duration: 500,
  });

  function handleClick() {
    left.set(-1250);
    searchLeft.set(-1250);
    //growSearch.set(300)
    showSearch = !showSearch;
  }
  const move = (x: number) => `transform: translateX(${x}px);`;
  const grow = (width: number, x: number) =>
    `width: ${width}px; transform: translateX(${x}px);`;

  let showSearch = false;
</script>

<div class="header">
  <img
    class="home-icon"
    src="https://enki.imgix.net/home_icon.svg?q=50"
    alt="home"
    on:click={$goto('/')}
  />
  <div class="right-container">
    <button on:click={$goto('/shop')}> shop </button>
    <button on:click={$goto('/repairs')}> repairs </button>
    <button on:click={$goto('/classes')}> classes </button>
    <button on:click={$goto('/about')}> about </button>
    <img
      class="search-icon"
      src="https://enki.imgix.net/search_icon.svg?q=50"
      alt="search"
      style={move($left)}
      on:click={handleClick}
    />
    {#if showSearch}
      <div class="search-bar" style={grow($growSearch, $searchLeft)}>
        <SearchProducts />
      </div>
    {/if}
    <img
      class="basket-icon"
      src="https://enki.imgix.net/basket_icon.svg?q=50"
      alt="basket"
    />
  </div>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    height: 55px;
    z-index: 99;
    background-color: white;
    box-shadow: 0 0 20px 0 #a3a8a5;
  }

  .right-container {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    padding-right: 20px;
  }

  .slide-search {
    animation-name: slide-search;
    animation-duration: 1s;
  }

  @keyframes slide-search {
    from {
      transform: scaleX(0%);
    }
    to {
      transform: scaleX(100%);
    }
  }
  .right-container * {
    margin-right: 10px;
    align-self: center;
  }

  img:hover {
    cursor: pointer;
  }

  img {
    width: 45px;
  }

  button {
    all: unset;
    font-family: 'WelcomeHome3 Regular';
    cursor: pointer;
  }

  button:focus {
    outline: orange 5px auto;
  }
</style>
