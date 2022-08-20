<script lang="ts">
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import ScrollDown from "$lib/components/ScrollDown/ScrollDown.svelte";
  import {
    DESKTOP_LANDING_PAGE,
    MOBILE_ABOUT_US,
    MOBILE_CONTACT_US,
    MOBILE_JEWELLERY_SERVICES,
    MOBILE_ONLINE_SHOP,
    MOBILE_LANDING_PAGE,
    MOBILE_JEWELLERY_CLASSES,
  } from "$lib/utils/consts";
  import OnlineShop from "$lib/components/Svg/OnlineShop.svelte";
  import JewelleryServices from "$lib/components/Svg/JewelleryServices.svelte";
  import AboutUs from "$lib/components/Svg/AboutUs.svelte";
  import Classes from "$lib/components/Svg/Classes.svelte";

  $: outerWidth = 0;
  $: innerWidth = 0;
  $: outerHeight = 0;
  $: isMobile = outerWidth <= 450 ? true : false;
</script>

<svelte:window bind:outerWidth bind:outerHeight bind:innerWidth />
<svelte:head>
  <link rel="preload" as="image" href={MOBILE_LANDING_PAGE} />
  <link rel="preload" as="image" href={DESKTOP_LANDING_PAGE} />
  <link rel="preload" as="image" href={MOBILE_JEWELLERY_CLASSES} />
  <link rel="preload" as="image" href={MOBILE_CONTACT_US} />
  <link rel="preload" as="image" href={MOBILE_ABOUT_US} />
  <link rel="preload" as="image" href={MOBILE_ONLINE_SHOP} />
  <meta property="og:url" content="https://enkionline.com/" />
  <meta
    property="og:image"
    content="https://enki.imgix.net/inside_enki_desktop_3.png?auto=format,compress"
  />
</svelte:head>

{#if (browser && outerWidth > 0) || $page.data.whitelistedUserAgent}
  <figure
    class={isMobile ? "mobile-container" : "container"}
    style:background-image={isMobile
      ? null
      : `url('${DESKTOP_LANDING_PAGE}&h=${outerHeight}&max-w=${innerWidth}&fit=crop')`}
  >
    {#if isMobile}
      <img
        class="parallax-inside-shop"
        src={`${MOBILE_LANDING_PAGE}&h=${outerHeight}&w=${outerWidth}`}
        alt="welcome to the shop, this illustration shows the shopkeeper behind her bench"
      />
      <ScrollDown />
      <div class="mobile-button-container">
        <a sveltekit:prefetch href="/shop">
          <img
            class="mobile-online-shop-img"
            src={MOBILE_ONLINE_SHOP}
            alt="online shop button"
          />
        </a>
        <a sveltekit:prefetch href="/repairs">
          <img
            class="mobile-repairs-and-comms-img"
            src={MOBILE_JEWELLERY_SERVICES}
            alt="jewellery services button"
          />
        </a>
        <a sveltekit:prefetch href="/classes">
          <img
            class="mobile-classes-img"
            src={MOBILE_JEWELLERY_CLASSES}
            alt="classes button"
          />
        </a>
        <a sveltekit:prefetch href="/contact">
          <img
            class="mobile-contact-us-img"
            src={MOBILE_CONTACT_US}
            alt="contact us button"
          />
        </a>
        <a sveltekit:prefetch href="/about">
          <img
            class="mobile-about-us-img"
            src={MOBILE_ABOUT_US}
            alt="about us button"
          />
        </a>
      </div>
    {:else}
      <JewelleryServices />
      <Classes />
      <OnlineShop />
      <AboutUs />
    {/if}
  </figure>
{/if}

<style>
  .container {
    width: 100%;
    height: 90vh;
    margin-left: 0;
    margin-right: 0;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
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

  .parallax-inside-shop {
    position: fixed;
    z-index: -1;
    width: 100vw;
  }

  .mobile-classes-img,
  .mobile-repairs-and-comms-img,
  .mobile-online-shop-img,
  .mobile-contact-us-img,
  .mobile-about-us-img {
    height: auto;
    max-width: 100%;
  }
</style>
