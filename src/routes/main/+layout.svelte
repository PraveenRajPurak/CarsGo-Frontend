<script>
	import Footer from '$lib/footer.svelte';
	import Header from '$lib/header.svelte';
</script>

<div class="home-page">
	<Header />
	 <slot/>
	<Footer />
</div>

<style>
	.home-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(150deg, #002b1b, black, black);
		padding: 0;
		margin: 0;
	}

	
</style>
