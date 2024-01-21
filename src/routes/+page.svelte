<script lang="ts">
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import ScrollDown from "$lib/components/ScrollDown/ScrollDown.svelte";
  import mobileGiftGuideAvif from "$lib/assets/mobile_gift_guide_1.avif";
  import mobileAboutUsAvif from "$lib/assets/mobile_about_us_3.avif";
  import mobileContactUsAvif from "$lib/assets/mobile_contact_us_3.avif";
  import mobileJewelleryRepairsAvif from "$lib/assets/mobile_jewellery_repairs_3.avif";
  import mobileJewelleryClassesAvif from "$lib/assets/mobile_jewellery_classes_3.avif";
  import mobileOnlineShopAvif from "$lib/assets/mobile_online_shop_3.avif";
  import mobileLandingPageAvif from "$lib/assets/mobile_landing_page_2.avif";
  import mobileGiftGuidePng from "$lib/assets/mobile_gift_guide_1.png";
  import mobileAboutUsPng from "$lib/assets/mobile_about_us_3.png";
  import mobileContactUsPng from "$lib/assets/mobile_contact_us_3.png";
  import mobileJewelleryRepairsPng from "$lib/assets/mobile_jewellery_repairs_3.png";
  import mobileJewelleryClassesPng from "$lib/assets/mobile_jewellery_classes_3.png";
  import mobileOnlineShopPng from "$lib/assets/mobile_online_shop_3.png";
  import mobileLandingPagePng from "$lib/assets/mobile_landing_page_2.png";
  import desktopLandingPagePng from "$lib/assets/inside_enki_desktop_4.png";
  import desktopLandingPageAvif from "$lib/assets/inside_enki_desktop_4.avif";
  import OnlineShop from "$lib/components/Svg/OnlineShop.svelte";
  import JewelleryServices from "$lib/components/Svg/JewelleryServices.svelte";
  import Classes from "$lib/components/Svg/Classes.svelte";
  import GiftGuide from "$lib/components/Svg/GiftGuide.svelte";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  $: outerWidth = 0;
  $: innerWidth = 0;
  $: outerHeight = 0;
  $: isMobile = outerWidth <= 450 ? true : false;
</script>

<svelte:window bind:outerWidth bind:outerHeight bind:innerWidth />

<svelte:head>
  <title>{"Enki - Welcome!"}</title>
  <meta property="og:url" content="https://enkionline.com/" />
  <meta property="og:image" content={desktopLandingPagePng} />
  <link rel="preload" as="image" href={desktopLandingPagePng} />
  <link rel="preload" as="image" href={mobileLandingPagePng} />
</svelte:head>

{#if (browser && outerWidth > 0) || $page.data.whitelistedUserAgent}
  <figure
    class={isMobile ? "mobile-container" : "container"}
    style:background-image={isMobile
      ? null
      : `url('${
          isAvifSupported ? desktopLandingPageAvif : desktopLandingPagePng
        }')`}
    style:background-size={isMobile ? null : `cover`}
  >
    {#if isMobile}
      <img
        class="parallax-inside-shop"
        src={isAvifSupported ? mobileLandingPageAvif : mobileLandingPagePng}
        alt="welcome to the shop, this illustration shows the shopkeeper behind her bench"
      />
      <ScrollDown />
      <div class="mobile-button-container">
        <a data-sveltekit-preload-data href="/shop">
          <img
            class="mobile-online-shop-img"
            src={isAvifSupported ? mobileOnlineShopAvif : mobileOnlineShopPng}
            alt="online shop button"
          />
        </a>
        <a data-sveltekit-preload-data href="/gift-guide">
          <img
            class="mobile-gift-guide-img"
            src={isAvifSupported ? mobileGiftGuideAvif : mobileGiftGuidePng}
            alt="gift guide button"
          />
        </a>
        <a data-sveltekit-preload-data href="/repairs">
          <img
            class="mobile-repairs-and-comms-img"
            src={isAvifSupported
              ? mobileJewelleryRepairsAvif
              : mobileJewelleryRepairsPng}
            alt="jewellery services button"
          />
        </a>
        <a data-sveltekit-preload-data href="/classes">
          <img
            class="mobile-classes-img"
            src={isAvifSupported
              ? mobileJewelleryClassesAvif
              : mobileJewelleryClassesPng}
            alt="classes button"
          />
        </a>
        <a data-sveltekit-preload-data href="/contact">
          <img
            class="mobile-contact-us-img"
            src={isAvifSupported ? mobileContactUsAvif : mobileContactUsPng}
            alt="contact us button"
          />
        </a>
        <a data-sveltekit-preload-data href="/about">
          <img
            class="mobile-about-us-img"
            src={isAvifSupported ? mobileAboutUsAvif : mobileAboutUsPng}
            alt="about us button"
          />
        </a>
      </div>
    {:else}
      <JewelleryServices />
      <Classes />
      <OnlineShop />
      <GiftGuide />
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
    animation: fadeIn 0.8s;
  }

  .mobile-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .mobile-button-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 150vh;
    width: 100%;
  }

  .mobile-button-container > * {
    width: 75%;
    align-self: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .parallax-inside-shop {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: auto;
    animation: fadeIn 0.8s;
  }

  .mobile-classes-img,
  .mobile-repairs-and-comms-img,
  .mobile-online-shop-img,
  .mobile-contact-us-img,
  .mobile-gift-guide-img,
  .mobile-about-us-img {
    height: auto;
    max-width: 100%;
  }
</style>
