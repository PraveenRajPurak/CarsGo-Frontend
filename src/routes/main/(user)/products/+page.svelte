<script>
	import { afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { products_store, addProduct, updateProducts } from '../../../../stores/products.js';

	let Products = [];

	let Categories = [];

	export let data;

	console.log('Data : ', data.products.data);

	console.log('Data2 : ', data.categories.data);

	Products = data.products.data;

	Categories = data.categories.data;

	console.log('Products fetched from backend: ', Products);

	console.log('Categories fetched from backend: ', Categories);

	updateProducts(Products);

	console.log('Products from store: ', $products_store);

	let products_from_store = [];
	let products_from_store_copy = [];

	$: $products_store, (products_from_store = $products_store);
	products_from_store_copy = products_from_store;

	afterUpdate(() => {
		console.log('Products from store (after update): ', products_from_store);
	});

	let categories = [
		{
			id: 1,
			name: 'Hatchback',
			img_url: '/car4.png'
		},
		{
			id: 2,
			name: 'Sedan',
			img_url: '/car5.png'
		},
		{
			id: 1,
			name: 'SUV',
			img_url: '/car6.png'
		}
	];

	let products_ = [
		{
			id: 1,
			name: 'Maruti Suzuki Swift',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.6,00,000'
		},
		{
			id: 2,
			name: 'Maruti Suzuki Baleno',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.6,00,000'
		},
		{
			id: 3,
			name: 'Tata Nexon',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.8,00,000'
		},
		{
			id: 4,
			name: 'Hyundai i20',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.7,00,000'
		}
	];

	let category_info = false;

	let category_selected = {};

	function handlecategoryClick(category) {
		console.log('Clicked on category: ', category.name);
		products_from_store = products_from_store_copy;
		products_from_store = Products.filter((p) => p.category == category.name);
		category_selected = category;
		category_info = true;
	}
</script>

<div class="product-list">
	<h1 class="product-heading">Our Categories</h1>
	<div class="categories">
		{#each Categories as category}
			<div
				class="category"
				on:click={() => {
					handlecategoryClick(category);
				}}
			>
				<img
					src="/{category.name}.png"
					alt="category"
					style="width: 100px; height: 100px; border-radius: 50%;"
				/>
				<p class="category-name">{category.name}</p>
			</div>
		{/each}
	</div>

	{#if category_info}
		<h1 class="product-heading" style="margin-top:30px;">
			Our {category_selected.name} Collection...
		</h1>
		<p class="category-description">{category_selected.general_description}</p>
	{/if}

	{#if !category_info}
		<h1 class="product-heading" style="margin-top:30px;">Our Products</h1>
	{/if}

	<div class="products-main">
		{#each products_from_store as product}
			<div
				on:click={() => {
					goto('/main/products/' + product._id);
				}}
				class="product"
			>
				<img src={product.images[0]} alt="product" style="width: 200px; height: 200px;" />
				<p class="product-name">{product.name}</p>
				<p class="product-category">{product.category}</p>
				<div class="product-prices">
					<p class="product-price-rgl"><s>Rs.{product.regularprice}</s>&nbsp;&nbsp;</p>
					<p class="product-price-sale">Rs.{product.saleprice}</p>
				</div>
			</div>
		{/each}
		<div
			on:click={() => {
				goto('/main/products/' + product._id);
			}}
			class="more-parent"
		>
			<h1 class="cinzel-more-design-top">More Cars</h1>
			<img src="/more_left.png" alt="product" style="width: 250px; height: 250px;" />
			<h1 class="cinzel-more-design-btm" style="margin-top: -60px;">Coming Soon</h1>

			<!-- <div class="product-prices">
					<p class="product-price-rgl"><s>Rs.{product.regularprice}</s>&nbsp;&nbsp;</p>
					<p class="product-price-sale">Rs.{product.saleprice}</p>
				</div> -->
		</div>
		{#if products_from_store.length != Products.length} 
		<button class="clear-filters-btn" on:click={() => {
			category_info = false;
			products_from_store = Products;
			goto('/main/products')}}> Clear Filters </button>
		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

	.cinzel-more-design-top {
		font-family: 'Cinzel', serif;
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
		font-size: 32px;
		color: white;
	}
	.cinzel-more-design-btm {
		font-family: 'Cinzel', serif;
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
		font-size: 32px;
		color: rgb(255, 242, 242);
	}
	.more-parent {
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 20px;
		border-color: #002b1b;
		border-left-width: 0.5px;
		border-bottom-width: 0.5px;
		border-bottom-left-radius: 15%;
	}
	.more-design {
		font-size: 30px;
		font-weight: 600;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.clear-filters-btn {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 20px;
	}
	.product-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 40px;
	}

	.categories {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		position: relative;
		left: 55px;
	}

	.category {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-right: 120px;
	}

	.product-heading {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.category-name {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.products-main {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6rem;
		justify-items: center;
		align-items: center;
		justify-content: center;
	}

	.product {
		padding: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 20px;
		border-color: #002b1b;
		border-width: 2px;
		cursor: pointer;
	}

	.product-name {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.product-price-rgl {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: rgb(164, 164, 164);
	}

	.product-price-sale {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.product-prices {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.product-category {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.category-description {
		margin-top: 10px;
		margin-bottom: 30px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}
</style>
