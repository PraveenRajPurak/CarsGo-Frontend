<script>
	import { goto } from '$app/navigation';
	import { cart, removeFromCart, clearCart, changeQuantity } from '../../../../stores/cart.js';

	import {
		isLoggedIn,
		user_Data,
		updateUserData,
		user_Extended_Data,
		updateExtendedUserData
	} from '../../../../stores/user.js';

	import {
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		ButtonGroup,
		GradientButton
	} from 'flowbite-svelte';
	import { register_login_popup } from '../../../../stores/user.js';

	let registration_toggler = false;
	let loggedinsucces = false;
	let loginmessage = '';
	let user_data1 = {};

	async function get_user_data() {
		const user_data_from_back = await fetch('http://localhost:10010/users/get-user-by-id', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + $user_Data.SessionToken
			},
			credentials: 'include'
		});

		user_data1 = await user_data_from_back.json();

		console.log('User Data from backend: ', user_data1.data);

		updateExtendedUserData(user_data1.data);
	}

	let email1 = '';
	let password1 = '';
	let password2 = '';
	let phone1 = '';
	let name1 = '';

	function validate_email() {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (email1.length > 0 && email1.length < 50) {
			if (emailRegex.test(email1)) {
				return true;
			} else {
				alert('Enter a valid email address!');
				return false;
			}
		} else {
			alert("Email Field can't be empty and should be less than 50 characters!");
			return false;
		}
	}

	function validate_password() {
		if (password1.length > 0 && password1.length < 50) {
			return true;
		} else {
			alert("Password Field can't be empty and should be less than 50 characters!");
			return false;
		}
	}

	function confirm_password() {
		if (password1 == password2) {
			return true;
		} else {
			alert('Passwords do not match!');
			return false;
		}
	}

	function validate_phone() {
		if (
			phone1.length == 10 &&
			(phone1[0] == 9 || phone1[0] == 8 || phone1[0] == 7 || phone1[0] == 6)
		) {
			return true;
		} else {
			alert('Enter a valid phone number!');
			return false;
		}
	}

	function validate_name() {
		if (name1.length > 0 && name1.length < 50) {
			return true;
		} else {
			alert("Name Field can't be empty and should be less than 50 characters!");
			return false;
		}
	}

	function validationCheck() {
		return (
			validate_email() &&
			validate_password() &&
			confirm_password() &&
			validate_phone() &&
			validate_name()
		);
	}

	async function registration(event) {
		event.preventDefault();
		if (!validationCheck()) return;
		const user = {
			email: email1,
			password: password1,
			phone: phone1,
			name: name1
		};

		console.log('User Data: ', user);

		const formData = new FormData();
		formData.append('email', user.email);
		formData.append('password', user.password);
		formData.append('phone', user.phone);
		formData.append('name', user.name);

		const response = await fetch('?/signup', { method: 'POST', body: formData });

		const res = await response.json();

		console.log('Response received in html : ', res);

		let parsedData = JSON.parse(res.data);

		const { success, message } = parsedData[0];

		if (parsedData[success]) {
			alert('Registration successful!');
			registration_toggler = false;
		} else {
			alert(message);
		}
	}

	let cartItems = [];

	$: $cart, (cartItems = $cart);

	let sum = 0;

	$: {
		sum = 0;
		for (let i = 0; i < cartItems.length; i++) {
			console.log(cartItems[i]);
			let item_price = parseInt(cartItems[i].price);
			let item_quantity = cartItems[i].quantity;
			sum += item_price * item_quantity;
		}
	}
</script>

<Modal
	bind:open={$register_login_popup}
	size="md"
	autoclose={false}
	class="w-full"
	style="background: linear-gradient(150deg,black, #002b1b, black);"
