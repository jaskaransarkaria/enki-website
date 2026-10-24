<script lang="ts">
  let { clickFn = () => {} } = $props();
</script>

<button type="button" aria-label="Copy" onclick={() => clickFn()}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="#ff6600"
    class="bi bi-copy"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
    />
  </svg>
</button>

<style>
  button {
    background: none;
    border: 0;
    padding: 3%;
    cursor: pointer;
  }

  .bi:hover {
    cursor: pointer;
  }
</style>
