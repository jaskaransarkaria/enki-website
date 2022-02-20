<script lang="ts">
  import { goto } from '@roxi/routify';
  import GetProducts from '@/components/GetProducts/GetProducts.svelte';
  import ScrollDown from '@/components/ScrollDown/ScrollDown.svelte';
  import BackToTop from '@/components/BackToTop/BackToTop.svelte';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);
  $: outerWidth = 0;
  $: outerHeight = 0;
  $: onlineShopHover = false;
  $: repairsAndCommissionsHover = false;
  $: classesHover = false;
  $: contactHover = false;
  $: isMobile = outerWidth <= 450 ? true : false;
</script>

<svelte:window bind:outerWidth bind:outerHeight />
<svelte:head>
  <link
    rel="preload"
    as="image"
    href={`https://enki.imgix.net/${
      outerWidth <= 450 ? 'mobile_landing_page_2' : 'inside_enki_desktop_3'
    }.png?${
      outerWidth <= 450 ? 'fit=crop' : 'auto=format'
    }&h=${outerHeight}&w=${outerWidth}`}
  />
</svelte:head>
<GetProducts />
<figure class={isMobile ? 'mobile-container' : 'container'}>
  <img
    class={isMobile ? 'parrallax-inside-shop' : 'inside-shop'}
    src={`https://enki.imgix.net/${
      outerWidth <= 450 ? 'mobile_landing_page_2' : 'inside_enki_desktop_3'
    }.png?${
      outerWidth <= 450 ? 'fit=crop' : 'auto=format'
    }&h=${outerHeight}&w=${outerWidth}`}
    alt="welcome to the shop, this ilustration shows the shopkeeper behind her bench"
  />
  {#if isMobile}
    <ScrollDown />
    <div class="mobile-button-container">
      <img
        class="mobile-online-shop"
        src="/mobile_online_shop.png"
        alt="online shop button"
        on:click={$goto('/shop')}
      />
      <img
        class="mobile-repairs-and-comms"
        src="/mobile_jewellery_services.png"
        alt="jewellery services button"
        on:click={$goto('/services')}
      />
      <img
        class="mobile-classes"
        src="/mobile_jewellery_classes.png"
        alt="classes button"
        on:click={$goto('/classes')}
      />
      <img
        class="mobile-contact-us"
        src="/mobile_contact_us.png"
        alt="contact us button"
        on:click={$goto('/contact')}
      />
      <img
        class="mobile-about-us"
        src="/mobile_about_us.png"
        alt="about us button"
        on:click={$goto('/about')}
      />
    </div>
  {:else}
    <img
      class="repairs-and-comms"
      src={repairsAndCommissionsHover
        ? '/jewellery_services.gif'
        : '/jewellery_services.png'}
      alt="repair and commissions button hover over me"
      on:mouseenter={() => (repairsAndCommissionsHover = true)}
      on:mouseleave={() => (repairsAndCommissionsHover = false)}
      on:click={$goto('/services')}
    />
    <img
      class="classes"
      src={classesHover ? '/classes.gif' : '/classes.png'}
      alt="classes button hover over me"
      on:mouseenter={() => (classesHover = true)}
      on:mouseleave={() => (classesHover = false)}
      on:click={$goto('/classes')}
    />
    <img
      class="online-shop"
      src={`https://enki.imgix.net/${
        onlineShopHover ? 'online_shop.gif' : 'online-shop.png'
      }`}
      alt="online shop button hover over me"
      on:mouseenter={() => (onlineShopHover = true)}
      on:mouseleave={() => (onlineShopHover = false)}
      on:click={$goto('/shop')}
    />
    <img
      class="contact"
      src={contactHover ? '/contact.gif' : '/contact.png'}
      alt="online shop button hover over me"
      on:mouseenter={() => (contactHover = true)}
      on:mouseleave={() => (contactHover = false)}
      on:click={$goto('/contact')}
    />
  {/if}
</figure>
<BackToTop />

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

  .parrallax-inside-shop {
    position: fixed;
    z-index: -1;
  }

  .contact,
  .classes,
  .repairs-and-comms,
  .online-shop:hover {
    cursor: pointer;
  }

  @media (min-width: 450px) {
    .contact {
      width: 70px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .online-shop {
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
    .contact {
      width: 80px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 60;
      grid-row-end: span end;
    }

    .online-shop {
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
    .contact {
      width: 100px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .online-shop {
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
    .contact {
      width: 120px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .online-shop {
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
    .contact {
      width: 160px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .online-shop {
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
    .contact {
      width: 170px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 64;
      grid-row-end: span end;
    }

    .online-shop {
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
    .contact {
      width: 210px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 62;
      grid-row-end: span end;
    }

    .online-shop {
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
    .contact {
      width: 270px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

    .online-shop {
      width: 290px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 43;
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
    .contact {
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 67;
      grid-row-end: span end;
    }

    .online-shop {
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
</style>
