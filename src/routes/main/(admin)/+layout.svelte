<script>
	import Footer from '$lib/Footer/footer.svelte';
	import Header from '$lib/Header/header.svelte';
</script>

<div class="admin-section">
	 <slot/>
</div>

<style>
	.admin-section {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(150deg, #002b1b, black, black);
		padding: 0;
		margin: 0;
	}

</style>
