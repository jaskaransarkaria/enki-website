<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import BackToTop from '$lib/components/BackToTop/BackToTop.svelte';
	import '../app.css';
</script>

<svelte:head>
	<meta property="og:title" content="Enki" />
	<meta property="og:url" content="https://enkionline.com" />
	<meta property="og:image" content="https://enki.imgix.net/about_shop_1.jpg?auto=format,compress" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Independent jewellers and craft gallery -- Kings Heath Bimringham" />
	<meta property="og:locale" content="en_GB" />
</svelte:head>


<div class="container">
	<Header />
	<div class="header-block" />
	<slot />
	<BackToTop />
</div>
<Footer />


<style>
	.container {
		min-height: 100vh;
	}

	.header-block {
		top: 0%;
		height: 55px;
	}

	@media (min-width: 1280px) {
		.header-block {
			height: 65px;
		}
	}

	@media (min-width: 1960px) {
		.header-block {
			height: 75px;
		}
	}
</style>
