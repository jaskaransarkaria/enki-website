<script lang="ts">
  import { browser } from "$app/environment";
  import { afterUpdate } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import { basket as basketStore } from "$lib/stores/basket";
  import SearchProducts from "$lib/components/SearchProducts/SearchProducts.svelte";
  import Hamburger from "$lib/components/Hamburger/Hamburger.svelte";
  import { clickOutside } from "$lib/utils/clickOutside";

  import header from "$lib/assets/header_1.png";
  import basketIcon from "$lib/assets/basket_icon.png";
  import searchIcon from "$lib/assets/search_1.png";

  export let whitelistedUserAgent: boolean;

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

  afterUpdate(() => {
    selected = window.location.pathname;
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
  let animateBasketNumber = false;

  $: outerWidth = 0;
  $: offset = outerWidth < 960 ? lessThan960 : moreThan960;
  $: isMobile = outerWidth < 960;
  $: basketNumber =
    $basketStore?.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0;
  $: if (basketNumber) {
    animateBasketNumber = !animateBasketNumber;
  }

  $: selected = $page.url.toString();
</script>

<svelte:window bind:outerWidth />
<div class="header">
  {#if browser || whitelistedUserAgent}
    {#if outerWidth < 1280}
      <Hamburger />
    {:else}
      <div class="left-container">
        <a
          data-sveltekit-preload-data
          class={selected.includes("shop") ? "selected" : ""}
          href="/shop"
        >
          shop
        </a>
        <a
          data-sveltekit-preload-data
          class={selected.includes("gift") ? "selected" : ""}
          href="/shop/category/CXWG77NR7TPXXQSZD3QVPLHS"
        >
          gift guide
        </a>
        <a
          data-sveltekit-preload-data
          class={selected.includes("repairs") ? "selected" : ""}
          href="/repairs"
        >
          repairs
        </a>
        <a
          data-sveltekit-preload-data
          class={selected.includes("classes") ? "selected" : ""}
          href="/classes"
        >
          classes
        </a>
        <a
          data-sveltekit-preload-data
          class={selected.includes("about") ? "selected" : ""}
          href="/about"
        >
          about
        </a>
        <a
          data-sveltekit-preload-data
          class={selected.includes("contact") ? "selected" : ""}
          href="/contact"
        >
          contact
        </a>
      </div>
    {/if}
  {/if}
  {#if outerWidth < 1280}
    {#if !showSearch}
      <img
        transition:fade|local
        src={header}
        alt="Enki"
        loading="eager"
        class="enki-logo"
        on:click={() => goto("/")}
      />
    {/if}
  {:else}
    <img
      transition:fade|local
      src={header}
      alt="Enki"
      loading="eager"
      class="enki-logo"
      on:click={() => goto("/")}
    />
  {/if}
  <div class="right-container">
    <img
      class="search-icon"
      src={searchIcon}
      alt="search"
      style={move($left)}
      on:click={handleClick}
      use:clickOutside={{ enabled: showSearch, cb: handleClick }}
    />
    {#if showSearch}
      <div class="search-bar" style={grow($growSearch, $searchLeft)}>
        <SearchProducts width={growSearchWidth($width)} cb={handleClick} />
      </div>
    {/if}
    <div
      class={isMobile
        ? "mobile-basket-icon-container"
        : "basket-icon-container"}
    >
      <img
        class="basket-icon"
        src={basketIcon}
        alt="basket"
        on:click={() => goto("/shop/basket")}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 100 100"
        width={isMobile ? "15" : "25"}
        height={isMobile ? "15" : "25"}
        class="num-basket-items"
        on:click={() => goto("/shop/basket")}
      >
        <g>
          <circle
            style="fill:#fa6603;stroke:#fa6603;stroke-width:1.6871;stroke-miterlimit:10;"
            cx="50"
            cy="50"
            r="50"
          />
          <text
            class={`${
              animateBasketNumber
                ? "animate-basket-number-odd"
                : "animate-basket-number-even"
            }`}
            x="55%"
            y="45%"
            text-anchor="middle"
            stroke="white"
            fill="white"
            stroke-width="2.5px"
            dy=".5em"
            font-size="4em"
            font-family="Caviar Dreams">{basketNumber}</text
          >
        </g>
      </svg>
    </div>
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

  .left-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
    width: 18%;
  }

  .right-container {
    display: flex;
    align-self: flex-end;
    height: 100%;
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
  }

  .right-container * {
    align-self: flex-end;
  }

  .mobile-basket-icon-container {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
  }

  .num-basket-items {
    position: absolute;
    cursor: pointer;
    transform: translate(-10%, 10%);
  }

  .animate-basket-number-even {
    animation: blinker 0.75s linear 1;
  }

  .animate-basket-number-odd {
    animation: blinker-odd 0.75s linear 1;
  }

  @keyframes blinker-odd {
    50% {
      opacity: 0;
    }
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
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
    width: 75px;
    transform: translateX(-50%);
  }

  a {
    all: unset;
    font-family: "Welcomehome5 Regular";
    cursor: pointer;
    height: 50%;
  }

  .selected {
    border-bottom: 3px solid #ff6600;
  }

  @media (min-width: 360px) {
    .basket-icon,
    .search-icon {
      width: 30px;
    }

    .enki-logo {
      top: 15%;
      width: 100px;
    }
  }

  @media (min-width: 700px) {
    .basket-icon,
    .search-icon {
      width: 35px;
    }

    .enki-logo {
      top: 10%;
      width: 110px;
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

    .left-container {
      width: 30%;
    }

    .num-basket-items {
      transform: translate(-120%, 100%);
    }
  }

  @media (min-width: 1280px) {
    .header {
      height: 75px;
    }

    .left-container {
      width: 35%;
    }

    .basket-icon,
    .search-icon {
      width: 40px;
    }

    .enki-logo {
      top: 15%;
      width: 120px;
    }
  }

  @media (min-width: 1400px) {
    .left-container {
      width: 35%;
    }

    .enki-logo {
      top: 15%;
      width: 130px;
    }
  }

  @media (min-width: 1500px) {
    .left-container {
      width: 35%;
    }
  }

  @media (min-width: 1960px) {
    .basket-icon,
    .search-icon {
      width: 45px;
    }

    .enki-logo {
      top: 15%;
      width: 140px;
    }

    .left-container {
      width: 25%;
    }
  }
</style>
