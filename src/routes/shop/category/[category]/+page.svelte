<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { page } from "$app/state";
  import CategoryView from "$lib/components/CategoryView/CategoryView.svelte";

  let categoryToShow = $derived(page.data.categoryToShow);
  let productArr = $derived(page.data.productArr);

  const name = $derived(categoryToShow?.category_data?.name ?? "");
  const imgHash = $derived(
    categoryToShow?.custom_attribute_values?.image_arr?.string_value?.split(
      ",",
    )[0] ?? "",
  );
</script>

<svelte:head>
  <title>{`${name} | Enki, Kings Heath Birmingham`}</title>
  <meta
    name="description"
    content={`Shop ${name} at Enki, an independent gift shop in Kings Heath, Birmingham. UK delivery, free over £40.`}
  />
  <meta
    property="og:title"
    content={`${name} | Enki, Kings Heath Birmingham`}
  />
  <meta
    property="og:description"
    content={`Shop ${name} at Enki, an independent gift shop in Kings Heath, Birmingham. UK delivery, free over £40.`}
  />
  <meta property="og:image" content={`${PUBLIC_BUCKET_URL}/${imgHash}`} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_GB" />
</svelte:head>

<h1 class="visually-hidden">{name}</h1>

<CategoryView
  {categoryToShow}
  whitelistedUserAgent={page.data.whitelistedUserAgent}
  {productArr}
/>

<style>
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
