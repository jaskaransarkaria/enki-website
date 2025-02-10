<script lang="ts">
  import servicesOneJpg from "$lib/assets/services_1.jpg";
  import servicesTwoJpg from "$lib/assets/services_2.jpg";
  import servicesThreeJpg from "$lib/assets/services_3.jpg";
  import servicesFourJpg from "$lib/assets/services_4.jpg";
  import servicesOneAvif from "$lib/assets/services_1.avif";
  import servicesTwoAvif from "$lib/assets/services_2.avif";
  import servicesThreeAvif from "$lib/assets/services_3.avif";
  import servicesFourAvif from "$lib/assets/services_4.avif";
  import nineCaret from "$lib/assets/9_carat.png";
  import eighteenCaret from "$lib/assets/18_carat.png";
  import platinum from "$lib/assets/platinum.png";
  import silver from "$lib/assets/silver.png";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:head>
  <title>{"Enki - Repairs"}</title>
  <meta property="og:image" content={servicesFourJpg} />
  <meta property="og:url" content="https://enkionline.com/repairs" />
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || $page.data.whitelistedUserAgent}
  <div class="container">
    <br />
    <div class="shop-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: isAvifSupported ? servicesOneAvif : servicesOneJpg,
              alt: "a ring being polished on a polishing machine",
            },
            {
              src: isAvifSupported ? servicesTwoAvif : servicesTwoJpg,
              alt: "a jewellery machine for pressing metal",
            },
            {
              src: isAvifSupported ? servicesFourAvif : servicesFourJpg,
              alt: "a medallion being heated with a blow touch",
            },
            {
              src: isAvifSupported ? servicesThreeAvif : servicesThreeJpg,
              alt: "some jewellery pliers and some jewellery being inspected",
            },
          ]}
        />
      {:else}
        <img
          in:fade={{ duration: 600 }}
          class="extra-width"
          src={isAvifSupported ? servicesOneAvif : servicesOneJpg}
          alt="a ring being polished on a polishing machine"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? servicesTwoAvif : servicesTwoJpg}
          alt="a jewellery machine for pressing metal"
        />
        <img
          in:fade={{ duration: 600 }}
          class="extra-width"
          src={isAvifSupported ? servicesThreeAvif : servicesThreeJpg}
          alt="some jewellery pliers and some jewellery being inspected"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? servicesFourAvif : servicesFourJpg}
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
          <a href="/repairs/silver-jewellery-price-list-10-02-25.pdf"
            ><img alt="sliver repairs price list" src={silver} /></a
          >
          <a href="/repairs/9ct-jewellery-price-list-10-02-25.pdf"
            ><img alt="9ct gold repairs list" src={nineCaret} /></a
          >
          <a href="/repairs/18ct-jewellery-price-list-10-02-25.pdf"
            ><img alt="18ct gold repairs list" src={eighteenCaret} /></a
          >
          <a href="/repairs/platinum-jewellery-price-list-10-02-25.pdf"
            ><img alt="platinum repairs list" src={platinum} /></a
          >
        </div>
      {:else}
        <div class="left-repair-content">
          <div class="repairs-price-list">
            <a href="/repairs/silver-jewellery-price-list-10-02-25.pdf"
              ><img alt="sliver repairs price list" src={silver} /></a
            >
            <a href="/repairs/9ct-jewellery-price-list-10-02-25.pdf"
              ><img alt="9ct gold repairs list" src={nineCaret} /></a
            >
            <a href="/repairs/18ct-jewellery-price-list-10-02-25.pdf"
              ><img alt="18ct gold repairs list" src={eighteenCaret} /></a
            >
            <a href="/repairs/platinum-jewellery-price-list-10-02-25.pdf"
              ><img alt="platinum repairs list" src={platinum} /></a
            >
          </div>
        </div>
        <p>
          Got a necklace you're afraid to wear because the clasp sometimes
          fails? Have a ring you've loved for such a long time that the shank
          has worn away to nothing? We hate to see jewellery thrown away, bring
          it in and we’ll get it back to its former glory. We can even create a
          new partner for a lonely earring! <a href="/contact">Get in touch</a>.
        </p>
      {/if}
    </div>
    <div class="testimonials-container">
      {#if isMobile}
        <h2>Testimonials</h2>
        <p>
          "Beautiful little shop. I needed a bracelet repaired and a ring
          setting. Faith gave me some great advice and the repairs were done
          quickly." - Alexandra B
        </p>
        <hr style:width="90%" />
        <p>
          "Had my wedding ring cut off due to swollen finger, it was repaired
          with an additional piece added, not the slightest sign anything had
          happened . Would recommend her to anyone. Thank you." - Will M
        </p>
        <hr style:width="90%" />
        <p>
          "I ran into trouble restoring an old Gretsch snare drum of huge
          sentimental value to me - the modern part I'd sourced in the USA
          arrived but some delicate filing was needed in order to fit the part
          to the existing mechanism… The staff were friendly and took a real
          interest in the project and carefully carried out the delicate job
          there and then. I could not be happier and would highly recommend the
          store, its staff and their considerable - and adaptable - expertise."
          - Dave T
        </p>
        <hr style:width="90%" />
        <p>
          "I took a diamond ring to Enki to be repaired. The lady listened to my
          description of what was wrong. She used several tools to look at the
          ring and complete the repair. I was in and out in ten minutes with my
          ring repaired and very shiny. Fantastic service and very
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
          I took a diamond ring to Enki to be repaired. The lady listened to my
          description of what was wrong. She used several tools to look at the
          ring and complete the repair. I was in and out in ten minutes with my
          ring repaired and very shiny. Fantastic service and very
          knowledgeable. Highly recommended.
          <footer>
            <cite>Claire B</cite>
          </footer>
        </blockquote>
      {/if}
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

  .repair-content > p {
    height: 50%;
    width: auto;
    font-size: 1em;
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
    width: 75%;
    height: 10%;
    align-self: center;
    justify-content: center;
  }

  .shop-pics > * {
    height: 100%;
    max-width: 30%;
    padding: 5px;
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
    .repair-content > p {
      font-size: 1em;
    }

    blockquote {
      font-size: 0.6em;
      padding: 0.3em;
    }

    .testimonials-container {
      flex-direction: row;
      justify-content: center;
      width: 100%;
    }

    .repair-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    hr {
      display: none;
    }

    .shop-pics {
      height: 250px;
    }
  }

  @media (min-width: 1280px) {
    .repair-content > p {
      font-size: 100%;
    }

    blockquote {
      font-size: 0.7em;
    }

    .repairs-price-list > a {
      margin: 0.5em;
    }

    .shop-pics {
      height: 300px;
    }
  }

  @media (min-width: 1400px) {
    blockquote {
      font-size: 0.8em;
    }

    .shop-pics {
      height: 350px;
    }
  }

  @media (min-width: 1600px) {
    blockquote {
      font-size: 0.9em;
    }

    .repair-content > p {
      font-size: 1.5em;
    }

    .shop-pics {
      height: 400px;
    }
  }

  @media (min-width: 1920px) {
    blockquote {
      font-size: 1em;
    }

    .shop-pics {
      height: 450px;
    }
  }

  @media (min-width: 2200px) {
    blockquote {
      font-size: 1.2em;
    }

    .repair-content > p {
      font-size: 2em;
    }
  }
</style>
