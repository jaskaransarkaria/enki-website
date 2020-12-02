<script lang="ts">
  import Gifts from '../components/Gifts.svelte';
  import Services from '../components/Services.svelte';
  import Classes from '../components/Classes.svelte';
</script>

<style>
  .product-container {
    display: grid;
    grid-template-rows: 10% 40% 50%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .opening-times {
    display: flex;
    flex-direction: column;
    grid-row: 1;
    grid-column: 2;
    text-align: center;
  }

  .products {
    display: flex;
    justify-content: space-around;
    width: 80vw;
    grid-row: 2 /4;
    grid-column: 1 / 4;
  }
</style>

<div class="product-container">
  <div class="opening-times">
    <h1>OPENING TIMES</h1>
    <h2>Monday - Sunday: 10am - 5pm</h2>
  </div>
  <div class="products">
    <Gifts />
    <Services />
    <Classes />
  </div>
</div>
