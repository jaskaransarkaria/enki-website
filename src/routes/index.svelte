<script context="module">
  import { browser } from "$app/env";
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import ScrollDown from "$lib/components/ScrollDown/ScrollDown.svelte";
  import {
    DESKTOP_ABOUT_STATIC,
    DESKTOP_ABOUT_GIF,
    DESKTOP_ONLINE_SHOP_STATIC,
    DESKTOP_ONLINE_SHOP_GIF,
    DESKTOP_JEWELLERY_CLASSES_STATIC,
    DESKTOP_JEWELLERY_SERVICES_STATIC,
    DESKTOP_JEWELLERY_CLASSES_GIF,
    DESKTOP_JEWELLERY_SERVICES_GIF,
    DESKTOP_LANDING_PAGE,
    MOBILE_ABOUT_US,
    MOBILE_CONTACT_US,
    MOBILE_JEWELLERY_SERVICES,
    MOBILE_ONLINE_SHOP,
    MOBILE_LANDING_PAGE,
    MOBILE_JEWELLERY_CLASSES,
  } from "$lib/utils/consts";

  $: outerWidth = 0;
  $: outerHeight = 0;
  $: onlineShopHover = false;
  $: repairsAndCommissionsHover = false;
  $: classesHover = false;
  $: aboutHover = false;
  $: isMobile = outerWidth <= 450 ? true : false;
</script>

<svelte:window bind:outerWidth bind:outerHeight />
<svelte:head>
  <link rel="preload" as="image" href={MOBILE_LANDING_PAGE} />
  <link rel="preload" as="image" href={DESKTOP_LANDING_PAGE} />
  <link rel="preload" as="image" href={MOBILE_JEWELLERY_CLASSES} />
  <link rel="preload" as="image" href={MOBILE_CONTACT_US} />
  <link rel="preload" as="image" href={MOBILE_ABOUT_US} />
  <link rel="preload" as="image" href={DESKTOP_JEWELLERY_SERVICES_GIF} />
  <link rel="preload" as="image" href={DESKTOP_JEWELLERY_SERVICES_STATIC} />
  <link rel="preload" as="image" href={DESKTOP_JEWELLERY_CLASSES_GIF} />
  <link rel="preload" as="image" href={DESKTOP_JEWELLERY_CLASSES_STATIC} />
  <link rel="preload" as="image" href={DESKTOP_ONLINE_SHOP_GIF} />
  <link rel="preload" as="image" href={DESKTOP_ONLINE_SHOP_STATIC} />
  <link rel="preload" as="image" href={DESKTOP_ABOUT_GIF} />
  <link rel="preload" as="image" href={DESKTOP_ABOUT_STATIC} />
  <meta property="og:url" content="https://enkionline.com/" />
  <meta
    property="og:image"
    content="https://enki.imgix.net/inside_enki_desktop_3.png?auto=format,compress"
  />
</svelte:head>

