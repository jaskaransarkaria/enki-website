<script lang="ts">
  import { fade } from 'svelte/transition';
  import { goto } from '@roxi/routify';
</script>

<style>
  .inside-shop {
    margin: 0 10%;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    width: 80%;
    height: 100vh;
    background-size: 100% 100%;
    background-image: url('/inside-enki-min.png');
    background-repeat: no-repeat;
  }


  .jewellery-services {
    grid-row: 1 / 4;
    grid-column: 1 / 4;
  }

  .classes {
    grid-row: 1 / 4;
    grid-column: 8 / 12;
  }

  .online-shop {
    grid-row: 7 / 10;
    grid-column: 4 / 7;
  }

  .contact {
    grid-row: 8 / 11;
    grid-column: 10 / 14;
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
    class="jewellery-services"
    id="jewellery-services-button"
    on:click={$goto('/services')} />
  <button class="classes" id="classes-button" on:click={$goto('/classes')} />
  <button
    class="online-shop"
    id="online-shop-button"
    on:click={$goto('/online-shop')} />
  <button class="contact" id="contact-button" on:click={$goto('/contact')} />
</main>
