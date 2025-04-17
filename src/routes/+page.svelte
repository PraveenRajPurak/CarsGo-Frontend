<script>
	import { afterUpdate } from 'svelte';
	import Footer from '$lib/Footer/footer.svelte';
	import Header from '$lib/Header/header.svelte';
	import { goto } from '$app/navigation';
	import {
		isLoggedIn,
		user_Data,
		updateUserData,
		user_Extended_Data,
		updateExtendedUserData
	} from '../stores/user';

	import {
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		ButtonGroup,
		GradientButton
	} from 'flowbite-svelte';

	import { Heading, Span } from 'flowbite-svelte';
	import { register_login_popup } from '../stores/user.js';

	import { products_store, addProduct, updateProducts } from '../stores/products.js';

	import { onMount } from 'svelte';

	let isMobileView = false;

	const updateView = () => {
		isMobileView = window.innerWidth <= 850;
	};

	onMount(() => {
		updateView(); // Initial check
		window.addEventListener('resize', updateView);
		return () => window.removeEventListener('resize', updateView); // Cleanup
	});

	const handleClick = () => {
		goto('/main/products');
	};

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

	$: products_from_store = $products_store;

	products_from_store_copy = products_from_store;

	afterUpdate(() => {
		console.log('Products from store (after update): ', products_from_store);
		console.log('Products from store: ', $products_store);
	});

	let formData = {
		primary_usage: 'City Commute',
		fuel_type: 'Petrol',
		seating_capacity: 4,
		budget: '₹5L–₹8L',
		performance: 'Medium',
		mileage_priority: 'Medium',
		body_type: 'Sedan',
		speed_priority: 'Medium',
		brand_preference: 'Flexible',
		brand_name_input: 'Honda'
	};

	const primaryUsageOptions = ['City Commute', 'Highway', 'Luxury/Status'];
	const fuelTypeOptions = ['Diesel', 'Petrol', 'No preference', 'Electric'];
	const seatingCapacityOptions = [4, 5, 6, 7];
	const priorityOptions = ['Low', 'Medium', 'High'];
	const bodyTypeOptions = ['Sedan', 'Hatchback', 'SUV'];
	const brandPreferenceOptions = ['Strict', 'Flexible'];
	const brandOptions = [
		'Tata',
		'Mahindra',
		'Honda',
		'Maruti Suzuki',
		'Hyundai',
		'Kia',
		'Toyota',
		'Renault'
	];
	const budgetRanges = [
		{ value: '₹5L–₹8L', label: '₹5L–₹8L' },
		{ value: '₹8L–₹12L', label: '₹8L–₹12L' },
		{ value: '₹12L–₹16L', label: '₹12L–₹16L' },
		{ value: '₹16L–₹22L', label: '₹16L–₹22L' },
		{ value: '₹22L–₹28L', label: '₹22L–₹28L' }
	];

	let recommendations = null;
	let recommended_cars_set = [];
	let top_recommendation;
	let error = null;
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = null;

		recommendations = null;
		recommended_cars_set = [];
		top_recommendation = null;

		try {
			console.log('Sending form data:', formData);

			const response = await fetch('http://localhost:8000/recommend', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				console.error('Error response:', errorData);
				throw new Error(errorData.detail || 'Failed to get recommendations');
			}

			recommendations = await response.json();
			console.log('Received recommendations:', recommendations);

			// Find products by their IDs
			recommended_cars_set = recommendations.recommended_cars
				.map((id) => products_from_store.find((product) => String(product._id) === id))
				.filter((product) => product);

			// Set the first recommendation as the top one
			top_recommendation = recommended_cars_set[0];
			console.log('Top recommendation:', top_recommendation);

			// Remove the top recommendation from the set
			recommended_cars_set = recommended_cars_set.slice(1);
			console.log('Other recommended cars:', recommended_cars_set);
		} catch (err) {
			console.error('Error in handleSubmit:', err);
			error = err.message;
		} finally {
			loading = false;
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

<div class="home-page">
	<Header />
	<div class="main-upper-body">
		<div class="left-upper-body">
			<h2 class="left-upper-body-heading" style="position: relative; left:40px;">
				Find Your Perfect Ride,
			</h2>
			<h2 class="left-upper-body-heading" style="margin-top: -7px; position: relative; left:40px">
				Every Time
			</h2>
			<p
				class="left-upper-body-text"
				style="margin-top: 10px; margin-bottom: 15px; position: relative; left:40px"
			>
				Explore our wide range of premium vehicles, tailored to meet your needs.
			</p>
			<button
				on:click={() => {
					goto('/main/products');
				}}
				class="pushable"
				style="margin-left: 70px; margin-top: 10px"
			>
				<span class="front"> Shop Now </span>
			</button>
		</div>
		<div class="right-upper-body">
			<img
				src={isMobileView ? '/mb-car1.png' : '/car6.png'}
				on:click={isMobileView ? handleClick : null}
				alt="Car"
				style={isMobileView ? 'height: 100%;' : 'height: 530px;'}
			/>
			<div class="animated-text">`Driven by dreams, powered by memories`</div>
		</div>
	</div>

	<div class="brands">
		<h2 class="left-upper-body-heading" style="margin-top:22px; margin-bottom:20px;">
			Brands We Offer
		</h2>
		<img src="/brands.png" alt="Brand" style="height: 400px;" />
	</div>

	<div class="recommendor">
		<div style="justify-content: center; align-items: center; display: flex; margin: 40px">
			<Heading
				style="color: aliceblue;"
				tag="h1"
				class="mb-4"
				customSize="text-3xl font-extrabold md:text-5xl lg:text-6xl"
			>
				Find Your <Span gradient>Perfect Car</Span>.
			</Heading>
		</div>
	
		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<label class="input-label" for="primary_usage">Primary Usage:</label>
				<select class="form-selector" bind:value={formData.primary_usage}>
					{#each primaryUsageOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="fuel_type">Fuel Type:</label>
				<select class="form-selector" bind:value={formData.fuel_type}>
					{#each fuelTypeOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="seating_capacity">Seating Capacity:</label>
				<select class="form-selector" bind:value={formData.seating_capacity}>
					{#each seatingCapacityOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="budget">Budget Range:</label>
				<select class="form-selector" bind:value={formData.budget}>
					{#each budgetRanges as range}
						<option class="form-opt" value={range.value}>{range.label}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="performance">Performance Priority:</label>
				<select class="form-selector" bind:value={formData.performance}>
					{#each priorityOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="mileage_priority">Mileage Priority:</label>
				<select class="form-selector" bind:value={formData.mileage_priority}>
					{#each priorityOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="body_type">Body Type:</label>
				<select class="form-selector" bind:value={formData.body_type}>
					{#each bodyTypeOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="speed_priority">Speed Priority:</label>
				<select class="form-selector" bind:value={formData.speed_priority}>
					{#each priorityOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="brand_preference">Brand Preference:</label>
				<select class="form-selector" bind:value={formData.brand_preference}>
					{#each brandPreferenceOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<div class="form-group">
				<label class="input-label" for="brand_name_input">Preferred Brand:</label>
				<select class="form-selector" id="brand_name_input" bind:value={formData.brand_name_input}>
					{#each brandOptions as option}
						<option class="form-opt" value={option}>{option}</option>
					{/each}
				</select>
			</div>
	
			<button class="submit-btn" type="submit" disabled={loading}>
				{loading ? 'Getting Recommendations...' : 'Find My Perfect Car'}
			</button>
		</form>
	
		{#if error}
			<div class="error">
				{error}
			</div>
		{/if}
	
		{#if recommendations}
			<div class="recommendations">
				<div
					on:click={() => {
						goto('/main/products/' + top_recommendation._id);
					}}
					class="main-product"
				>
					<img
						src={top_recommendation.images[0]}
						alt="product"
						style="width: 200px; height: 200px;"
					/>
					<p class="product-name">{top_recommendation.name}</p>
					<p class="product-category">{top_recommendation.category}</p>
					<div class="product-prices">
						<p class="product-price-rgl">
							<s>Rs.{top_recommendation.regularprice}</s>&nbsp;&nbsp;
						</p>
						<p class="product-price-sale">Rs.{top_recommendation.saleprice}</p>
					</div>
				</div>
				<div class="products-main">
					{#each recommended_cars_set as product}
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
				</div>
			</div>
		{/if}
	</div>
	<Footer />
</div>

<style>
	.home-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(150deg, #002b1b, black, black);
		padding: 0;
		margin: 0;
	}

	.recommendations {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
	}

	.products-main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 4rem;
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

	.main-product {
		width: 30rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: center;
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

	.main-product:hover {
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

	.submit-btn {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
		cursor: pointer;
		justify-self: center;
		justify-items: center;
		justify-content: center;
		align-items: center;
		align-self: center;
		position: relative;
		left: 200px;
	}

	.recommendor {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 20px;
		justify-items: center;
		align-items: center;
		justify-content: center;
		color: aliceblue;
		font-family: 'montserrat', sans-serif;
		font-size: 15px;
		font-weight: 300;
		margin-bottom: 120px;
		border-color: #002b1b;
		border-style: solid;
		border-width: 1px;
		box-shadow: #002b1b 0 4px 6px;
	}

	.form-group {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		justify-items: center;
	}

	.input-label {
		display: flex;
		flex-direction: row;
		justify-content: start;
		position: relative;
		left: -30px;
		font-family: 'montserrat', sans-serif;
		top: 8px;
		margin-bottom: 30px;
		color: white;
	}

	.form-selector {
		background-color: transparent;
		margin-bottom: 1rem;
		color: white;
		width: 450px;
	}

	.form-opt {
		width: 200px;
		color: black;
	}

	.main-upper-body {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		padding: 0;
		margin-bottom: 40px;
	}

	.left-upper-body {
		width: 34%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.left-upper-body-heading {
		color: white;
		font-size: 40px;
		font-weight: 400;
		font-family: 'montserrat', sans-serif;
		text-align: center;
	}

	.left-upper-body-text {
		color: white;
		font-size: 20px;
		font-weight: 200;
		font-family: 'montserrat', sans-serif;
		text-align: center;
	}

	.pushable {
		background: hsl(146, 99%, 31%);
		border-radius: 12px;
		border: none;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
	}
	.front {
		display: block;
		padding: 12px 42px;
		border: '1px solid ';
		border-radius: 12px;
		font-size: 1.25rem;
		background: hsl(156, 100%, 48%);
		color: white;
		transform: translateY(-6px);
	}

	.pushable:active .front {
		transform: translateY(-2px);
	}

	.right-upper-body {
		width: 66%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		position: relative;
	}

	.animated-text {
		display: none;
		font-family: 'Brush Script MT', cursive;
		font-size: 2rem;
		color: white;
		position: absolute;
		top: 10%;
		left: 5%;
		white-space: nowrap;
		overflow: hidden;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
		border-right: 2px solid white;
		width: fit-content;
		animation:
			typing 3.5s steps(50, end),
			blink 0.7s step-end infinite;
	}

	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: white;
		}
	}

	@media (max-width: 850px) {
		.left-upper-body {
			display: none;
		}

		.right-upper-body {
			width: 100%;
		}

		.animated-text {
			display: flex;
		}
	}

	@media (max-width: 600px) {
		.animated-text {
			top: 8%;
			left: 2%;
			font-size: 1.5rem;
		}
	}

	.brands {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 80px;
	}
</style>
