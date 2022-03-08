<script lang="ts">
  import { fade } from 'svelte/transition';

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:window bind:outerWidth />
<div class="container">
  <br />
  <div class="shop-pics">
    <img
      in:fade={{ duration: 1200 }}
      class="extra-width"
      src="https://enki.imgix.net/services_1.jpg?auto=format,compress"
      alt="a ring being polished on a polishing machine"
    />
    {#if !isMobile}
      <img
        in:fade={{ duration: 1200 }}
        src="https://enki.imgix.net/services_2.jpg?auto=format,compress"
        alt="a jewellery machine for pressing metal"
      />
    {/if}
    {#if isMobile}
      <img
        in:fade={{ duration: 1200 }}
        src="https://enki.imgix.net/services_4.jpg?auto=format,compress"
        alt="a medallion being heated with a blow touch"
      />
    {/if}
    <img
      in:fade={{ duration: 1200 }}
      class="extra-width"
      src="https://enki.imgix.net/services_3.jpg?auto=format,compress"
      alt="some jewellery pliers and some jewellery being inspected"
    />
    {#if !isMobile}
      <img
        in:fade={{ duration: 1200 }}
        src="https://enki.imgix.net/services_4.jpg?auto=format,compress"
        alt="a medallion being heated with a blow touch"
      />
    {/if}
  </div>
  <p>
    Got a necklace you're afraid to wear because the clasp sometimes fails? Have
    a ring you've loved for such a long time that the shank has worn away to
    nothing? We hate to see jewellery thrown away, bring it in and we’ll get it
    back to its former glory. We can even create a new partner for a lonely
    earring! Click here to get in touch.
  </p>
  <h2>Testimonials</h2>
  <div class="testimonials-container">
    {#if isMobile}
      <p>
        "Beautiful little shop. I needed a bracelet repaired and a ring setting.
        Faith gave me some great advice and the repairs were done quickly." -
        Alexandra B
      </p>
      <hr style="width: 100%" />
      <p>
        "Had my wedding ring cut off due to swollen finger, it was repaired with
        an additional piece added, not the slightest sign anything had happened
        . Would recommend her to anyone. Thank you." - Will M
      </p>
    {:else}
      <p>
        "Beautiful little shop. I needed a bracelet repaired and a ring setting.
        Faith gave me some great advice and the repairs were done quickly." -
        Alexandra B
        <br />
        <br />
        "Had my wedding ring cut off due to swollen finger, it was repaired with
        an additional piece added, not the slightest sign anything had happened .
        Would recommend her to anyone. Thank you." - Will M
      </p>
    {/if}
    <hr style="width: 100%" />
    <p>
      "I ran into trouble restoring an old Gretsch snare drum of huge
      sentimental value to me - the modern part I'd sourced in the USA arrived
      but some delicate filing was needed in order to fit the part to the
      existing mechanism… The staff were friendly and took a real interest in
      the project and carefully carried out the delicate job there and then. I
      could not be happier and would highly recommend the store, its staff and
      their considerable - and adaptable - expertise." - Dave T
    </p>
    <hr style="width: 100%" />
    <p>
      "I took a diamond ring to Enki to be repaired. The lady listened to my
      description of what was wrong. She used several tools to look at the ring
      and complete the repair. I was in and out in ten minutes with my ring
      repaired and very shiny. Fantastic service and very knowledgeable. Highly
      recommended." - Claire B
    </p>
  </div>
</div>

<style>
  h2 {
    text-align: center;
    font-family: 'WelcomeHome3 Regular';
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }

  .testimonials-container {
    display: flex;
    flex-direction: column;
    width: 90%;
  }

  .testimonials-container > p {
    margin: 1em;
  }

  .shop-pics {
    display: flex;
    flex-direction: row;
    width: 70%;
    height: 10%;
    align-self: center;
    justify-content: center;
  }

  .shop-pics > * {
    width: 25%;
    padding: 5px;
  }

  .extra-width {
    width: 45%;
  }

  p {
    width: 90%;
    align-self: center;
    text-align: center;
    font-family: 'Caviar Dreams';
  }

  @media (min-width: 960px) {
    .testimonials-container {
      flex-direction: row;
      align-items: flex-start;
    }

    .testimonials-container > p {
      align-self: flex-start;
    }

    hr {
      display: none;
    }
  }
</style>
