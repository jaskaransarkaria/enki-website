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

<button class="back-to-top" on:click={goTop} class:hidden>^</button>

<style>
  .back-to-top {
    position: sticky;
    bottom: 5vh;
    left: 95vw;
    opacity: 1;
    border-radius: 100%;
    transition: opacity 0.5s, visibility 0.5s;
    z-index: 99;
    color: grey;
    width: 30px;
    height: 30px;
    cursor: pointer;
    text-align: center;
    margin: 5px auto 20px auto;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
