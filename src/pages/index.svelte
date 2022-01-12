<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);
</script>

<figure>
  <img
    src="https://enki.imgix.net/inside-enki.png?fm=webp&fit=crop&w=280&h=300"
    alt="welcome to the shop, this ilustration shows the shopkeeper behind her bench"
  />
</figure>

<style>
  img {
    position: absolute;
    top: 10%;
  }
</style>
