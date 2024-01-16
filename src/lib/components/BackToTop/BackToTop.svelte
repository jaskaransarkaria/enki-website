<script>
  import backToTopImg from "$lib/assets/back_to_top_3.png";

  export let showOnPx = 150;
  let hidden = true;

  function goTop() {
    document.body.scrollIntoView();
  }

  function scrollContainer() {
    return document.documentElement || document.body;
  }

  function handleOnScroll() {
    if (!scrollContainer()) {
      return;
    }

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false;
    } else {
      hidden = true;
    }
  }
</script>

<svelte:window on:scroll={handleOnScroll} />

<button class="back-to-top" on:click={goTop} class:hidden
  ><img src={backToTopImg} alt="back to the top button" /></button
>

<style>
  .back-to-top {
    all: unset;
    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s;
    position: sticky;
    bottom: 5vh;
    left: 100%;
    z-index: 98;
    cursor: pointer;
    padding-bottom: 0.75em;
    width: 10%;
  }

  img {
    width: 80%;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }

  @media (min-width: 960px) {
    .back-to-top {
      width: 5%;
    }
  }
</style>
