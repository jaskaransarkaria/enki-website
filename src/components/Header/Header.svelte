<script lang="ts">
  import { goto } from '@roxi/routify';
  import { tweened } from 'svelte/motion';
  import { fade } from 'svelte/transition';
  import Basket from '@/components/Basket/Basket.svelte';
  import SearchProducts from '@/components/SearchProducts/SearchProducts.svelte';
  import Hamburger from '@/components/Hamburger/Hamburger.svelte';

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

  const showBasketItems = () => (showBasket = !showBasket);

  let showSearch = false;
  let showBasket = false;

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
      src="https://enki.imgix.net/home_icon.svg"
      alt="home"
      on:click={$goto('/')}
    />
  {/if}
  {#if !showSearch}
    <img
      transition:fade|local
      src="https://enki.imgix.net/moving_header.svg"
      alt="Enki"
      loading="eager"
      class="enki-logo"
      on:click={$goto('/')}
    />
  {/if}
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
      src="https://enki.imgix.net/search_icon.svg"
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
      src="https://enki.imgix.net/basket_icon.svg"
      alt="basket"
      on:click={showBasketItems}
    />
  </div>
</div>
{#if showBasket && outerWidth < 960}
  <Basket />
{/if}

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
    height: 100%;
    transform: translateX(-100%);
  }

  .right-container * {
    align-self: flex-end;
  }

  img:hover {
    cursor: pointer;
  }

  .basket-icon {
    margin-right: 10px;
  }

  .basket-icon,
  .search-icon {
    width: 25px;
    align-self: center;
  }

  .enki-logo {
    position: absolute;
    top: 22.5%;
    left: 50%;
    width: 140px;
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

  @media (min-width: 360px) {
    .basket-icon,
    .search-icon {
      width: 30px;
    }

    .enki-logo {
      top: 10%;
      width: 200px;
    }
  }

  @media (min-width: 700px) {
    .basket-icon,
    .search-icon {
      width: 35px;
    }

    .enki-logo {
      top: 0;
      width: 250px;
    }
  }

  @media (min-width: 960px) {
    .right-container {
      display: flex;
      justify-content: flex-end;
      width: 35%;
    }

    .right-container * {
      margin-right: 10px;
      align-self: center;
    }
  }

  @media (min-width: 1280px) {
    .header {
      height: 65px;
    }

    .basket-icon,
    .search-icon {
      width: 40px;
    }

    .enki-logo {
      top: 0;
      width: 300px;
    }
  }

  @media (min-width: 1960px) {
    .header {
      height: 75px;
    }

    .basket-icon,
    .search-icon {
      width: 45px;
    }

    .enki-logo {
      top: 0;
      width: 350px;
    }
  }
</style>
