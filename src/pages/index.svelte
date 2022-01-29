<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);
  // 'fit=crop&crop=focalpoint&fp-x=0.525&fp-y=0.3&fp-z=1.4'
  $: outerWidth = 0;
  $: onlineShopHover = false;
</script>

<svelte:window bind:outerWidth />
<figure>
  <img
    class="inside-shop"
    src={`http://enki.imgix.net/inside-enki${
      outerWidth <= 360 ? '-mobile' : '-no-signs'
    }.png?${outerWidth <= 360 ? 'fit=crop' : 'format=auto'}&w=${outerWidth}`}
    alt="welcome to the shop, this ilustration shows the shopkeeper behind her bench"
  />
  <img
    class="online-shop"
    src={`https://enki.imgix.net/online-shop.${
      onlineShopHover ? 'gif' : 'png'
    }`}
    alt="online shop button hover over me"
    on:mouseenter={() => (onlineShopHover = true)}
    on:mouseleave={() => (onlineShopHover = false)}
    on:click={$goto('/shop')}
  />
</figure>

<style>
  figure {
    display: grid;
    grid-template-columns: repeat(100, 1fr);
    grid-template-rows: repeat(100, 1fr);
    width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }

  .inside-shop {
    grid-column-start: 1;
    grid-column-end: span end;
    grid-row-start: 1;
    grid-row-end: span end;
  }

  .online-shop:hover {
    cursor: pointer;
  }

  @media (min-width: 2400px) {
    .online-shop {
      grid-column-start: 40;
      grid-column-end: span end;
      grid-row-start: 44;
      grid-row-end: span end;
    }
  }
</style>
