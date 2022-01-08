<script lang="ts">
  import Header from '@/components/Header/Header.svelte';
</script>

<Header />
<slot scoped={{ name: 'world' }} />
<h1>footer</h1>

<style>
  h1 {
    text-align: center;
    width: 100px;
  }
</style>
