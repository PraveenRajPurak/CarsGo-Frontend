<script>
    import 
	let cartitems = [
		{
			id: 1,
			name: 'Maruti Suzuki Swift',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car4.png',
			quantity: 1
		},
		{
			id: 2,
			name: 'Maruti Suzuki Baleno',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car4.png',
			quantity: 2
		}
	];

	let sum = 0;


    $: {
        sum = 0;
        for (let i = 0; i < cartitems.length; i++) {
            sum += cartitems[i].price * cartitems[i].quantity;
        }
    }
</script>

<div class="cart-page">
	<h1 class="cart-heading">Your Cart</h1>
	<div class="cart">
		<div class="header">
			<div class="hitems"><p class="hitems-text">Product</p></div>
			<div class="hitems"><p class="hitems-text">Quantity</p></div>
			<div class="hitems"><p class="hitems-text">Price</p></div>
			<div class="hitems"><p class="hitems-text">Subtotal</p></div>
		</div>
		<div class="items">
			{#each cartitems as item}
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
                    </div>
    
                    <div class="single-item">
                        <p class="single-item-text">{item.price * item.quantity}</p>
                    </div>
                </div>
			{/each}
		</div>
	</div>

	<div class="total">
		<p class="total-text">Total</p>
		<p class="total-price">{sum}</p>
	</div>

    <div class="Total-cart">
        <h1 class="cart-heading">Total</h1>
        <h1>{sum}</h1>
        <button class="checkout" on:click={() => {goto ('/main/checkout') }}>Checkout</button>
    </div>
</div>

<style>
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
</style>
