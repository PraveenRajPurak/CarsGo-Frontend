<script>
	import { goto } from '$app/navigation';
	import { cart, removeFromCart, clearCart, changeQuantity } from '../../../../stores/cart.js';

	let cartItems = [];

	$: $cart, (cartItems = $cart);

	let cartitems = [
		{
			id: 1,
			name: 'Maruti Suzuki Swift',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car4.png',
			quantity: 1,
			get subtotal() {
				let price = this.price.substring(3);
				let quantity = this.quantity;
				return price * quantity;
			}
		},
		{
			id: 2,
			name: 'Maruti Suzuki Baleno',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car4.png',
			quantity: 2,
			get subtotal() {
				let price = this.price.substring(3);
				let quantity = this.quantity;
				return price * quantity;
			}
		}
	];

	let sum = 0;

	$: {
		sum = 0;
		for (let i = 0; i < cartItems.length; i++) {
			console.log(cartItems[i]);
			let item_price = parseInt(cartItems[i].price.substring(3));
			let item_quantity = cartItems[i].quantity;
			sum += item_price * item_quantity;
		}
	}
</script>

<div class="cart-page">
	{#if cartItems.length == 0}
		<div class="empty-cart">
			<p class="empty-cart-title">Your Cart is empty</p>
			<img src="/empty_cart.png" alt="Empty Cart" style="width: 300px; height: 300px;" />
			<p class="empty-cart-text">
				Looks like you have not added in your cart. Explore the richest catalogue of cars
			</p>
			<button class="btn-go-to-products" on:click={() => goto('/main/products')}
				>Go to Products</button
			>
		</div>
	{:else}
		<h1 class="cart-heading">Your Cart</h1>
		<div class="cart">
			<div class="header">
				<div class="hitems"><p class="hitems-text">Product</p></div>
				<div class="hitems"><p class="hitems-text">Price</p></div>
				<div class="hitems"><p class="hitems-text">Quantity</p></div>
				<div class="hitems"><p class="hitems-text">Subtotal</p></div>
			</div>
			<div class="items">
				{#each cartItems as item}
					<div class="item">
						<div class="product">
							<img src={item.img_url} alt="Product" style="height: 100px; width: 100px;" />
							<p class="product-text">{item.name}</p>
						</div>

						<div class="single-item">
							<p class="single-item-text">{item.price}</p>
						</div>

						<div class="single-item">
							<p class="single-item-text">{item.quantity}</p>
							<div class="quantity-btn">
								<button
									class="quantity-btn-inc"
									style="color: #0aac71"
									on:click={() => {
										changeQuantity(item, item.quantity + 1);
									}}>+</button
								>
								<button
									class="quantity-btn-dec"
									style="color: #0aac71"
									on:click={() => {
										if (item.quantity - 1 > 0) {
											changeQuantity(item, item.quantity - 1);
										} else {
											removeFromCart(item);
										}
									}}>-</button
								>
							</div>
						</div>

						<div class="single-item">
							<p class="single-item-text">{'Rs.' + item.subtotal}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="Total-cart">
			<div class="total-price-holder">
				<h1 class="cart-heading">Total</h1>
				<h1 class="total-price">{sum}</h1>
			</div>
			<button
				class="checkout-btn"
				on:click={() => {
					goto('/main/checkout');
				}}>Checkout</button
			>
		</div>
	{/if}
</div>

<style>
	.empty-cart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin: 50px;
		color: white;
	}

	.empty-cart-title {
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
	}

	.empty-cart-text {
		font-size: 18px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
	}

	.btn-go-to-products {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		margin: 20px;
	}
	.cart-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin: 50px;
	}

	.cart-heading {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.cart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.header {
		display: flex;
		flex-direction: row;
		flex: 1;
		width: 900px;
		justify-content: center;
		align-items: center;
		justify-items: center;
		text-align: center;
		margin-top: 20px;
		border-color: #0aac71;
		border-width: 1.5px;
	}

	.items {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 900px;
		justify-content: center;
		align-items: center;
		justify-items: center;
		text-align: center;
		border-color: #0aac71;
		border-width: 1.5px;
	}

	.quantity-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		position: relative;
		left: 20px;
	}

	.quantity-btn-inc {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		padding: 3px;
		border-bottom-width: 1px;
		border-bottom-color: #0aac71;
	}

	.quantity-btn-dec {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		padding: 5.5px;
	}

	.hitems {
		width: 25%;
		justify-content: center;
		align-self: center;
		justify-self: center;
		border-right-width: 1.5px;
	}

	.hitems-text {
		font-size: 18px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.item {
		display: flex;
		flex-direction: row;
		flex: 1;
		width: 900px;
		justify-content: center;
		align-items: center;
		justify-items: center;
		text-align: center;
		border-color: #0aac71;
		border-width: 1.5px;
	}

	.single-item {
		display: flex;
		flex-direction: row;
		width: 25%;
		height: 100%;
		justify-content: center;
		align-self: center;
		justify-self: center;
		border-right-width: 1.5px;
		height: 100px;
		position: relative;
	}

	.single-item-text {
		font-size: 18px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
		position: relative;
		top: 38px;
	}

	.product {
		height: 100px;
		display: flex;
		flex-direction: row;
		flex: 1;
		width: 900px;
		justify-content: center;
		align-items: center;
		justify-items: center;
		text-align: center;
		border-color: #0aac71;
		border-right-width: 1.5px;
	}

	.product-text {
		font-size: 18px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.Total-cart {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 900px;
		justify-content: right;
		align-items: right;
		justify-items: right;
		text-align: right;
	}

	.total-price-holder {
		display: flex;
		flex-direction: row;
		flex: 1;
		width: 400px;
		justify-content: right;
		align-items: right;
		justify-items: right;
		text-align: right;
		margin-bottom: 20px;
		position: relative;
		left: 400px;
		top: 20px;
	}

	.total-price {
		margin-left: 20px;
		font-size: 30px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.checkout-btn {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
	}
</style>
