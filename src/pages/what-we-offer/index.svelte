<script lang="ts">
  import { fade } from 'svelte/transition';
  import { goto } from '@roxi/routify';

  let classesImg = '/classes-1.jpg';
  let contactImg = '/contact-1.jpg';
  let repairsAndCommissionsImg = '/rep-and-comm-1.jpg';
  let onlineShopImg = '/online-shop-1.jpg';
</script>

<div class="inside-shop" in:fade>
  <!-- <picture class="image"> -->
  <!-- "https://enki.imgix.net/inside-enki.png?&auto=format&fit=crop&w=1340&h=1000&crop=faces" -->
  <!-- "https://enki.imgix.net/inside-enki.png?&auto=format&fit=fill&w=1800" -->
  <!-- <source
    srcset={`/inside-enki-1824.webp`}
    media="(min-width:1824px)" /> -->
  <!-- <source
    srcset={`/inside-enki-1424.webp`}
    media="(min-width:1424px)" /> -->
  <!-- <source
    srcset={`/inside-enki-1280.webp`}
    media="(min-width:1280px)" /> -->
  <!-- <source
    srcset={`/inside-enki-960.webp`}
    media="(min-width:960px)" /> -->
  <!-- <img
    src={`https://enki.imgix.net/inside-enki.png?&fit=fill&w=${window.screen.width}&h=${window.screen.height}`}
    alt="inside the shop at enki" /> -->
  <!-- </picture> -->
  <!-- <div class="background">
  </div> -->
  <button
    class="classes-button"
    on:mouseover={() => (classesImg = '/classes-1.gif')}
    on:mouseout={() => (classesImg = '/classes-1.jpg')}
    on:click={$goto('/classes')}
  >
    <img src={classesImg} class="classes-img" alt="classes button" />
  </button>
  <button
    class="online-shop-button"
    on:mouseover={() => (onlineShopImg = '/online-shop-1.gif')}
    on:mouseout={() => (onlineShopImg = '/online-shop-1.jpg')}
    on:click={$goto('/online-shop')}
  >
    <img src={onlineShopImg} class="online-shop-img" alt="online shop button" />
  </button>
  <!-- <button
    class="contact-button"
    on:mouseover={() => (contactImg = '/contact-1.gif')}
    on:mouseout={() => (contactImg = '/contact-1.jpg')}
    on:click={$goto('/contact')}>
    <img src={contactImg} class="contact-button" alt="contact button" />
  </button>
  <button
    class="repairs-and-commissions-button"
    on:mouseover={() => (repairsAndCommissionsImg = '/rep-and-comm-1.gif')}
    on:mouseout={() => (repairsAndCommissionsImg = '/rep-and-comm-1.jpg')}
    on:click={$goto('/services')}>
    <img
      src={repairsAndCommissionsImg}
      class="repairs-and-commissions-button"
      alt="repairs and commissions button" />
  </button> -->
</div>

<style>
  .inside-shop {
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    border: 2px solid salmon;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 90vh;
  }

  @media (min-width: 960px) {
    .inside-shop {
      background-image: url('/inside-enki-960.webp');
    }
    .classes-button {
      grid-row: 3 / 6;
      grid-column: 8/ 10;
      justify-self: start;
    }

    .classes-img {
      width: 13.75rem;
    }

    .online-shop-button {
      grid-column: 4 / 9;
      grid-row: 7/ 8;
      justify-self: center;
      align-self: flex-end;
    }

    .online-shop-img {
      width: 12rem;
    }
  }
  @media (min-width: 1280px) {
    .inside-shop {
      background-image: url('/inside-enki-1280.webp');
    }

    .classes-button {
      grid-row: 1 / 5;
      grid-column: 7/ 12;
      justify-self: center;
    }

    .classes-img {
      width: 16rem;
    }

    .online-shop-button {
      grid-column: 5 / 9;
      grid-row: 6 / 8;
      justify-self: flex-start;
      align-self: flex-start;
    }

    .online-shop-img {
      width: 14rem;
    }
  }
  @media (min-width: 1424px) {
    .inside-shop {
      background-image: url('/inside-enki-1424.webp');
    }
    .classes-button {
      grid-column: 6/ 12;
      grid-row: 2/ 5;
    }

    .classes-img {
      width: 14.7rem;
    }

    .online-shop-img {
      width: 15.5rem;
    }
  }

  @media (min-width: 1824px) {
    .inside-shop {
      background-image: url('/inside-enki-1824.webp');
    }
    .classes-button {
      grid-row: 1/ 5;
    }

    .classes-img {
      width: 17.5rem;
    }

    .online-shop-button {
      grid-column: 4 / 9;
      justify-self: center;
    }

    .online-shop-img {
      width: 19rem;
    }
  }
  @media (min-width: 2040px) {
    .classes-button {
      grid-column: 8/ 10;
      grid-row: 1/ 5;
      justify-self: flex-start;
    }
  }
  @media (min-width: 2080px) {
    .classes-button {
      grid-column: 7/ 11;
      justify-self: center;
    }
  }
  @media (min-width: 2240px) {
    .classes-button {
      grid-column: 8/ 12;
      align-self: flex-end;
      justify-self: flex-start;
    }

    .classes-img {
      width: 18rem;
    }
  }

  .contact-button {
    grid-row: 8/ 12;
    grid-column: 9/ 13;
    justify-self: center;
    align-self: flex-start;
    transform: translateX(-10%);
    transform: translateY(5%);
  }

  .repairs-and-commissions-button {
    grid-column: 2 / 5;
    grid-row: 1/ 4;
    justify-content: start;
  }

  .repairs-and-commissions-button:hover {
    width: 225px;
    height: 225px;
    grid-column: 2 / 5;
    grid-row: 1/ 4;
    justify-content: end;
  }

  button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
  button:active {
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
</style>
