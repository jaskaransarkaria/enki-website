<script lang="ts">
  import { goto } from '@roxi/routify';
  import SearchProducts from '@/components/SearchProducts/SearchProducts.svelte';
  import Hamburger from '@/components/Hamburger/Hamburger.svelte';
  import { tweened } from 'svelte/motion';

  const lessThan960 = 150;
  const moreThan960 = 300;

  const width = tweened(0, {
    duration: 500,
  });

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
    if (!showSearch) {
      left.set(-offset);
      searchLeft.set(-offset);
      width.set(offset);
      showSearch = !showSearch;
    } else {
      left.set(0);
      searchLeft.set(0);
      width.set(0);
      setTimeout(() => (showSearch = !showSearch), 500);
    }
  }
  const move = (x: number) => `transform: translateX(${x}px);`;
  const grow = (width: number, x: number) =>
    `width: ${width}px; transform: translateX(${x}px);`;
  const growSearchWidth = (width: number) => `width: ${width}px`;

  let showSearch = false;

  $: outerWidth = 0;
  $: offset = outerWidth < 960 ? lessThan960 : moreThan960;
</script>

<svelte:window bind:outerWidth />

<div class="header">
  {#if outerWidth < 960}
    <Hamburger />
  {:else}
    <img
      class="home-icon"
      src="https://enki.imgix.net/home_icon.svg?q=50"
      alt="home"
      on:click={$goto('/')}
    />
  {/if}
  <img
    src="https://enki.imgix.net/moving_header.svg?wm=webp&q=90"
    alt="Enki"
    loading="eager"
    class="enki-logo"
    on:click={$goto('/')}
  />
  <div class="right-container">
    {#if outerWidth > 960}
      <button style={move($left)} on:click={$goto('/shop')}> shop </button>
      <button style={move($left)} on:click={$goto('/repairs')}>
        repairs
      </button>
      <button style={move($left)} on:click={$goto('/classes')}>
        classes
      </button>
      <button style={move($left)} on:click={$goto('/about')}> about </button>
    {/if}
    <img
      class="search-icon"
      src="https://enki.imgix.net/search_icon.svg?q=50"
      alt="search"
      style={move($left)}
      on:click={handleClick}
    />
    {#if showSearch}
      <div class="search-bar" style={grow($growSearch, $searchLeft)}>
        <SearchProducts width={growSearchWidth($width)} />
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
    align-self: flex-end;
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
  }

  .right-container * {
    margin-right: 10px;
    align-self: flex-end;
  }

  img:hover {
    cursor: pointer;
  }

  img {
    width: 45px;
  }

  .enki-logo {
    position: absolute;
    top: 0;
    left: 50%;
    width: 250px;
    transform: translateX(-50%);
  }

  button {
    all: unset;
    font-family: 'WelcomeHome3 Regular';
    cursor: pointer;
  }

  button:focus {
    border-bottom: 3px solid orange;
  }

  @media (min-width: 960px) {
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

    .right-container * {
      margin-right: 10px;
      align-self: flex-end;
    }

    img:hover {
      cursor: pointer;
    }

    img {
      width: 45px;
    }

    .enki-logo {
      position: absolute;
      top: 0;
      left: 50%;
      width: 250px;
      transform: translateX(-50%);
    }
  }
</style>
