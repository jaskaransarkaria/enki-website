<script lang="ts">
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import CraftThreeJpg from "$lib/assets/craft_3.jpg";
  import CraftFiveJpg from "$lib/assets/craft_5.jpg";
  import CraftEightJpg from "$lib/assets/craft_8.jpg";
  import CraftThreeAvif from "$lib/assets/craft_3.avif";
  import CraftFiveAvif from "$lib/assets/craft_5.avif";
  import CraftEightAvif from "$lib/assets/craft_8.avif";
  import GiftVouchers from "$lib/components/Svg/GiftVouchers.svelte";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  const SHOW_VOUCHER = true;
  let ttJewelleryWidget: HTMLElement = $state(undefined);
  let ttCraftWidget: HTMLElement = $state(undefined);
  let jewelleryWidgetLoaded = $state(false);
  let craftWidgetLoaded = $state(false);

  onMount(() => {
    ttJewelleryWidget.className = "tt-widget";
    jewelleryWidgetLoaded = true;
    ttCraftWidget.className = "tt-widget";
    craftWidgetLoaded = true;
  });

  let outerWidth = $derived(0);
  const isMobile = $derived(outerWidth < 960);
</script>

<svelte:head>
  <title>Enki - Scheduled Group Workshops</title>
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || page.data.whitelistedUserAgent}
  <div class="container">
    <div class="class-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: $isAvifSupported ? CraftThreeAvif : CraftThreeJpg,
              alt: "a workshop attendee inspecting their bangle",
            },
            {
              src: $isAvifSupported ? CraftFiveAvif : CraftFiveJpg,
              alt: "an attendee discusses her work with the workshop teacher",
            },
            {
              src: $isAvifSupported ? CraftEightAvif : CraftEightJpg,
              alt: "people showing off their finished workshop rings, bangles and necklaces",
            },
          ]}
        />
      {:else}
        <img
          in:fade={{ duration: 600 }}
          src={$isAvifSupported ? CraftThreeAvif : CraftThreeJpg}
          alt="a workshop attendee inspecting their bangle"
        />
        <img
          in:fade={{ duration: 600 }}
          src={$isAvifSupported ? CraftFiveAvif : CraftFiveJpg}
          alt="an attendee discusses her work with the workshop teacher"
        />
        <img
          in:fade={{ duration: 600 }}
          src={$isAvifSupported ? CraftEightAvif : CraftEightJpg}
          alt="people showing off their finished workshop rings, bangles and necklaces"
        />
      {/if}
    </div>
    <p>
      Ever wanted to make your own jewellery? Like to try your hand at lino
      printing? Looking for a unique present for a friend?
      <br /><br />At Enki we host a wide range of workshops where you can meet
      new people and learn a new craft. The one off workshops include all the
      tools and materials needed, expert tuition and light refreshments.<br
      /><br />Click on the workshops below to find out more about each event.<br
      /><br />We also take group bookings where you can choose the date and
      topic. <br /><br />
      Get in touch <a href="/contact">here</a>.
    </p>
    {#if SHOW_VOUCHER}
      <div class="voucher-container">
        <GiftVouchers />
        <p>
          If you'd like to purchase a workshop as a gift and dates aren’t yet
          announced or you're not sure when the recipient is available, you can
          always buy one of our vouchers!
          <br /><br />
          Vouchers are valid for a year and can be used to purchase any workshop
          posted on our website, just enter the voucher code when you are prompted
          to when purchasing a workshop.
          <br /><br />
          We schedule classes at least a month in advance so watch this space! We
          also have physical vouchers at the shop that you can collect or arrange
          postage for if you want something to give in person.
        </p>
      </div>
    {/if}
  </div>

  <div class="widget-container">
    <div
      bind:this={ttJewelleryWidget}
      class="tt-widget"
      style:width={isMobile ? "100%" : "40%"}
    >
      <h2>Jewellery Workshops</h2>
      <div class="tt-widget-fallback">
        <p>
          <a
            href="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget&srch=jewellery&show_sort=true"
            target="_blank">Click here to buy tickets</a
          ><br /><small
            ><a
              href="https://www.tickettailor.com?rf=wdg_113333"
              class="tt-widget-powered"
              >Sell tickets online with Ticket Tailor</a
            ></small
          >
        </p>
      </div>
      {#if jewelleryWidgetLoaded}
        <script
          src="https://cdn.tickettailor.com/js/widgets/min/widget.js"
          data-url="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget&srch=jewellery&show_sort=true"
          data-type="inline"
          data-inline-minimal="false"
          data-inline-show-logo="true"
          data-inline-bg-fill="false"
          data-inline-inherit-ref-from-url-param=""
          data-inline-ref="website_widget"
        ></script>
      {/if}
    </div>

    <div
      bind:this={ttCraftWidget}
      class="tt-widget"
      style:width={isMobile ? "100%" : "40%"}
    >
      <h2>Craft Workshops</h2>
      <div class="tt-widget-fallback">
        <p>
          <a
            href="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget&srch=workshop&show_sort=true"
            target="_blank">Click here to buy tickets</a
          ><br /><small
            ><a
              href="https://www.tickettailor.com?rf=wdg_113333"
              class="tt-widget-powered"
              >Sell tickets online with Ticket Tailor</a
            ></small
          >
        </p>
      </div>
      {#if craftWidgetLoaded}
        <script
          src="https://cdn.tickettailor.com/js/widgets/min/widget.js"
          data-url="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget&srch=workshop&show_sort=true"
          data-type="inline"
          data-inline-minimal="false"
          data-inline-show-logo="true"
          data-inline-bg-fill="false"
          data-inline-inherit-ref-from-url-param=""
          data-inline-ref="website_widget"
        ></script>
      {/if}
    </div>
  </div>
{/if}

<style>
  h2 {
    text-align: center;
    font-family: "Welcomehome5 Regular";
  }

  a {
    cursor: pointer;
  }

  .container {
    display: flex;
    margin: 1em;
    flex-direction: column;
    align-items: center;
  }

  .widget-container {
    display: flex;
    margin: 1em;
    flex-direction: column;
    align-items: center;
  }

  .voucher-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    width: 90%;
    align-self: center;
    text-align: center;
    font-family: "Caviar Dreams";
  }

  .class-pics {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-self: center;
    justify-content: center;
  }

  .class-pics > * {
    height: 80px;
    padding: 5px;
  }

  @media (min-width: 360px) {
  }

  @media (min-width: 600px) {
    .class-pics {
      flex-direction: row;
      width: 40%;
      margin-bottom: 2%;
    }

    .class-pics > img {
      height: 200px;
    }
  }

  @media (min-width: 960px) {
    .class-pics {
      flex-direction: row;
      width: 40%;
      margin-bottom: 2%;
    }

    .class-pics > img {
      height: 300px;
    }

    p {
      width: 50%;
    }

    .widget-container {
      width: 100%;
      margin: 1em;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
</style>
