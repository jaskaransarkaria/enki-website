<script>
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
  ><img src="/back_to_top.png" alt="back to the top button" /></button
>

<style>
  .back-to-top {
    all: unset;
    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s;
    position: sticky;
    bottom: 5vh;
    left: 100%;
    z-index: 99;
    cursor: pointer;
    padding-right: 0.5em;
    padding-bottom: 0.75em;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
