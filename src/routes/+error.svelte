<script lang="ts">
  import notFoundImg from "$lib/assets/404.png";
</script>

<div>
  <img
    src={notFoundImg}
    alt="scissors cutting string representing a 404 page not found"
  />
</div>

<style>
  div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3em;
  }

  img {
    position: absolute;
    max-width: 100%;
  }
</style>
