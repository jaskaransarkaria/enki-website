<script lang="ts">
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import Hex from "$lib/components/Hex/Hex.svelte";
  import { fade } from "svelte/transition";
  import classesExampleOneJpg from "$lib/assets/classes_example_1.jpg";
  import classesExampleTwoJpg from "$lib/assets/classes_example_2.jpg";
  import classesExampleThreeJpg from "$lib/assets/classes_example_3.jpg";
  import classesExampleOneAvif from "$lib/assets/classes_example_1.avif";
  import classesExampleTwoAvif from "$lib/assets/classes_example_2.avif";
  import classesExampleThreeAvif from "$lib/assets/classes_example_3.avif";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  let ttWidget: HTMLElement;
  let widgetLoaded = false;
  let loaded = new Map();

  const jewelleryVoucherCategory = {
    id: "5G6HXSP2KNVZBFNNHRQ4YK7D",
    children: [],
    custom_attribute_values: {
      epos_now_id: {
        string_value: "2854484",
      },
      image_arr: {
        string_value: "2854484",
      },
      epos_now_nominal_code: {
        string_value: "CATEGORY",
      },
      epos_now_root_parent_id: {
        string_value: "0",
      },
      epos_now_parent_id: {
        string_value: "0",
      },
    },
    category_data: {
      name: "Jewellery Class Vouchers",
      parent_category: {
        id: "",
      },
      is_top_level: true,
      root_category: "",
      path_to_root: null,
    },
  };

  //const jewelleryVoucherCategory = {
  //  Name: "Jewellery Class Vouchers",
  //  Id: 2854484,
  //  ParentId: 0,
  //  Children: [],
  //  NominalCode: null,
  //  Description: "2854484",
  //};

  onMount(() => {
    ttWidget.className = "tt-widget";
    widgetLoaded = true;
  });

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:head>
  <title>{"Enki - Group Classes"}</title>
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || $page.data.whitelistedUserAgent}
  <div class="container">
    <div class="class-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: isAvifSupported
                ? classesExampleOneAvif
                : classesExampleOneJpg,
              alt: "A group photo with everyone showing their jewellery",
            },
            {
              src: isAvifSupported
                ? classesExampleTwoAvif
                : classesExampleTwoJpg,
              alt: "Everyone in the class are wearing their rings and arranged their hands into a circle for the picture",
            },
            {
              src: isAvifSupported
                ? classesExampleThreeAvif
                : classesExampleThreeJpg,
              alt: "the jeweller's table",
            },
          ]}
        />
      {:else}
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? classesExampleOneAvif : classesExampleOneJpg}
          alt="A man and a woman, the man is holding the rings in the palm of his hands"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? classesExampleTwoAvif : classesExampleTwoJpg}
          alt="two women looking longingly into each other's eyes wearing their rings"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported
            ? classesExampleThreeAvif
            : classesExampleThreeJpg}
          alt="enki jewellery ring boxes"
        />
      {/if}
    </div>
    <p>
      Ever wanted to make your own jewellery? Looking for a unique present for a
      friend? <br /><br />At Enki workshops you can meet new people and learn a
      new craft. The one off classes include all the tools and materials needed
      to make your jewellery, and light refreshments. <br /><br />We also take
      group bookings where you can choose the date and topic. <br /><br />
      Get in touch <a href="/contact">here</a>.
    </p>
    <div class="voucher-container">
      <div class="hex-container">
        <Hex
          hexHref={`/shop/category/${
            jewelleryVoucherCategory.id
          }?name=${encodeURIComponent(
            jewelleryVoucherCategory.category_data.name
          )}&imgHash=${encodeURIComponent(
            jewelleryVoucherCategory.custom_attribute_values.image_arr.string_value.split(
              ","
            )[0]
          )}`}
          category={jewelleryVoucherCategory}
          bind:loaded
        />
      </div>
      <p>
        If class dates aren’t yet announced or you're not sure about a date you
        can always buy one of our vouchers.<br /><br />Then contact us to
        arrange a spot in one of our classes.<br /><br />We have three terms of
        classes, January-March, May-July and September-November, and we release
        dates at least a month in advance.
      </p>
    </div>
  </div>

  <div bind:this={ttWidget} class="tt-widget">
    <div class="tt-widget-fallback">
      <p>
        <a
          href="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget"
          target="_blank">Click here to buy tickets</a
        ><br /><small
          ><a
            href="https://www.tickettailor.com?rf=wdg"
            class="tt-widget-powered">Sell tickets online with Ticket Tailor</a
          ></small
        >
      </p>
    </div>
    {#if widgetLoaded}
      <script
        src="https://cdn.tickettailor.com/js/widgets/min/widget.js"
        data-url="https://www.tickettailor.com/all-tickets/enki/"
        data-type="inline"
        data-inline-minimal="false"
        data-inline-show-logo="true"
        data-inline-bg-fill="false"
        data-inline-inherit-ref-from-url-param=""
        data-inline-ref="website_widget"
      ></script>
    {/if}
  </div>
{/if}

<style>
  a {
    cursor: pointer;
  }

  .container {
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

  .hex-container {
    height: 150px;
    position: relative;
    display: flex;
    align-items: center;
    width: 40%;
  }

  .hex-container:hover {
    transform: scale(1.015);
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
    .hex-container {
      height: 200px;
      width: 35%;
    }
  }

  @media (min-width: 600px) {
    .hex-container {
      height: 300px;
      width: 30%;
    }

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
    .hex-container {
      width: 25%;
    }

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
  }

  @media (min-width: 1200px) {
    .hex-container {
      width: 20%;
    }
  }
</style>