{#if browser}
  <figure class={isMobile ? "mobile-container" : "container"}>
    <img
      class={isMobile ? "parallax-inside-shop" : "inside-shop"}
      src={`${outerWidth <= 450 ? MOBILE_LANDING_PAGE : DESKTOP_LANDING_PAGE}&h=${outerHeight}&w=${outerWidth}`}
      alt="welcome to the shop, this illustration shows the shopkeeper behind her bench"
    />
    {#if isMobile}
      <ScrollDown />
      <div class="mobile-button-container">
        <img
          class="mobile-online-shop"
          src={MOBILE_ONLINE_SHOP}
          alt="online shop button"
          on:click={() => goto("/shop")}
        />
        <img
          class="mobile-repairs-and-comms"
          src={MOBILE_JEWELLERY_SERVICES}
          alt="jewellery services button"
          on:click={() => goto("/repairs")}
        />
        <img
          class="mobile-classes"
          src={MOBILE_JEWELLERY_CLASSES}
          alt="classes button"
          on:click={() => goto("/classes")}
        />
        <img
          class="mobile-contact-us"
          src={MOBILE_CONTACT_US}
          alt="contact us button"
          on:click={() => goto("/contact")}
        />
        <img
          class="mobile-about-us"
          src={MOBILE_ABOUT_US}
          alt="about us button"
          on:click={() => goto("/about")}
        />
      </div>
    {:else}
      <img
        class="repairs-and-comms"
        src={repairsAndCommissionsHover
          ? DESKTOP_JEWELLERY_SERVICES_GIF
          : DESKTOP_JEWELLERY_SERVICES_STATIC}
        alt="repair and commissions button hover over me"
        on:mouseenter={() => (repairsAndCommissionsHover = true)}
        on:mouseleave={() => (repairsAndCommissionsHover = false)}
        on:click={() => goto("/repairs")}
      />
      <img
        class="classes"
        src={classesHover
          ? DESKTOP_JEWELLERY_CLASSES_GIF
          : DESKTOP_JEWELLERY_CLASSES_STATIC}
        alt="classes button hover over me"
        on:mouseenter={() => (classesHover = true)}
        on:mouseleave={() => (classesHover = false)}
        on:click={() => goto("/classes")}
      />
      <img
        class="online-shop"
        src={onlineShopHover
          ? DESKTOP_ONLINE_SHOP_GIF
          : DESKTOP_ONLINE_SHOP_STATIC}
        alt="online shop button hover over me"
        on:mouseenter={() => (onlineShopHover = true)}
        on:mouseleave={() => (onlineShopHover = false)}
        on:click={() => goto("/shop")}
      />
      <img
        class="about"
        src={aboutHover ? DESKTOP_ABOUT_GIF : DESKTOP_ABOUT_STATIC}
        alt="online shop button hover over me"
        on:mouseenter={() => (aboutHover = true)}
        on:mouseleave={() => (aboutHover = false)}
        on:click={() => goto("/about")}
      />
    {/if}
  </figure>
{/if}

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(100, 1fr);
    grid-template-rows: repeat(100, 1fr);
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .mobile-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }

  .mobile-button-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 200vh;
    width: 100vw;
  }

  .mobile-button-container > * {
    width: 80%;
    align-self: center;
    padding: 10px;
  }

  .inside-shop {
    z-index: -1;
    grid-column-start: 1;
    grid-column-end: span end;
    grid-row-start: 1;
    grid-row-end: span end;
  }

  .parallax-inside-shop {
    position: fixed;
    z-index: -1;
    width: 100vw;
  }

  .about,
  .classes,
  .repairs-and-comms,
  .online-shop:hover {
    cursor: pointer;
  }

  @media (min-width: 450px) {
    .online-shop {
      width: 80px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .about {
      width: 80px;
      grid-column-start: 36;
      grid-column-end: span end;
      grid-row-start: 58;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 90px;
      grid-column-start: 10;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }

    .classes {
      width: 90px;
      grid-column-start: 80;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 600px) {
    .online-shop {
      width: 100px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      width: 80px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 100px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 1;
      grid-row-end: span end;
    }

    .classes {
      width: 100px;
      grid-column-start: 77;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 800px) {
    .online-shop {
      width: 130px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      width: 120px;
      grid-column-start: 39;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 120px;
      grid-column-start: 10;
      grid-column-end: span end;
      grid-row-start: 3;
      grid-row-end: span end;
    }

    .classes {
      width: 120px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 4;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1024px) {
    .online-shop {
      width: 150px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      width: 140px;
      grid-column-start: 39;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 140px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }

    .classes {
      width: 140px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1280px) {
    .online-shop {
      width: 180px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      width: 180px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 180px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 2;
      grid-row-end: span end;
    }

    .classes {
      width: 180px;
      grid-column-start: 69;
      grid-column-end: span end;
      grid-row-start: 1;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1440px) {
    .online-shop {
      width: 200px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      width: 190px;
      grid-column-start: 39;
      grid-column-end: span end;
      grid-row-start: 63;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 190px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }

    .classes {
      width: 180px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1650px) {
    .online-shop {
      width: 230px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      width: 230px;
      grid-column-start: 39;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 225px;
      grid-column-start: 14;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }

    .classes {
      width: 225px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1960px) {
    .online-shop {
      width: 270px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      width: 290px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 260px;
      grid-column-start: 14;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }

    .classes {
      width: 260px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 2200px) {
    .online-shop {
      width: 300px;
      grid-column-start: 64;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .about {
      grid-column-start: 40;
      grid-column-end: span end;
      grid-row-start: 63;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 280px;
      grid-column-start: 14;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }

    .classes {
      width: 280px;
      grid-column-start: 75;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 2400px) {
    .online-shop {
      width: 325px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
    }
  }
</style>
