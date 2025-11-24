<script lang="ts">
  import IntersectionObserver from "./IntersectionObserver.svelte";
  import Image from "./Image.svelte";

  interface Props {
    src: string;
    alt: string;
  }

  let { src, alt }: Props = $props();
</script>

<IntersectionObserver once={true} >
  {#snippet children({ intersecting })}
    {#if intersecting}
      <Image {alt} {src} />
    {/if}
  {/snippet}
</IntersectionObserver>
