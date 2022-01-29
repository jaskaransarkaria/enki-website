<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);
  // 'fit=crop&crop=focalpoint&fp-x=0.525&fp-y=0.3&fp-z=1.4'
  $: outerWidth = 0;
  $: onlineShopHover = false;
  $: repairsAndCommissionsHover = false;
  $: classesHover = false;
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
    class="repairs-and-comms"
    src="/rep-and-comm-2.png"
    alt="repair and commissions button hover over me"
    on:mouseenter={() => (repairsAndCommissionsHover = true)}
    on:mouseleave={() => (repairsAndCommissionsHover = false)}
    on:click={$goto('/services')}
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

  .repairs-and-comms,
  .online-shop:hover {
    cursor: pointer;
  }

  @media (min-width: 450px) {
    .online-shop {
      width: 70px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 70px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 600px) {
    .online-shop {
      width: 100px;
      grid-column-start: 37;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 100px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 1;
      grid-row-end: span end;
    }
  }

  @media (min-width: 800px) {
    .online-shop {
      width: 120px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 120px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1024px) {
    .online-shop {
      width: 140px;
      grid-column-start: 39;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 140px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1280px) {
    .online-shop {
      width: 180px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 180px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1440px) {
    .online-shop {
      width: 190px;
      grid-column-start: 39;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 190px;
      grid-column-start: 12;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1650px) {
    .online-shop {
      width: 230px;
      grid-column-start: 39;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 225px;
      grid-column-start: 14;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1960px) {
    .online-shop {
      width: 290px;
      grid-column-start: 38;
      grid-column-end: span end;
      grid-row-start: 43;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 260px;
      grid-column-start: 14;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 2200px) {
    .online-shop {
      grid-column-start: 40;
      grid-column-end: span end;
      grid-row-start: 44;
      grid-row-end: span end;
    }

    .repairs-and-comms {
      width: 280px;
      grid-column-start: 14;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }
</style>
