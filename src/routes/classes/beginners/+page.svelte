<script lang="ts">
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import { onMount } from "svelte";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";

  let ttWidget: HTMLElement;
  let widgetLoaded = false;

  onMount(() => {
    ttWidget.className = "tt-widget";
    widgetLoaded = true;
  });

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:window bind:outerWidth />
{#if browser || $page.data.whitelistedUserAgent}
  <div class="container">
    <div class="class-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: "https://enki.imgix.net/classes_example_1.jpg?auto=format,compress",
              alt: "A group photo with everyone showing their jewellery",
            },
            {
              src: "https://enki.imgix.net/classes_example_2.jpg?auto=format,compress",
              alt: "Everyone in the class are wearing their rings and arranged their hands into a circle for the picture",
            },
            {
              src: "https://enki.imgix.net/classes_example_3.jpg?auto=format,compress",
              alt: "the jeweller's table",
            },
          ]}
        />
      {:else}
        <img
          in:fade={{ duration: 600 }}
          src="https://enki.imgix.net/classes_example_1.jpg?auto=format,compress"
          alt="A man and a woman, the man is holding the rings in the palm of his hands"
        />
        <img
          in:fade={{ duration: 600 }}
          src="https://enki.imgix.net/classes_example_2.jpg?auto=format,compress"
          alt="two women looking longingly into each other's eyes wearing their rings"
        />
        <img
          in:fade={{ duration: 600 }}
          src="https://enki.imgix.net/classes_example_3.jpg?auto=format,compress"
          alt="enki jewellery ring boxes"
        />
      {/if}
    </div>
    <p>
      Ever wanted to make your own jewellery? Looking for a unique present for a
      friend? <br /><br />At Enki workshops you can meet new people and learn a
      new craft. The one off classes include all the tools and materials needed
      to make your jewellery, soft and hot drinks, and cake from the wonderful
      Early Bird Bakery next door. <br /><br />We also take group bookings where
      you can choose the date and topic. <br /><br />
      Get in touch <a href="/contact">here</a>.
    </p>
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
        data-inline-ref="website_widget"></script>
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
  }
</style>
