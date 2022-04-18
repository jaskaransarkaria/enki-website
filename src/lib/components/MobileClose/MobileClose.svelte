<script lang="ts">
  export let bool: boolean;
  export let cb: () => void;
  export let positionOverride: string = "";
</script>

<div
  class={bool ? "open" : ""}
  id="nav-icon"
  on:click={cb}
  style={positionOverride}
>
  <span />
  <span />
  <span />
  <span />
</div>

<style>
  #nav-icon {
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

  #nav-icon span {
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

  #nav-icon span:nth-child(1) {
    top: 9px;
  }

  #nav-icon span:nth-child(2),
  #nav-icon span:nth-child(3) {
    top: 21px;
  }

  #nav-icon span:nth-child(4) {
    top: 33px;
  }

  #nav-icon.open span:nth-child(1) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

  #nav-icon.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #nav-icon.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #nav-icon.open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
  }
</style>
