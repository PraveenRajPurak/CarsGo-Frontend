<script>
	import { afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { products_store, addProduct, updateProducts } from '../../../../stores/products.js';
	import { register_login_popup } from '../../../../stores/user.js';

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

<div class="product-list">
	<h1 class="product-heading" style="align-self: center; margin-top: 30px;">Our Categories</h1>
	<div class="categories">
		{#each Categories as category}
			<div
				class="category"
				on:click={() => {
					handlecategoryClick(category);
				}}
			>
				<img src="/{category.name}.png" alt="category" class="category-image" />
				<p class="category-name">{category.name}</p>
			</div>
		{/each}
	</div>

	{#if category_info}
		<div class="category-ctn">
			<h1 class="product-heading" style="margin-top:30px; align-self: center;">
				Our {category_selected.name} Collection...
			</h1>
			{#if products_from_store.length != Products.length}
				<button
					class="clear-filters-btn"
					on:click={() => {
						category_info = false;
						products_from_store = Products;
						goto('/main/products');
					}}
				>
					Clear Filters
				</button>
			{/if}
		</div>

		<p class="category-description" style="align-self: center;">
			{category_selected.general_description}
		</p>
	{/if}

	{#if !category_info}
		<h1 class="product-heading" style="margin-top:40px; align-self: center;">Our Products</h1>
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
		</div>
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
		background-color: transparent;
		border-color: #002b1b;
		border-top-width: 0.65px;
		border-left-width: 0.65px;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		align-items: center;
		justify-items: center;
		position: relative;
		margin-left: 1.8rem;
	}
	.clear-filters-btn:hover {
		background-color: transparent;
		border-color: #002b1b;
		border-bottom-width: 0.65px;
		border-right-width: 0.65px;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		align-items: center;
		justify-items: center;
		position: relative;
		margin-left: 1.8rem;
	}
	.product-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		justify-items: center;
	}

	.categories {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-self: center;
		align-items: center;
		justify-items: center;	
		margin-left: 5rem;	
	}

	.category {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;
		align-items: center;
		justify-items: center;
		margin-right: 120px;
		cursor: pointer;
	}

	.category-image {
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
	}

	.category-name {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	@media (min-width: 650px) and (max-width: 750px) {
		.category {
			margin-right: 80px;
		}
	}
	@media (max-width: 650px) {
		.category {
			margin-right: 50px;
		}

		.categories {
			left: 14px;
			align-self: center;
			margin-bottom: 2rem;
		}

		.category-image {
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
		}

		.category-name {
			font-size: 10px;
			margin-bottom: -20px;
		}
	}

	.product-heading {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.products-main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 6rem;
		justify-content: center;
		align-items: start;
		margin: 2rem 8rem 6rem 8rem;
	}

	.product {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border-color: #002b1b;
		border-width: 0.5px;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		cursor: pointer;
	}

	.product:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
	}

	.product img {
		max-width: 100%;
		height: auto;
		border-radius: 5px;
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
		margin-left: 30px;
		margin-right: 30px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.category-ctn {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}
</style>
