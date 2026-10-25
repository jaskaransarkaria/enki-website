<script lang="ts">
  import { initialViewportWidth } from "#lib/utils/initialViewportWidth.js";
  /* eslint-disable svelte/no-navigation-without-resolve */
  import { untrack } from "svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import { basket as basketStore } from "#lib/stores/basket.js";
  import SearchProducts from "#lib/components/SearchProducts/SearchProducts.svelte";
  import Hamburger from "#lib/components/Hamburger/Hamburger.svelte";
  import { clickOutside } from "#lib/utils/clickOutside.js";

  import header from "#lib/assets/header_1.png";
  import basketIcon from "#lib/assets/basket_icon.png";
  import searchIcon from "#lib/assets/search_1.png";

  let { loading = $bindable() } = $props();

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

  const keyActivate =
    (fn: () => void) =>
    (event: KeyboardEvent): void => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        fn();
      }
    };

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

  let showSearch = $derived(false);
  let animateBasketNumber = $derived(false);

  let outerWidth = $state(initialViewportWidth());
  let offset = $derived(outerWidth < 960 ? lessThan960 : moreThan960);
  let isMobile = $derived(outerWidth < 960);
  let basketNumber = $derived(
    $basketStore?.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0,
  );

  $effect(() => {
    if (basketNumber) {
      animateBasketNumber = true;
      untrack(() => (animateBasketNumber = false));
    }
  });

  let selected = $derived(page.url.toString());
</script>

<svelte:window bind:outerWidth />
<div class="header">
  {#if outerWidth < 1280}
    <Hamburger />
  {:else}
    <div class="left-container">
      <a
        data-sveltekit-preload-data
        class={selected.endsWith("/shop") || selected.includes("/shop/")
          ? "selected"
          : ""}
        href="/shop"
      >
        shop
      </a>
      <a
        data-sveltekit-preload-data
        class={selected.includes("CXWG77NR7TPXXQSZD3QVPLHS") ? "selected" : ""}
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
        class={selected.includes("workshops") ? "selected" : ""}
        href="/workshops"
      >
        workshops
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
  {#if outerWidth < 1280}
    {#if !showSearch}
      <a href="/" class="enki-logo-link" aria-label="Enki home">
        <img
          transition:fade|local
          src={header}
          alt="Enki"
          loading="eager"
          class="enki-logo"
        />
      </a>
    {/if}
  {:else}
    <a href="/" class="enki-logo-link" aria-label="Enki home">
      <img
        transition:fade|local
        src={header}
        alt="Enki"
        loading="eager"
        class="enki-logo"
      />
    </a>
  {/if}
  <div class="right-container">
    <button
      type="button"
      class="search-icon"
      aria-label="Search"
      style={move($left)}
      onclick={handleClick}
      use:clickOutside={{ enabled: showSearch, cb: handleClick }}
    >
      <img src={searchIcon} alt="search" />
    </button>
    {#if showSearch}
      <div class="search-bar" style={grow($growSearch, $searchLeft)}>
        <SearchProducts
          width={growSearchWidth($width)}
          cb={handleClick}
          bind:loading
        />
      </div>
    {/if}
    <div
      class={isMobile
        ? "mobile-basket-icon-container"
        : "basket-icon-container"}
    >
      <button
        type="button"
        class="basket-icon"
        aria-label="Basket"
        onclick={() => goto("/shop/basket")}
      >
        <img src={basketIcon} alt="basket" />
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 100 100"
        width={isMobile ? "15" : "25"}
        height={isMobile ? "15" : "25"}
        class="num-basket-items"
        role="button"
        tabindex="0"
        aria-label="Basket"
        onclick={() => goto("/shop/basket")}
        onkeydown={keyActivate(() => goto("/shop/basket"))}
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
  a,
  a:visited {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    color: #ff6600;
    text-decoration: none;
  }

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

  .basket-icon,
  .search-icon {
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    width: 25px;
    align-self: center;
  }

  .basket-icon {
    margin-right: 10px;
  }

  .basket-icon img,
  .search-icon img {
    display: block;
    width: 100%;
    height: auto;
  }

  .enki-logo-link {
    position: absolute;
    top: 22.5%;
    left: 50%;
    width: 75px;
    transform: translateX(-50%);
    display: block;
  }

  .enki-logo {
    display: block;
    width: 100%;
    height: auto;
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

    .enki-logo-link {
      top: 15%;
      width: 100px;
    }
  }

  @media (min-width: 700px) {
    .basket-icon,
    .search-icon {
      width: 35px;
    }

    .enki-logo-link {
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

    .enki-logo-link {
      top: 15%;
      width: 120px;
    }
  }

  @media (min-width: 1400px) {
    .left-container {
      width: 35%;
    }

    .enki-logo-link {
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

    .enki-logo-link {
      top: 15%;
      width: 140px;
    }

    .left-container {
      width: 25%;
    }
  }
</style>
