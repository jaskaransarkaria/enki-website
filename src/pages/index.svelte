<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);
  $: outerWidth = 0;
</script>

<svelte:window bind:outerWidth />
<figure>
  <img
    src={`http://enki.imgix.net/inside-enki.png?fit=crop&crop=focalpoint&fp-x=0.525&fp-y=0.3&fp-z=1.4&w=${outerWidth}`}
    alt="welcome to the shop, this ilustration shows the shopkeeper behind her bench"
  />
</figure>

<style>
  figure {
    margin-left: 0;
    margin-right: 0;
  }
</style>
