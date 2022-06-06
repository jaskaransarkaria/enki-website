<script context="module">
  import { browser } from "$app/env";
  import { isWhitelistedUserAgent } from "$lib/utils/consts";

  export async function load({ session }) {
    return {
      props: {
        whitelistedUserAgent: isWhitelistedUserAgent(session.userAgent),
      },
    };
  }
</script>

<script lang="ts">
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";
  export let whitelistedUserAgent: boolean;

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:head>
  <meta
    property="og:image"
    content="https://enki.imgix.net/services_4.jpg?auto=format,compress"
  />
  <meta property="og:url" content="https://enkionline.com/repairs" />
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || whitelistedUserAgent}
  <div class="container">
    <br />
    <div class="shop-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: "https://enki.imgix.net/services_1.jpg?auto=format,compress",
              alt: "a ring being polished on a polishing machine",
            },
            {
              src: "https://enki.imgix.net/services_2.jpg?auto=format,compress",
              alt: "a jewellery machine for pressing metal",
            },
            {
              src: "https://enki.imgix.net/services_4.jpg?auto=format,compress",
              alt: "a medallion being heated with a blow touch",
            },
            {
              src: "https://enki.imgix.net/services_3.jpg?auto=format,compress",
              alt: "some jewellery pliers and some jewellery being inspected",
            },
          ]}
        />
      {:else}
        <img
          in:fade={{ duration: 600 }}
          class="extra-width"
          src="https://enki.imgix.net/services_1.jpg?auto=format,compress"
          alt="a ring being polished on a polishing machine"
        />
        <img
          in:fade={{ duration: 600 }}
          src="https://enki.imgix.net/services_2.jpg?auto=format,compress"
          alt="a jewellery machine for pressing metal"
        />
        <img
          in:fade={{ duration: 600 }}
          class="extra-width"
          src="https://enki.imgix.net/services_3.jpg?auto=format,compress"
          alt="some jewellery pliers and some jewellery being inspected"
        />
        <img
          in:fade={{ duration: 600 }}
          src="https://enki.imgix.net/services_4.jpg?auto=format,compress"
          alt="a medallion being heated with a blow touch"
        />
      {/if}
    </div>
    <div class="repair-content">
      {#if isMobile}
        <p>
          Got a necklace you're afraid to wear because the clasp sometimes
          fails? Have a ring you've loved for such a long time that the shank
          has worn away to nothing? We hate to see jewellery thrown away, bring
          it in and we’ll get it back to its former glory. We can even create a
          new partner for a lonely earring! <a href="/contact">Get in touch.</a>
        </p>
        <div class="repairs-price-list">
          <a href="/repairs/silver-jewellery-price-list.pdf"
            ><img alt="sliver repairs price list" src="/silver.png" /></a
          >
          <a href="/repairs/9ct-jewellery-price-list.pdf"
            ><img alt="9ct gold repairs list" src="/9_carat.png" /></a
          >
          <a href="/repairs/18ct-jewellery-price-list.pdf"
            ><img alt="18ct gold repairs list" src="/18_carat.png" /></a
          >
          <a href="/repairs/platinum-jewellery-price-list.pdf"
            ><img alt="platinum repairs list" src="/platinum.png" /></a
          >
        </div>
      {:else}
        <div class="left-repair-content">
          <p>
            Got a necklace you're afraid to wear because the clasp sometimes
            fails? Have a ring you've loved for such a long time that the shank
            has worn away to nothing? We hate to see jewellery thrown away,
            bring it in and we’ll get it back to its former glory. We can even
            create a new partner for a lonely earring! <a href="/contact"
              >Get in touch.</a
            >
          </p>
          <div class="repairs-price-list">
            <a href="/repairs/silver-jewellery-price-list.pdf"
              ><img alt="sliver repairs price list" src="/silver.png" /></a
            >
            <a href="/repairs/9ct-jewellery-price-list.pdf"
              ><img alt="9ct gold repairs list" src="/9_carat.png" /></a
            >
            <a href="/repairs/18ct-jewellery-price-list.pdf"
              ><img alt="18ct gold repairs list" src="/18_carat.png" /></a
            >
            <a href="/repairs/platinum-jewellery-price-list.pdf"
              ><img alt="platinum repairs list" src="/platinum.png" /></a
            >
          </div>
        </div>
      {/if}
      <div class="testimonials-container">
        {#if isMobile}
          <h2>Testimonials</h2>
          <p>
            "Beautiful little shop. I needed a bracelet repaired and a ring
            setting. Faith gave me some great advice and the repairs were done
            quickly." - Alexandra B
          </p>
          <hr style="width: 90%" />
          <p>
            "Had my wedding ring cut off due to swollen finger, it was repaired
            with an additional piece added, not the slightest sign anything had
            happened . Would recommend her to anyone. Thank you." - Will M
          </p>
          <hr style="width: 90%" />
          <p>
            "I ran into trouble restoring an old Gretsch snare drum of huge
            sentimental value to me - the modern part I'd sourced in the USA
            arrived but some delicate filing was needed in order to fit the part
            to the existing mechanism… The staff were friendly and took a real
            interest in the project and carefully carried out the delicate job
            there and then. I could not be happier and would highly recommend
            the store, its staff and their considerable - and adaptable -
            expertise." - Dave T
          </p>
          <hr style="width: 90%" />
          <p>
            "I took a diamond ring to Enki to be repaired. The lady listened to
            my description of what was wrong. She used several tools to look at
            the ring and complete the repair. I was in and out in ten minutes
            with my ring repaired and very shiny. Fantastic service and very
            knowledgeable. Highly recommended." - Claire B
          </p>
        {:else}
          <blockquote>
            Beautiful little shop. I needed a bracelet repaired and a ring
            setting. Faith gave me some great advice and the repairs were done
            quickly.
            <footer>
              <cite>Alexandra B</cite>
            </footer>
          </blockquote>
          <blockquote>
            I'd been restoring a snare drum of huge sentimental value to me but
            the part I'd sourced needed some delicate filing to fit the existing
            mechanism… The staff took a real interest in the project and carried
            out the job there and then. I could not be happier and would highly
            recommend the store, its staff and their considerable and adaptable
            expertise.
            <footer>
              <cite>Dave T</cite>
            </footer>
          </blockquote>
          <blockquote>
            Had my wedding ring cut off due to swollen finger, it was repaired
            with an additional piece added, not the slightest sign anything had
            happened. Would recommend her to anyone. Thank you.
            <footer>
              <cite>Will M</cite>
            </footer>
          </blockquote>
          <blockquote>
            I took a diamond ring to Enki to be repaired. The lady listened to
            my description of what was wrong. She used several tools to look at
            the ring and complete the repair. I was in and out in ten minutes
            with my ring repaired and very shiny. Fantastic service and very
            knowledgeable. Highly recommended.
            <footer>
              <cite>Claire B</cite>
            </footer>
          </blockquote>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  h2 {
    text-align: center;
    font-family: "Welcomehome5 Regular";
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }

  .repair-content {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-self: center;
  }

  .repairs-price-list {
    width: 100%;
    text-align: center;
  }

  .repairs-price-list > a {
    margin: 1em;
    width: 80%;
    justify-self: center;
  }

  .repairs-price-list > a > img {
    margin-top: 1em;
    width: 80%;
  }

  .left-repair-content {
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .left-repair-content > p {
    width: 70%;
    font-size: 2em;
    padding: 1em;
    border: 0.2em solid var(--accent-color);
    text-align: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
  }

  .testimonials-container {
    display: flex;
    flex-direction: column;
  }

  blockquote {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-family: "Caviar Dreams";
    position: relative;
    margin: 1em;
    width: 15vw;
    height: 15vw;
    top: 50%;
    left: 50%;
    width: 70%;
    transform: translate(-50%, -50%);
    border: 0.2em solid var(--accent-color);
    text-align: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
  }

  cite {
    font-family: "Caviar Dreams Italic";
  }

  blockquote:before {
    font-family: "Caviar Dreams";
    color: var(--accent-color);
    position: absolute;
    font-size: 6em;
    line-height: 1;
    top: 0;
    left: 0;
    content: "\201C";
  }
  blockquote:after {
    font-family: "Caviar Dreams";
    color: var(--accent-color);
    position: absolute;
    /* display: block; don't use this, it raised the quote too high from the bottom - defeated line-height? */
    float: right;
    font-size: 6em;
    line-height: 1;
    right: 0;
    bottom: -0.5em;
    content: "\201D";
  }
  blockquote footer {
    padding: 0 2em 0 0;
    text-align: right;
  }
  blockquote cite:before {
    content: "\2013";
  }

  .testimonials-container > p {
    margin: 1em;
  }

  .shop-pics {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10%;
    align-self: center;
    justify-content: center;
  }

  .shop-pics > * {
    width: 20%;
    padding: 5px;
  }

  .extra-width {
    width: 30%;
  }

  p {
    width: 90%;
    align-self: center;
    text-align: center;
    font-family: "Caviar Dreams";
  }

  @media (min-width: 600px) {
    .repairs-price-list {
      display: grid;
      align-self: center;
      height: auto;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .repairs-price-list > a > img {
      width: 100%;
    }

    .repairs-price-list > a > img:hover {
      transform: scale(1.015);
    }
  }

  @media (min-width: 960px) {
    .left-repair-content > p {
      font-size: 1em;
    }

    blockquote {
      font-size: 0.6em;
      padding: 0.3em;
    }

    .testimonials-container {
      flex-direction: row;
      align-items: flex-start;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .repair-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .testimonials-container > p {
      align-self: flex-start;
    }

    hr {
      display: none;
    }
  }

  @media (min-width: 1280px) {
    .left-repair-content > p {
      font-size: 100%;
    }

    blockquote {
      font-size: 0.7em;
    }

    .repairs-price-list > a {
      margin: 0.5em;
    }
  }

  @media (min-width: 1400px) {
    blockquote {
      font-size: 0.8em;
    }
  }

  @media (min-width: 1600px) {
    blockquote {
      font-size: 0.9em;
    }

    .left-repair-content > p {
      font-size: 1.5em;
    }
  }

  @media (min-width: 1920px) {
    blockquote {
      font-size: 1.1em;
    }

    .left-repair-content > p {
      font-size: 1.6em;
    }
  }

  @media (min-width: 2200px) {
    blockquote {
      font-size: 1.2em;
    }
  }
</style>
