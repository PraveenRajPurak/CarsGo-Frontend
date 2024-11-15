<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		isLoggedIn,
		user_Data,
		updateUserData,
		user_Extended_Data,
		updateExtendedUserData
	} from '../../../../../stores/user.js';

	import {
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		ButtonGroup,
		GradientButton
	} from 'flowbite-svelte';
	import { register_login_popup } from '../../../../../stores/user.js';
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

	let email1='';
	let password1='';
	let password2='';
	let phone1='';
	let name1='';

	function validate_email() {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (email1.length > 0 && email1.length < 50) {

			if (emailRegex.test(email1)) {
				return true;
			}
			else {
				alert('Enter a valid email address!');
				return false;
			}
		} else {
			alert('Email Field can\'t be empty and should be less than 50 characters!');
			return false;
		}
	}

	function validate_password() {
		if (password1.length > 0 && password1.length < 50) {
			return true;
		} else {
			alert('Password Field can\'t be empty and should be less than 50 characters!');
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
		if (phone1.length == 10 && (phone1[0] == 9 || phone1[0] == 8 || phone1[0] == 7 || phone1[0] == 6)) {
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
			alert('Name Field can\'t be empty and should be less than 50 characters!');
			return false;
		}
	}	

	function validationCheck() {
		return validate_email() && validate_password() && confirm_password() && validate_phone() && validate_name();
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

		console.log("User Data: ", user);

		const formData = new FormData();
		formData.append('email', user.email);
		formData.append('password', user.password);
		formData.append('phone', user.phone);
		formData.append('name', user.name);

		const response = await fetch('?/signup', { method: 'POST', body: formData });

		const res = await response.json();

		console.log('Response received in html : ', res);

		let parsedData = JSON.parse(res.data);

		const { success, message} = parsedData[0];

		if (parsedData[success]) {
			alert("Registration successful!");
			registration_toggler = false;
		}
		else {
			alert(message);
		}
	}

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
									<label
										for="name"
										class="block mb-2 text-sm font-medium"										
										style="color: aliceblue;">Your name</label
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
									on:click={()=>{
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