>
	{#if loggedinsucces}
		<div>
			{loginmessage}
		</div>
	{:else}
		<ButtonGroup style="position : relative; left: 220px;">
			<GradientButton
				on:click={() => {
					registration_toggler = true;
				}}
				shadow
				color="green">Register</GradientButton
			>
			<GradientButton
				on:click={() => {
					registration_toggler = false;
				}}
				shadow
				color="teal">Login</GradientButton
			>
		</ButtonGroup>
		{#if registration_toggler}
			<section style="background-color: transparent;">
				<div class="flex flex-col items-center justify-center">
					<div
						class="w-full rounded-lg shadow sm:max-w-md"
						style="background-color: transparent; border-color: #E5E7EB;"
					>
						<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1
								class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
								style="color: aliceblue;"
							>
								Create an account
							</h1>
							<form class="space-y-4 md:space-y-6">
								<div>
									<label
										for="email"
										class="block mb-2 text-sm font-medium"
										style="color: aliceblue;">Your email</label
									>
									<input
										type="email"
										name="email"
										id="email"
										bind:value={email1}
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required=""
									/>
								</div>
								<div>
									<label for="name" class="block mb-2 text-sm font-medium" style="color: aliceblue;"
										>Your name</label
									>
									<input
										type="name"
										name="name"
										id="name"
										bind:value={name1}
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="John"
										required=""
									/>
								</div>
								<div>
									<label
										for="phone"
										class="block mb-2 text-sm font-medium"
										style="color: aliceblue;">Your phone</label
									>
									<input
										type="phone"
										name="phone"
										id="phone"
										bind:value={phone1}
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="9XXXXXXXXX"
										required=""
									/>
								</div>
								<div>
									<label
										for="password"
										class="block mb-2 text-sm font-medium"
										style="color: aliceblue;">Password</label
									>
									<input
										type="password"
										name="password"
										id="password"
										bind:value={password1}
										placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>
								<div>
									<label
										for="confirm-password"
										class="block mb-2 text-sm font-medium"
										style="color: aliceblue;">Confirm password</label
									>
									<input
										type="confirm-password"
										name="confirm-password"
										id="confirm-password"
										bind:value={password2}
										placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>
								<button
									on:click={() => {
										registration(event);
									}}
									type="submit"
									class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									>Create an account</button
								>
							</form>
						</div>
					</div>
				</div>
			</section>
		{:else}
			<section style="background-color: transparent;">
				<div class="flex flex-col items-center justify-center">
					<div
						class="w-full rounded-lg shadow sm:max-w-md"
						style="background-color: transparent; border-color: #E5E7EB;"
					>
						<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1
								class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
								style="color: aliceblue;"
							>
								Sign in to your account
							</h1>
							<form
								class="space-y-4 md:space-y-6"
								method="post"
								on:submit|preventDefault={async (event) => {
									const formData = new FormData(event.target);
									const response = await fetch('?/login', { method: 'POST', body: formData });
									const res = await response.json();

									console.log('Response received in html : ', res);

									let parsedData = JSON.parse(res.data);

									console.log('Parsed data: ', parsedData);

									const { success, message, email, id, name, session_token } = parsedData[0];

									console.log('Login Success:', parsedData[success]);
									console.log('Message:', parsedData[message]);
									console.log('Email:', parsedData[email]);
									console.log('ID:', parsedData[id]);
									console.log('Name:', parsedData[name]);
									console.log('Session Token:', parsedData[session_token]);

									if (parsedData[success]) {
										loggedinsucces = true;
										loginmessage = 'Successfully logged in!';
										$isLoggedIn = true;
										$register_login_popup = true;
										updateUserData({
											Email: parsedData[email],
											ID: parsedData[id],
											Name: parsedData[name],
											SessionToken: parsedData[session_token]
										});

										await get_user_data();
									} else {
										loginmessage = res.error;
										loggedinsucces = false;
									}
								}}
							>
								<div>
									<label
										for="email"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										style="color: aliceblue;">Your email</label
									>
									<input
										type="email"
										name="email"
										id="email"
										class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required=""
									/>
								</div>
								<div>
									<label
										for="password"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										style="color: aliceblue;">Password</label
									>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>
								<button
									type="submit"
									class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									>Sign in</button
								>
							</form>
						</div>
					</div>
				</div>
			</section>
		{/if}
	{/if}
</Modal>

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
							<img src={item.img_url} alt="Product" class="product-img" />
							<p class="product-text">{item.name}</p>
						</div>

						<div class="single-item">
							<p class="single-item-text">Rs.{item.price}</p>
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
				<h1 class="cart-heading" style="text-align: center;">Total</h1>
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
		text-align: center;
	}

	.empty-cart-text {
		font-size: 18px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		text-align: center;
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
		width: 100%;
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
		width: 100%;
		justify-content: center;
		align-items: center;
		justify-items: center;
		text-align: center;
		border-color: #0aac71;
		border-width: 1.5px;
	}

	.product-img {
		height: 100px;
		width: 100px;
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
		width: 100%;
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

	@media (min-width: 900px) and (max-width: 1300px) {
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
			width: 100%;
			margin: 1.2rem 1.2rem 0px 1.2rem;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			border-width: 1.5px;
		}

		.items {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;
			margin: 0rem 1.2rem 1.2rem 1.2rem;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			border-width: 1.5px;
		}

		.product-img {
			height: 80px;
			width: 80px;
			margin-right: 0.75rem;
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
			font-size: 15px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.item {
			display: flex;
			flex-direction: row;
			flex: 1;
			width: 100%;
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
			font-size: 15px;
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
			width: 500px;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			border-right-width: 1.5px;
		}

		.product-text {
			font-size: 15px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.Total-cart {
			display: flex;
			flex-direction: column;
			flex: 0 0 auto;
			width:100%;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
		}

		.total-price-holder {
			display: flex;
			flex-direction: row;
			flex: 0 0 auto;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			position: relative;
			left: 20px;
			top: 20px;
			width: 100%;
			margin: 0.55rem;
		}

		.total-price {
			font-size: 25px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
			position: relative;
			top: -12px;
		}

		.checkout-btn {
			background-color: #002b1b;
			color: white;
			font-size: 20px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			border-radius: 5px;
			padding: 10px;
			
		}
	}
	@media (min-width: 600px) and (max-width: 900px) {
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
			width: 100%;
			margin: 1.2rem 1.2rem 0px 1.2rem;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			border-width: 1.5px;
		}

		.items {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;
			margin: 0rem 1.2rem 1.2rem 1.2rem;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			border-width: 1.5px;
		}

		.product-img {
			height: 60px;
			width: 60px;
			margin-right: 0.75rem;
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
			font-size: 18.5px;
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
			font-size: 15px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.item {
			display: flex;
			flex-direction: row;
			flex: 1;
			width: 100%;
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
			font-size: 12px;
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
			width: 380px;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			border-right-width: 1.5px;
		}

		.product-text {
			font-size: 12px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.Total-cart {
			display: flex;
			flex-direction: column;
			flex: 0 0 auto;
			width:100%;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
		}

		.total-price-holder {
			display: flex;
			flex-direction: row;
			flex: 0 0 auto;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			position: relative;
			left: 20px;
			top: 20px;
			width: 100%;
			margin: 0.55rem;
		}

		.total-price {
			font-size: 25px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
			position: relative;
			top: -12px;
		}

		.checkout-btn {
			background-color: #002b1b;
			color: white;
			font-size: 20px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			border-radius: 5px;
			padding: 10px;
			
		}
	}
	@media (max-width: 600px) {
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
			width: 100%;
			margin: 1.2rem 1.2rem 0px 1.2rem;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			border-width: 1.5px;
		}

		.items {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;
			margin: 0rem 1.2rem 1.2rem 1.2rem;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
		}

		.product-img {
			height: 40px;
			width: 40px;
			margin-right: 0.45rem;
		}

		.quantity-btn {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			justify-items: center;
			position: relative;
			left: 10px;
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
			font-size: 18.5px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			padding: 5.5px;
		}

		.hitems {
			width: 25%;
			justify-content: center;
			align-self: center;
			justify-self: center;
		}

		.hitems-text {
			font-size: 12px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.item {
			display: flex;
			flex-direction: row;
			flex: 1;
			width: 100%;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			border-color: #0aac71;
			
		}

		.single-item {
			display: flex;
			flex-direction: row;
			width: 25%;
			height: 100%;
			justify-content: center;
			align-self: center;
			justify-self: center;
			height: 100px;
			position: relative;
		}

		.single-item-text {
			font-size: 12px;
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
			width: 250px;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
		}

		.product-text {
			font-size: 12px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.Total-cart {
			display: flex;
			flex-direction: column;
			flex: 0 0 auto;
			width:100%;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
		}

		.total-price-holder {
			display: flex;
			flex-direction: row;
			flex: 0 0 auto;
			justify-content: center;
			align-items: center;
			justify-items: center;
			text-align: center;
			position: relative;
			left: 20px;
			top: 20px;
			width: 100%;
			margin: 0.55rem;
		}

		.total-price {
			font-size: 25px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			color: white;
			position: relative;
			top: -12px;
		}

		.checkout-btn {
			background-color: #002b1b;
			color: white;
			font-size: 20px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			border-radius: 5px;
			padding: 10px;
			
		}
	}
</style>
