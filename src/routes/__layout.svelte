<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import BackToTop from '$lib/components/BackToTop/BackToTop.svelte';
	import '../app.css';
</script>

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
