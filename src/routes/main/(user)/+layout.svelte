<script>
	import Footer from '$lib/Footer/footer.svelte';
	import Header from '$lib/Header/header.svelte';
</script>

<div class="users-section">
	<Header />
	<hr class="line-separator" />
	 <slot/>
	<Footer />
</div>

<style>
	.users-section {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(150deg, #002b1b, black, black);
		padding: 0;
		margin: 0;
	}

	
	.line-separator {
		border-width: 1px;
		border-color: #9ef8bb;
		width: 100%;
		position: relative;
		top: -8px;
	}
</style>
