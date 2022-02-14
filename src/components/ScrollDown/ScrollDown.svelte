<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<section in:fade={{ delay: 500, duration: 1000 }} class="mobile-scroll-prompt">
  <button
    on:click={() =>
      window.scroll({
        top: 750,
        behavior: 'smooth',
      })}><span />scroll</button
  >
</section>

<style>
  .mobile-scroll-prompt button {
    position: absolute;
    left: 50%;
    z-index: 2;
    display: inline-block;
    background: none;
    border: none;
    -webkit-transform: translate(0, -50%);
    transform: translateX(-50%);
    color: black;
    text-align: center;
    font-size: 0.8em;
    font-family: 'Caviar Dreams';
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: opacity 0.3s;
  }
  .mobile-scroll-prompt button:hover {
    opacity: 0.5;
  }

  .mobile-scroll-prompt button {
    padding-top: 60px;
  }

  .mobile-scroll-prompt button span {
    position: absolute;
    top: 15px;
    margin-left: -12px;
    left: 50%;
    width: 24px;
    height: 24px;
    border-left: 1px solid grey;
    border-bottom: 1px solid grey;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    box-sizing: border-box;
  }

  .mobile-scroll-prompt {
    opacity: 1;
    animation: fade 8s ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes fade {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
</style>
