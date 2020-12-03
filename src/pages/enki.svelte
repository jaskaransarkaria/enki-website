<script lang="ts">
  import { fade } from 'svelte/transition';
  import { goto } from '@roxi/routify';
</script>


<style>
  .inside-shop {
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    width: 100vw;
    height: 100vh;
    background-size: 100vw 100%;
    background-image: url('/inside-enki-min.svg');
    background-repeat: no-repeat;
  }

  .jewellery-services {
    grid-row: 1 / 4;
    grid-column: 3 / 5;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
  }

  .classes {
    grid-row: 1 / 4;
    grid-column: 8 / 10;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
  }

  .online-shop {
    grid-row: 7 / 10;
    grid-column: 5 / 7;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
  }

  .contact {
    grid-row: 8 / 11;
    grid-column: 9 / 11;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
  }

  button:active {
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
  }
</style>

<main class="inside-shop"
in:fade>

<button class="jewellery-services" id="jewellery-services-button" on:click={$goto("/services")}></button>
<button class="classes" id="classes-button" on:click={$goto("/classes")}></button>
<button class="online-shop" id="online-shop-button" on:click={$goto("/online-shop")}></button>
<button class="contact" id="contact-button" on:click={$goto("/contact")}></button>

</main>