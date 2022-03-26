<script context="module">
  import { browser, dev } from "$app/env";

  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = dev;

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser;

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let ttWidget: HTMLElement;
  let widgetLoaded = false;

  onMount(() => {
    ttWidget.className = "tt-widget";
    widgetLoaded = true;
  });
</script>

<div class="container">
  <div class="class-pics">
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
  </div>
  <p>
    Ever wanted to learn to make your own jewellery? Looking for a unique
    present for a friend? <br /><br />At Enki workshops you can meet new people
    and learn a new craft. The one off classes include all the tools and
    materials needed to make your jewellery, soft and hot drinks, and cake from
    the wonderful Early Bird Bakery next door. <br /><br />We also take group
    bookings where you can choose the date and topic, get in contact
    <a href="/contact">here</a> with any enquiries.
  </p>
</div>

<div bind:this={ttWidget} class="tt-widget">
  <div class="tt-widget-fallback">
    <p>
      <a
        href="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget"
        target="_blank">Click here to buy tickets</a
      ><br /><small
        ><a href="https://www.tickettailor.com?rf=wdg" class="tt-widget-powered"
          >Sell tickets online with Ticket Tailor</a
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

<style>
  a {
    cursor: pointer;
  }

  .container {
    display: flex;
    margin: 1em;
    width: 100vw;
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
