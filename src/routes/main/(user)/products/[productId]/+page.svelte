<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { cart, addToCart } from '../../../../../stores/cart.js';
	import { products_store } from '../../../../../stores/products.js';

	const { productId } = $page.params;

	console.log('Product Id : ', productId);

	console.log('Cart : ', $cart);

	let products_from_store = [];

	$: if ($products_store.length > 0) {
		products_from_store = $products_store;
		console.log('Products from store:', products_from_store);
	}

	//console.log('Products from store : ', products_from_store);

	//console.log('Products , actual : ', $products_store);

	let index_in_cart = -1;

	$: $cart, (index_in_cart = $cart.findIndex((p) => p.id == productId));

	console.log('Index in cart : ', index_in_cart);

	let quantity = 1;

	let products = [
		{
			id: 1,
			name: 'Maruti Suzuki Swift',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.600000',
			description:
				'The Maruti Suzuki Swift is a popular hatchback known for its stylish design, fuel efficiency, and reliable performance.It offers a comfortable interior, advanced features, and a peppy engine, making it a great choice for city driving and short trips.'
		},
		{
			id: 2,
			name: 'Maruti Suzuki Baleno',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.600000',
			description:
				'The Maruti Suzuki Swift is a popular hatchback known for its stylish design, fuel efficiency, and reliable performance.It offers a comfortable interior, advanced features, and a peppy engine, making it a great choice for city driving and short trips.'
		},
		{
			id: 3,
			name: 'Tata Nexon',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.800000',
			description:
				'The Maruti Suzuki Swift is a popular hatchback known for its stylish design, fuel efficiency, and reliable performance.It offers a comfortable interior, advanced features, and a peppy engine, making it a great choice for city driving and short trips.'
		},
		{
			id: 4,
			name: 'Hyundai i20',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.700000',
			description:
				'The Maruti Suzuki Swift is a popular hatchback known for its stylish design, fuel efficiency, and reliable performance.It offers a comfortable interior, advanced features, and a peppy engine, making it a great choice for city driving and short trips.'
		}
	];

	let index = $products_store.findIndex((p) => p._id == productId );

	console.log('Index of the item : ', index);

	let product = {
		id: 1,
		name: 'Maruti Suzuki Swift',
		category: 'Hatchback',
		price: 'Rs.600000',
		img_url: '/car4.png',
		description:
			'The Maruti Suzuki Swift is a popular hatchback known for its stylish design, fuel efficiency, and reliable performance.It offers a comfortable interior, advanced features, and a peppy engine, making it a great choice for city driving and short trips.'
	};

	let featured_product = [
		{
			id: 1,
			name: 'Maruti Suzuki Swift',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car6.png'
		},
		{
			id: 2,
			name: 'Maruti Suzuki Swift',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car6.png'
		},
		{
			id: 3,
			name: 'Maruti Suzuki Swift',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car6.png'
		}
	];

	function add_To_Cart() {
		let cartitem = {
			id: $products_store[index]._id,
			name: $products_store[index].name,
			category: $products_store[index].category,
			price: $products_store[index].saleprice,
			img_url: $products_store[index].images[0],
			quantity: quantity,
			get subtotal() {
				let price = this.price;
				let quantity = this.quantity;
				return price * quantity;
			}
		};

		addToCart(cartitem);

		alert('Product added to cart');
	}
</script>

<div class="product-page">
	<div class="product-route">
		<p class="product-route-text">carsgo.com/home/products/{products_from_store[index].name}</p>
	</div>
	<div class="product-card">
		<div class="product-image">
			<img
				src={products_from_store[index].images[0]}
				alt="Product"
				style="height: 450px; width: 450px"
			/>
		</div>
		<div class="product-info">
			<h1 class="product-name">{products_from_store[index].name}</h1>
			<p class="product-category">{products_from_store[index].category}</p>
			<p class="product-price">Rs. {products_from_store[index].saleprice}</p>
			{#if index_in_cart == -1}
				{console.log('Product does not exist in cart')}
				{console.log($cart)}
				<div class="add-to-cart-parent">
					<input
						class="add-to-cart-quantity"
						type="number"
						bind:value={quantity}
						min="1"
						max="10"
					/>
					<button class="add-to-cart" on:click={add_To_Cart}>Add to Cart</button>
				</div>
			{:else}
				<div class="add-to-cart-parent">
					<button on:click={() => goto('/main/cart')} class="go-to-cart">Go to Cart</button>
				</div>
			{/if}
		</div>
	</div>
	<div class="product-description">
		<p class="description-heading">Product Description</p>
		<p class="description-text">{products_from_store[index].description}</p>
	</div>
	<h1 class="product-heading">Featured Products</h1>
	<div class="featured-products">
		{#each featured_product as fp}
			<div class="featured-product">
				<img src={fp.img_url} alt="Product" style="height: 200px; width: 200px" />
				<p class="featured-product-name">{fp.name}</p>
				<p class="featured-product-category">{fp.category}</p>
				<p class="featured-product-price">{fp.price}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.product-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin: 50px;
	}

	.product-route {
		display: flex;
		color: '#002b1b';
		text-align: left;
	}

	.product-route-text {
		color: white;
		font-size: 20px;
		font-family: 'montserrat', sans-serif;
		position: relative;
		top: -20px;
		left: -300px;
	}

	.product-card {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.product-image {
		width: 40%;
		justify-content: center;
		align-items: center;
		justify-items: center;
		border-color: '#002b1b';
		border-width: 1px;
	}

	.product-info {
		width: 60%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.product-name {
		font-size: 40px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
		margin: 20px;
		position: relative;
		left: 40px;
	}

	.product-price {
		font-size: 30px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
		margin: 20px;
		position: relative;
		left: 40px;
	}

	.product-category {
		font-size: 30px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
		margin: 20px;
		position: relative;
		left: 40px;
	}

	.add-to-cart {
		background-color: #002b1b;
		width: 50%;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		margin: 20px;
	}

	.add-to-cart-parent {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 10px;
	}

	.add-to-cart-quantity {
		background-color: #002b1b;
		width: 60px;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		margin: 20px;
	}

	.go-to-cart {
		background-color: #002b1b;
		width: 50%;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		margin: 20px;
		position: relative;
		left: 40px;
	}

	.featured-products {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6rem;
		justify-items: center;
		align-items: center;
		justify-content: center;
	}

	.featured-product {
		padding: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 20px;
		border-color: #002b1b;
		border-width: 2px;
	}

	.featured-product-name {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.featured-product-price {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.featured-product-category {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.product-heading {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
	}
</style>
