<script lang="ts">
  import { goto } from '@roxi/routify';

  let toggleOpen = false;

  const toggleAndGo = (dest: string) => {
    toggleOpen = !toggleOpen;
    $goto(dest);
  };
</script>

<div
  class={toggleOpen ? 'open' : ''}
  id="nav-icon3"
  on:click={() => (toggleOpen = !toggleOpen)}
>
  <span />
  <span />
  <span />
  <span />
</div>

{#if toggleOpen}
  <div class="menu">
    <button on:click={() => toggleAndGo('/shop')}> shop </button>
    <button on:click={() => toggleAndGo('/repairs')}> repairs </button>
    <button on:click={() => toggleAndGo('/classes')}> classes </button>
    <button on:click={() => toggleAndGo('/about')}> about </button>
    <button on:click={() => toggleAndGo('/contact')}> contact </button>
  </div>
{/if}

<style>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    z-index: 100;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    all: unset;
    font-family: 'WelcomeHome3 Regular';
    font-size: 3.2em;
    cursor: pointer;
    margin: 30px;
  }

  button:focus {
    border-bottom: 3px solid orange;
  }

  #nav-icon3 {
    position: absolute;
    width: 40px;
    height: 45px;
    margin: 5px;
    z-index: 101;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
  }

  #nav-icon3 span {
    display: block;
    position: absolute;
    height: 3.5px;
    width: 100%;
    background: black;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  #nav-icon3 span:nth-child(1) {
    top: 9px;
  }

  #nav-icon3 span:nth-child(2),
  #nav-icon3 span:nth-child(3) {
    top: 21px;
  }

  #nav-icon3 span:nth-child(4) {
    top: 33px;
  }

  #nav-icon3.open span:nth-child(1) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

  #nav-icon3.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #nav-icon3.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #nav-icon3.open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
  }
</style>
