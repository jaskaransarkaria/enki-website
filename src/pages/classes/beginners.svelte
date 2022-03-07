<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';
</script>

<div class="container">
  <h1>Beginner's Classes</h1>
  <p>
    Ever wanted to learn to make your own jewellery? <br /> Looking for a unique
    present for a friend? <br /><br />At Enki workshops you can meet new people
    and learn a new craft. The one off classes include all the tools and
    materials needed to make your jewellery, soft and hot drinks, and cake from
    the wonderful Early Bird Bakery next door. <br /><br />We also take group
    bookings where you can choose the date and topic, get in contact
    <a on:click={$goto('/contact')}>here</a> with any enquiries.
  </p>
  <div class="class-pics">
    <img
      in:fade={{ duration: 1200 }}
      src="https://enki.imgix.net/classes_example_1.jpg?auto=format,compress"
      alt="A man and a woman, the man is holding the rings in the palm of his hands"
    />
    <img
      in:fade={{ duration: 1200 }}
      src="https://enki.imgix.net/classes_example_2.jpg?auto=format,compress"
      alt="two women looking longingly into each other's eyes wearing their rings"
    />
    <img
      in:fade={{ duration: 1200 }}
      src="https://enki.imgix.net/classes_example_3.jpg?auto=format,compress"
      alt="enki jewellery ring boxes"
    />
  </div>
</div>

<div class="tt-widget">
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
</div>

<style>
  a {
    cursor: pointer;
  }

  h1 {
    text-align: center;
    font-family: 'WelcomeHome3 Regular';
  }

  .container {
    display: flex;
    margin: 1em;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }

  p {
    width: 60%;
    align-self: center;
    text-align: center;
    font-family: 'Caviar Dreams';
  }

  .class-pics {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 10%;
    justify-content: space-around;
    margin-bottom: 10%;
  }

  .class-pics > img {
    height: 300px;
    padding: 5px;
  }

  @media (min-width: 1280px) {
    .class-pics {
      flex-direction: row;
      width: 40%;
      margin-bottom: 2%;
    }

    p {
      width: 40%;
    }

    .class-pics > img {
      height: 300px;
    }
  }
</style>
