<script lang="ts">
  import { url } from '@roxi/routify';
  import { fade } from 'svelte/transition';
  import Navbar from '../components/Navbar.svelte';
  import Products from '../components/Products.svelte'

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);

  let selected = false;
</script>

<style>
  .tagline {
    color: white;
    grid-row: 2;
    grid-column: 2;
    justify-self: start;
    align-self: center;
    text-align: left;
    font-weight: 400;
    font-family: Questrial, sans-serif;
  }

  .tagline h3 {
    font-size: 24px;
  }

  .tagline h5, a {
    font-size: 18px;
  }

  a {
    color: white;
  }
  .homepage-background {
    display: grid;
    grid-template-rows: 20% auto 10%;
    grid-template-columns: 25% auto 10%;
    width: 100vw;
    height: 100vh;
    background-size: 100vw 100%;
    background-image: url('/outer-shop.png');
    background-repeat: no-repeat;
    /* border: lawngreen 5px solid; */
  }

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

  .homepage-background.selected {
    background-image: url('/homepage-mock.jpeg');
    -webkit-animation: fadein 0.6s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 0.6s; /* Firefox < 16 */
    -ms-animation: fadein 0.6s; /* Internet Explorer */
    -o-animation: fadein 0.6s; /* Opera < 12.1 */
    animation: fadein 0.6s;
  }


@media only screen and (min-width: 960px) {
  .tagline h3 {
    font-size: 34px;
  }

  .tagline h5, a {
    font-size: 24px;
  }
}

</style>

<main
  class="homepage-background"
  class:selected
  on:click={() => (selected = true)}
  in:fade>
  <Navbar />
  <div
  class="tagline">
    <h3>Artisan gifts and cards delivered</h3>
    <h3>to your door</h3>
    <h5>Jewellery repairs, commissions and classes</h5>
    <a href={$url('/about')}>Find out more about us</a>
  </div>
</main>
<Products />
