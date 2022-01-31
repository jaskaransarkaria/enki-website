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
  $: contactHover = false;
</script>

<svelte:window bind:outerWidth />
<figure>
  <img
    class="inside-shop"
    src={`http://enki.imgix.net/inside-enki${
      outerWidth <= 450 ? '-mobile' : '-no-signs'
    }.png?${outerWidth <= 450 ? 'fit=crop' : 'format=auto'}&w=${outerWidth}`}
    alt="welcome to the shop, this ilustration shows the shopkeeper behind her bench"
  />
  <img
    class="repairs-and-comms"
    src={repairsAndCommissionsHover
      ? '/jewellery_services.gif'
      : '/jewellery_services.png'}
    alt="repair and commissions button hover over me"
    on:mouseenter={() => (repairsAndCommissionsHover = true)}
    on:mouseleave={() => (repairsAndCommissionsHover = false)}
    on:click={$goto('/services')}
  />
  <img
    class="classes"
    src={classesHover ? '/classes.gif' : '/classes.png'}
    alt="classes button hover over me"
    on:mouseenter={() => (classesHover = true)}
    on:mouseleave={() => (classesHover = false)}
    on:click={$goto('/classes')}
  />
  <img
    class="online-shop"
    src={`https://enki.imgix.net/${
      onlineShopHover ? 'online_shop.gif' : 'online-shop.png'
    }`}
    alt="online shop button hover over me"
    on:mouseenter={() => (onlineShopHover = true)}
    on:mouseleave={() => (onlineShopHover = false)}
    on:click={$goto('/shop')}
  />
  <img
    class="contact"
    src={contactHover ? '/contact.gif' : '/contact.png'}
    alt="online shop button hover over me"
    on:mouseenter={() => (contactHover = true)}
    on:mouseleave={() => (contactHover = false)}
    on:click={$goto('/contact')}
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

  .contact,
  .classes,
  .repairs-and-comms,
  .online-shop:hover {
    cursor: pointer;
  }

  @media (min-width: 450px) {
    .contact {
      width: 50px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 70px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 600px) {
    .contact {
      width: 80px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 100px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 1;
      grid-row-end: span end;
    }
  }

  @media (min-width: 800px) {
    .contact {
      width: 100px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 120px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 1;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1024px) {
    .contact {
      width: 120px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 140px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1280px) {
    .contact {
      width: 160px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 180px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1440px) {
    .contact {
      width: 170px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 180px;
      grid-column-start: 66;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1650px) {
    .contact {
      width: 210px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 225px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 1960px) {
    .contact {
      width: 270px;
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 260px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }

  @media (min-width: 2200px) {
    .contact {
      grid-column-start: 70;
      grid-column-end: span end;
      grid-row-start: 50;
      grid-row-end: span end;
    }

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

    .classes {
      width: 280px;
      grid-column-start: 68;
      grid-column-end: span end;
      grid-row-start: 5;
      grid-row-end: span end;
    }
  }
</style>
