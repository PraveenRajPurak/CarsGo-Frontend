<script>
    import { goto } from '$app/navigation';
	let products = [];

	export let data;

	console.log('Admin products: ', data.products.data);

	products = data.products.data;
</script>

<div class="admin-products">
	<h1 class="admin-products-heading">Products</h1>

	{#each products as product}
		<div class="product">
			<h2 class="product-name">{product.name}</h2>
			<p class="product-text">Category: {product.category}</p>
			<p class="product-text">Regular Price: {product.regularprice}</p>
			<p class="product-text">Sale Price: {product.saleprice}</p>
			<button
				on:click={() => {
					goto('admin_products/' + product._id);
				}}
				type="button"
				class="modify-btn text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
				>Modify this product</button
			>
		</div>
	{/each}
</div>

<style>
	.admin-products {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.admin-products-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
	}

	.product {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 300%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #002b1b;
	}

	.product-name {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.product-text {
		font-size: 16px;
		margin-bottom: 5px;
	}

	.modify-btn {
		background-color: #4caf50;
		color: white;
		border: none;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin-top: 10px;
		cursor: pointer;
	}

	.product-name {
		color: white;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.product-text {
		color: white;
		font-size: 16px;
		margin-bottom: 5px;
	}
</style>
