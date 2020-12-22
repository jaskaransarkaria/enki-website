<script lang="ts">
  import { fade } from 'svelte/transition';
  import { goto } from '@roxi/routify';

  let classesImg = '/classes-1.jpg';
  let contactImg = '/contact-1.jpg';
  let repairsAndCommissionsImg = '/rep-and-comm-1.jpg';
  let onlineShopImg = '/online-shop-1.jpg';
</script>

<style>
  .inside-shop {
    margin: 0 10%;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    background-size: auto;
    background-position: center;
    background-image: url('/enki_pic_final.jpg');
    background-repeat: no-repeat;
  }

  .classes-button {
    grid-row: 1 /4;
    grid-column: 9/ 13;
    justify-self: start;
  }

  .contact-button {
    grid-row: 8/ 12;
    grid-column: 9/ 13;
    justify-self: center;
    align-self: flex-start;
    transform: translateX(-10%);
    transform: translateY(5%);
  }

  .online-shop-button {
    grid-column: 4 / 7;
    grid-row: 6/ 11;
    justify-self: center;
    align-self: center;
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

<main class="inside-shop" in:fade>
  <button
    class="classes-button"
    id="classes-button"
    on:mouseover={() => (classesImg = '/classes-1.gif')}
    on:mouseout={() => (classesImg = '/classes-1.jpg')}
    on:click={$goto('/classes')}>
    <img src={classesImg} class="classes-button" alt="classes button" />
  </button>
  <button
    class="contact-button"
    on:mouseover={() => (contactImg = '/contact-1.gif')}
    on:mouseout={() => (contactImg = '/contact-1.jpg')}
    on:click={$goto('/contact')}>
    <img src={contactImg} class="contact-button" alt="contact button" />
  </button>
  <button
    class="online-shop-button"
    on:mouseover={() => (onlineShopImg = '/online-shop-1.gif')}
    on:mouseout={() => (onlineShopImg = '/online-shop-1.jpg')}
    on:click={$goto('/online-shop')}>
    <img
      src={onlineShopImg}
      class="online-shop-button"
      alt="online shop button" />
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
  </button>
</main>
