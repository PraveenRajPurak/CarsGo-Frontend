<script>
	import { goto } from '$app/navigation';
	import {
		isLoggedIn,
		user_Data,
		updateUserData,
		user_Extended_Data,
		updateExtendedUserData
	} from '../../../../stores/user.js';
	import { cart } from '../../../../stores/cart.js';
	import { Modal, ButtonGroup, GradientButton } from 'flowbite-svelte';
	import { register_login_popup } from '../../../../stores/user.js';

	let loggedinsucces = false;
	let loginmessage = '';

	let cart_for_checkout = [];

	cart.subscribe((value) => {
		cart_for_checkout = value;
	});

	if (cart_for_checkout.length == 0) {
		console.log('Cart is empty and look for something else');
	} else {
		console.log("If it's working you good", cart_for_checkout);
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

	function validate_phone1() {
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

	function validation_Check() {
		return (
			validate_email() &&
			validate_password() &&
			confirm_password() &&
			validate_phone1() &&
			validate_name()
		);
	}

	let registration_toggler_2 = false;

	async function registration(event) {
		event.preventDefault();
		if (!validation_Check()) return;
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
			registration_toggler_2 = false;
		} else {
			alert(message);
		}
	}

	let address_conf_btn = false;

	let payment_conf_btn = false;

	let add_address_toggler = false;

	let address_change_detected = false;

	$: if (payment_conf_btn) {
		place_order_btn_enabled = true;
	}

	console.log('Cart: ', $cart);
	console.log('User Data: ', $user_Data);
	console.log('Is Logged In: ', $isLoggedIn);
	console.log('User Extended Data: ', $user_Extended_Data);

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

		user_data1 = user_data1.data;
	}

	let address_field = '';

	let city = '';

	let state = '';

	let country = '';

	let pincode = '';

	let phone = '';

	let added_address = false;

	let address_field_valid = false;

	let city_valid = false;

	let state_valid = false;

	let country_valid = false;

	let pincode_valid = false;

	let phone_valid = false;

	let address_confirmed = false;

	function validate_address_field() {
		if (address_field.length > 0 && address_field.length < 50) {
			address_field_valid = true;
		} else {
			address_field_valid = false;
			alert("Address Field can't be empty and should be less than 50 characters!");
		}
	}

	function validate_city() {
		if (city.length > 0 && city.length < 30) {
			city_valid = true;
		} else {
			city_valid = false;
			alert("City Field can't be empty and should be less than 50 characters!");
		}
	}
	function validate_state() {
		if (state.length > 0 && state.length < 20) {
			state_valid = true;
		} else {
			state_valid = false;
			alert("State can't be empty and should be less than 50 characters!");
		}
	}
	function validate_country() {
		if (country.length > 0 && country.length < 60) {
			country_valid = true;
		} else {
			country_valid = false;
			alert("Country can't be empty and should be less than 50 characters!");
		}
	}
	function validate_pincode() {
		if (pincode.length == 6) {
			pincode_valid = true;
		} else {
			pincode_valid = false;
			alert('Enter a valid pincode!');
		}
	}

	function validate_phone() {
		if (phone.length == 10 && (phone[0] == 9 || phone[0] == 8 || phone[0] == 7 || phone[0] == 6)) {
			phone_valid = true;
		} else {
			phone_valid = false;
			alert('Enter a valid phone number!');
		}
	}

	function validationCheck() {
		validate_address_field();
		validate_city();
		validate_state();
		validate_country();
		validate_pincode();
		validate_phone();
		return (
			address_field_valid &&
			city_valid &&
			state_valid &&
			country_valid &&
			pincode_valid &&
			phone_valid
		);
	}

	let place_order_btn_enabled = false;

	let sum = 0;

	let address = {};

	let payment_methods = ['Paytm', 'GooglePay', 'PhonePe', 'COD'];

	let payment_method = '';

	let selectedAddress = {};

	$: {
		sum = 0;
		for (let i = 0; i < $cart.length; i++) {
			let item_price = parseInt($cart[i].price);
			let item_quantity = $cart[i].quantity;
			sum += item_price * item_quantity;
		}
	}

	let allow_payment = false;

	async function add_address(event) {
		event.preventDefault();
		if (!validationCheck()) return;
		address_field = address_field.toString();
		const address = {
			address_field: address_field,
			city: city,
			state: state,
			country: country,
			pincode: pincode,
			phone: phone,
			user_id: $user_Extended_Data._id,
			session_token: $user_Data.SessionToken
		};

		const formData = new FormData();

		formData.append('address_field', address_field);
		formData.append('city', city);
		formData.append('state', state);
		formData.append('country', country);
		formData.append('pincode', pincode);
		formData.append('phone', phone);
		formData.append('user_id', $user_Extended_Data._id);
		formData.append('session_token', $user_Data.SessionToken);

		console.log('Form Data:', address);
		const response = await fetch('?/add_address', { method: 'POST', body: formData });

		const res = await response.json();

		console.log('Response received in html : ', res);

		let parsedData = JSON.parse(res.data);

		console.log('Parsed data: ', parsedData);

		const { success, message } = parsedData[0];

		console.log('Login Success:', parsedData[success]);
		console.log('Message:', parsedData[message]);

		if (parsedData[success]) {
			add_address_toggler = false;

			$user_Extended_Data.addresses = [...$user_Extended_Data.addresses, address];

			added_address = true;
		}
	}

	function address_confirmation() {
		console.log('Selected Address: ', selectedAddress);
		if (Object.keys(selectedAddress).length === 0) {
			alert('Please select an address!');
		} else {
			address = selectedAddress;
			address_confirmed = true;
			allow_payment = true;
		}
	}

	let txn_id = '';

	async function payment_confirmation(event) {
		event.preventDefault();
		if (payment_method == '') {
			alert('Please select a payment method!');
		} else {
			let payment = {
				paid_by: $user_Extended_Data._id,
				payment_type: payment_method,
				paid_amount: sum,
				paid_date: new Date().toISOString(),
				session_token: $user_Data.SessionToken
			};

			const formData = new FormData();

			formData.append('paid_by', $user_Extended_Data._id);
			formData.append('payment_type', payment_method);
			formData.append('paid_amount', sum);
			formData.append('paid_date', new Date().toISOString());
			formData.append('session_token', $user_Data.SessionToken);

			console.log('Form Data:', payment);

			const response = await fetch('?/payment_creation', { method: 'POST', body: formData });

			const res = await response.json();

			console.log('Response received in html : ', res);

			let parsedData = JSON.parse(res.data);

			console.log('Parsed data: ', parsedData);

			const { success, message, payment_id, payment_date, payment_amount } = parsedData[0];

			console.log('Payment Success:', parsedData[success]);
			console.log('Message:', parsedData[message]);
			console.log('Payment ID:', parsedData[payment_id]);
			console.log('Payment Date:', parsedData[payment_date]);
			console.log('Payment Amount:', parsedData[payment_amount]);

			if (parsedData[success]) {
				allow_payment = false;
				place_order_btn_enabled = true;
				txn_id = parsedData[payment_id];
			}
		}
	}

	let order_confirmed = false;

	let order_id1 = '';
	let order_date1 = '';
	let order_status1 = '';
	let order_amount1 = '';
	let order_items1 = [];

	async function order_place(event) {
		event.preventDefault();

		let orderItems = [];

		for (let i = 0; i < $cart.length; i++) {
			orderItems.push({
				product_id: $cart[i].id,
				quantity: $cart[i].quantity
			});
		}

		console.log('Order Items : ', orderItems);

		let order = {
			order_items: {
				order_items: orderItems
			},
			order_amount: sum,
			order_date: new Date().toISOString(),
			order_status: 'Pending',
			customer_id: $user_Extended_Data._id,
			transaction_id: txn_id
		};

		const formData = new FormData();

		formData.append('order_items', JSON.stringify(order.order_items));
		formData.append('order_amount', sum);
		formData.append('order_date', new Date().toISOString());
		formData.append('order_status', 'Pending');
		formData.append('customer_id', $user_Extended_Data._id);
		formData.append('transaction_id', txn_id);
		formData.append('session_token', $user_Data.SessionToken);

		const response = await fetch('?/order_creation', { method: 'POST', body: formData });

		const res = await response.json();

		console.log('Response received in html : ', res);

		let parsedData = JSON.parse(res.data);

		console.log('Parsed data: ', parsedData);

		const { success, message, order_id, order_date, order_amount, order_status } = parsedData[0];

		console.log('Order Success:', parsedData[success]);
		console.log('Message:', parsedData[message]);
		console.log('Order ID:', parsedData[order_id]);
		console.log('Order Date:', parsedData[order_date]);
		console.log('Order Amount:', parsedData[order_amount]);
		console.log('Order Status:', parsedData[order_status]);

		if (parsedData[success]) {
			order_id1 = parsedData[order_id];
			order_date1 = parsedData[order_date];
			order_status1 = parsedData[order_status];
			order_amount1 = parsedData[order_amount];
			order_confirmed = true;
			alert('Order placed successfully!');
			$cart = [];
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
					registration_toggler_2 = true;
				}}
				shadow
				color="green">Register</GradientButton
			>
			<GradientButton
				on:click={() => {
					registration_toggler_2 = false;
				}}
				shadow
				color="teal">Login</GradientButton
			>
		</ButtonGroup>
		{#if registration_toggler_2}
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

{#if order_confirmed}
	<div class="order-confirmed">
		<h1 class="playfair-display-order-confirmed-heading">Thanks for your order!</h1>
		<p class="order-confirmed-text">
			Your order has been placed successfully. We will contact you soon.
		</p>
		<div class="order-summary-container">
			<p class="order-summary-heading">Order Summary</p>
			<p class="order-summary-text">
				Order ID: {order_id1}<br />
				Order Date: {order_date1}<br />
				Order Status: {order_status1}<br />
				Order Amount: {order_amount1}<br />
				Payment Method: {payment_method}<br />
				Transaction ID: {txn_id} <br />
			</p>
			<p
				class="order-summary-text"
				style="align-self: center; justify-self: center; margin-top: 5px;"
			>
				Items:
			</p>
			{#each cart_for_checkout as item}
				<p class="order-summary-text">
					{item.name} X {item.quantity}<br />
				</p>
			{/each}
		</div>
		<button class="btn-go-to-products-version2" on:click={() => goto('/main/products')}
			>Look for more beautiful cars...</button
		>
		<img src="/placed_order_car2.png" alt="Order Placed" class="conf-img" />
	</div>
{:else if $cart.length < 1}
	<div class="empty-cart-parent">
		<h1 class="checkout-heading">Can't checkout! Cart is empty</h1>
		<img
			src="/empty_cart.png"
			alt="Empty Cart"
			style="width: 350px; height: 350px; margin: 20px;"
		/>
		<button class="btn-go-to-products" on:click={() => goto('/main/products')}
			>Go to products</button
		>
	</div>
{:else}
	<div class="checkout-page">
		{#if !$isLoggedIn}
			<ButtonGroup>
				<GradientButton
					on:click={() => {
						registration_toggler_2 = true;
					}}
					shadow
					color="green">Register</GradientButton
				>
				<GradientButton
					on:click={() => {
						registration_toggler_2 = false;
					}}
					shadow
					color="teal">Login</GradientButton
				>
			</ButtonGroup>
			{#if registration_toggler_2}
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
									Create an account to checkout
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
				<h1 class="address-heading" style="margin-top: 30px;">Please Login to Checkout</h1>
				<section style="background-color: transparent; margin-top: -30px">
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
											updateUserData({
												Email: parsedData[email],
												ID: parsedData[id],
												Name: parsedData[name],
												SessionToken: parsedData[session_token]
											});

											await get_user_data();

											$isLoggedIn = true;
										} else {
											alert(parsedData[message]);
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
		{:else}
			<h1 class="checkout-heading">You are almost there...</h1>
			<div class="checkout-container">
				<div class="address-container">
					{#if $isLoggedIn}
						{#if $user_Extended_Data.addresses.length > 0}
							<h1 class="address-heading" id="address-heading-select">Select a saved address</h1>

							<select
								bind:value={selectedAddress}
								on:change={() => {
									address = {};
								}}
								class="address-selector"
							>
								{#each $user_Extended_Data.addresses as address}
									<option
										default={selectedAddress}
										value={address}
										class="address-opt"
										style="color: black;"
										>{#if address.addressfield != undefined}
											{address.addressfield}
										{:else}
											{address.address_field}
										{/if}
										<br />
										{address.city} <br />
										{address.state} <br />
										{address.country} <br />
										{address.pincode} <br />
									</option>
								{/each}
							</select>

							<h1 class="address-heading" id="address-heading-or">OR</h1>
						{:else}
							<h1 class="address-heading" id="address-heading">
								We could not find any saved address
							</h1>
						{/if}
					{/if}
					<button
						class="add-address-btn"
						on:click={() => (add_address_toggler = !add_address_toggler)}>Add a new address</button
					>

					{#if add_address_toggler}
						<form>
							<h1 class="address-heading" id="address-heading-new">Enter a new Address</h1>
							<div class="address-containers">
								<label for="address.addressField" class="input-label">
									Address Field :
									<input
										class="input"
										type="text"
										name="addressField"
										bind:value={address_field}
										placeholder="Address Field"
										disabled={address_field_valid}
									/>
								</label>
								<!-- {#if !address_field_valid}
									<button
										class="validate-btn"
										on:click={() => {
											validate_address_field();
										}}
										>Validate
									</button>
								{:else}
									<img
										class="checkmark"
										src="/checked.png"
										alt="checked"
										style="width: 20px; height: 20px;"
									/>
								{/if} -->
							</div>

							<div class="address-containers">
								<label for="address.city" class="input-label">
									City :
									<input
										class="input"
										name="city"
										type="text"
										bind:value={city}
										placeholder="City"
										disabled={city_valid}
									/>
								</label>
								<!-- {#if !city_valid}
									<button
										class="validate-btn"
										on:click={() => {
											validate_city();
										}}
										>Validate
									</button>
								{:else}
									<img
										class="checkmark"
										src="/checked.png"
										alt="checked"
										style="width: 20px; height: 20px;"
									/>
								{/if} -->
							</div>

							<div class="address-containers">
								<label for="address.state" class="input-label">
									State :
									<input
										class="input"
										name="state"
										type="text"
										bind:value={state}
										placeholder="state"
										disabled={state_valid}
									/>
								</label>
								<!-- {#if !state_valid}
									<button
										class="validate-btn"
										on:click={() => {
											validate_state();
										}}
										>Validate
									</button>
								{:else}
									<img
										class="checkmark"
										src="/checked.png"
										alt="checked"
										style="width: 20px; height: 20px;"
									/>
								{/if} -->
							</div>

							<div class="address-containers">
								<label for="address.country" class="input-label">
									Country
									<input
										class="input"
										type="text"
										name="country"
										bind:value={country}
										placeholder="Country"
										disabled={country_valid}
									/>
								</label>
								<!-- {#if !country_valid}
									<button
										class="validate-btn"
										on:click={() => {
											validate_country();
										}}
										>Validate
									</button>
								{:else}
									<img
										class="checkmark"
										src="/checked.png"
										alt="checked"
										style="width: 20px; height: 20px;"
									/>
								{/if} -->
							</div>

							<div class="address-containers">
								<label for="address.pincode" class="input-label">
									Pincode
									<input
										class="input"
										type="text"
										name="pincode"
										bind:value={pincode}
										placeholder="Pincode"
										disabled={pincode_valid}
									/>
								</label>
								<!-- {#if !pincode_valid}
									<button
										class="validate-btn"
										on:click={() => {
											validate_pincode();
										}}
										>Validate
									</button>
								{:else}
									<img
										class="checkmark"
										src="/checked.png"
										alt="checked"
										style="width: 20px; height: 20px; "
									/>
								{/if} -->
							</div>

							<div class="address-containers">
								<label for="phone" class="input-label">
									Phone
									<input
										class="input"
										type="text"
										bind:value={phone}
										placeholder="Phone Number"
										disabled={phone_valid}
									/>
								</label>
								<!-- {#if !phone_valid}
									<button
										class="validate-btn"
										on:click={() => {
											validate_phone();
										}}
										>Validate
									</button>
								{:else}
									<img
										class="checkmark"
										src="/checked.png"
										alt="checked"
										style="width: 20px; height: 20px;"
									/>
								{/if} -->
							</div>

							<div style="display: flex; flex-direction: row; position: relative; left: 10px;">
								<button
									on:click|preventDefault={() => {
										address_conf_btn = true;
										add_address(event);
									}}
									class="save-address-btn">Save Address</button
								>
								<button
									class="save-address-btn"
									on:click|preventDefault={() => {
										address_field = '';
										city = '';
										state = '';
										country = '';
										pincode = '';
										phone = '';
										address_field_valid = false;
										city_valid = false;
										state_valid = false;
										country_valid = false;
										pincode_valid = false;
										phone_valid = false;
										address_conf_btn = false;
									}}>Clear Address</button
								>
							</div>
						</form>
					{/if}
					{#if address_confirmed === true}
						<div class="confirmed-address">
							<p class="confirmed-address-text">
								{#if Object.keys(address).length == 0}
									Address has been changed! Press Confirm button to confirm the address.
								{:else}
									Yours Address is :
									{#if address.addressfield != undefined}
										{address.addressfield}
									{:else}
										{address.address_field}
									{/if}
									<br />
									City : {address.city}
									| State : {address.state}
									<br />
									Country : {address.country}
									| Pincode : {address.pincode}
									<br />
								{/if}
							</p>
						</div>
					{/if}
					<div class="address-containers">
						<button
							class="add-address-btn"
							disabled={selectedAddress == {}}
							on:click={() => {
								add_address_toggler = false;
								address_confirmation();
							}}>Confirm Address</button
						>
					</div>
					<label for="payment_method" class="input-label-payment" id="payment_method_label">
						Payment Method
						<select
							class="input"
							name="payment_method"
							id="payment_method"
							bind:value={payment_method}
						>
							{#each payment_methods as method}
								<option value={method}>{method}</option>
							{/each}
						</select>
					</label>
					<h1 class="final-amount">
						Amount : Rs. {sum}
					</h1>
					<button
						on:click={() => {
							payment_confirmation(event);
						}}
						class="add-address-btn"
						disabled={!allow_payment}>Confirm payment</button
					>
				</div>
				<div class={add_address_toggler ? 'items-container-2' : 'items-container'}>
					<p class="total-text">Items</p>

					{#each $cart as item}
						<div class="item">
							<img src={item.img_url} alt="Product" class="product-image" />
							<p class="item-text">{item.name}</p>
							<p class="item-text">{item.price} X {item.quantity}</p>
							<p class="item-text">{'Rs. ' + item.subtotal}</p>
						</div>
					{/each}

					<p class="total-text">Total: Rs.{sum}</p>
					{#if payment_method !== ''}
						<p class="total-text">Payment Method: {payment_method}</p>
					{/if}
					{#if place_order_btn_enabled}
						<button
							on:click={() => {
								order_place(event);
							}}
							class="checkout-btn"
							id="place-order-btn">Place Order</button
						>
					{:else}
						<button class="checkout-btn-disabled" id="place-order-btn" disabled>Place Order</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

	.order-confirmed {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
		margin-top: 40px;
		margin-bottom: 40px;
	}

	.playfair-display-order-confirmed-heading {
		font-size: 60px;
		font-family: 'Playfair Display', serif;
		font-optical-sizing: auto;
		font-weight: 700;
		font-style: normal;
		color: white;
		margin-bottom: 20px;
	}

	.order-confirmed-text {
		font-size: 20px;
		font-family: 'Montserrat', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
		color: white;
		margin-bottom: 20px;
	}

	#address-heading-or {
		position: relative;
		left: 200px;
		margin-top: 20px;
	}

	.order-summary-container {
		margin: 20px;
		margin-bottom: 40px;
		transform: perspective(800px) rotateY(-8deg);
		flex-direction: column;
		align-items: center;
		padding: 40px;
		justify-content: center;
		border-color: #002b1b;
		border-left-width: 0.3px;
		border-bottom-width: 0.3px;
		border-bottom-left-radius: 20px;
		color: whitesmoke;
		box-shadow:
			rgba(0, 38, 22, 0.1) 0px 0px 0px 1px,
			rgba(0, 0, 0, 0.05) 0px 1px 0px 0px,
			rgba(0, 0, 0, 0.03) 0px 0px 8px 0px,
			rgba(0, 0, 0, 0.1) 0px 20px 30px 0px;
	}

	.order-summary-heading {
		font-size: 25px;
		font-family: 'Montserrat', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		color: white;
		margin-bottom: 20px;
	}

	.order-summary-text {
		font-size: 18px;
		font-family: 'Montserrat', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
		color: white;
	}

	.address-containers {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		justify-items: center;
	}

	#address-heading-new {
		position: relative;
		left: 100px;
		margin-top: 20px;
	}

	.address-opt {
		color: black;
	}

	.btn-go-to-products-version2 {
		border-color: #002b1b;
		border-width: 0.5px;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
	}
	.add-address-btn {
		background-color: #002b1b;
		width: 60%;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
	}
	.save-address-btn {
		background-color: #002b1b;
		width: 25%;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
	}
	.checkout-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin: 80px;
	}

	.checkout-heading {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.empty-cart-parent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin: 50px;
	}

	.confirmed-address {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		position: relative;
		left: -80px;
		margin: 20px;
	}

	.confirmed-address-text {
		font-size: 15px;
		font-weight: 400;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.btn-go-to-products {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
	}

	#payment-method-label {
		margin-top: 20px;
		margin-left: 20px;
	}

	.checkout-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		border-width: 1.5px;
		border-color: #0aac71;
		width: 80%;
	}

	.address-container {
		display: flex;
		flex-direction: column;
		width: 60%;
		justify-content: start;
		align-self: center;
		position: relative;
		left: 60px;
	}

	.address-selector {
		background-color: transparent;
		margin-bottom: 1rem;
		color: white;
		width: 450px;
	}

	.items-container {
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0px;
		justify-content: start;
		align-items: center;
		justify-items: center;
		width: 40%;
	}
	.items-container-2 {
		display: flex;
		flex-direction: column;
		position: sticky;
		margin-top: -530px;
		justify-content: start;
		align-items: center;
		justify-items: center;
		width: 40%;
	}

	.address-heading {
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
		position: relative;
		left: 100px;
		margin-top: 20px;
	}

	.input-label {
		display: flex;
		flex-direction: row;
		justify-content: start;
		position: relative;
		left: 10px;
		margin-bottom: 30px;
		color: white;
	}

	.input-label-payment {
		display: flex;
		flex-direction: row;
		justify-content: start;
		position: relative;
		left: 10px;
		margin-bottom: 30px;
		color: white;
	}
	.conf-img {
		height: 600px;
	}

	.input {
		height: 30px;
		width: 220px;
		font-size: 15px;
		font-weight: 500;
		justify-content: end;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		color: black;
		position: absolute;
		left: 130px;
	}

	.item {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 10px;
		color: white;
	}

	.item-text {
		font-size: 12px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		margin: 7px;
		color: white;
	}

	.total-text {
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		margin: 20px;
		color: white;
	}

	.final-amount {
		color: white;
		font-size: 16px;
		position: relative;
		left: 170px;
	}

	.product-image {
		height: 100px;
		width: 100px;
	}

	.checkout-btn {
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
	.checkout-btn-disabled {
		background-color: #01633f;
		color: rgb(142, 139, 139);
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		margin: 20px;
		cursor: not-allowed;
	}

	@media (min-width: 950px) and (max-width: 1300px) {
		.checkout-container {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			justify-items: center;
			border-width: 1.5px;
			border-color: #0aac71;
			width: 100%;
		}

		.address-container {
			display: flex;
			flex-direction: column;
			width: 50%;
			justify-content: start;
			align-self: center;
		}

		.address-selector {
			background-color: transparent;
			margin-bottom: 1rem;
			color: white;
			width: 60%;
		}

		.items-container {
			position: sticky;
			top: 0px;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			justify-items: center;
			width: 50%;
		}
		.items-container-2 {
			position: sticky;
			top: 0px;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			justify-items: center;
			width: 50%;
		}

		.address-heading {
			margin-bottom: 20px;
			font-size: 20px;
			font-weight: 700;
			font-family: 'montserrat', sans-serif;
			color: white;
			margin-top: 20px;
			text-align: center;
		}

		.address-opt {
			width: 200px;
		}

		#address-heading-select {
			position: relative;
			left: -60px;
		}

		#address-heading-or {
			position: relative;
			left: -60px;
		}
		#address-heading-new {
			position: relative;
			left: -60px;
		}

		.product-image {
			height: 80px;
			width: 80px;
		}

		.input-label {
			display: flex;
			flex-direction: row;
			justify-content: start;
			margin-bottom: 30px;
			color: white;
		}

		.item {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			justify-items: center;
			margin-bottom: 10px;
			color: white;
		}

		.item-text {
			font-size: 12px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			border-radius: 5px;
			padding: 10px;
			margin-top: 10px;
			margin: 7px;
			color: white;
		}

		.playfair-display-order-confirmed-heading {
			font-size: 40px;
			font-family: 'Playfair Display', serif;
			font-optical-sizing: auto;
			font-weight: 700;
			font-style: normal;
			color: white;
			margin-bottom: 0px 20px 20px 20px;
			text-align: center;
		}

		.order-confirmed-text {
			font-size: 20px;
			font-family: 'Montserrat', sans-serif;
			font-optical-sizing: auto;
			font-weight: 300;
			font-style: normal;
			color: white;
			margin-bottom: 20px;
		}

		.total-text {
			font-size: 20px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			border-radius: 5px;
			padding: 10px;
			margin-top: 10px;
			margin: 20px;
			color: white;
		}

		.save-address-btn {
			background-color: #002b1b;
			width: 25%;
			color: white;
			font-size: 20px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			border-radius: 5px;
			padding: 10px;
			margin: 20px;
		}

		.confirmed-address {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			justify-items: center;
			align-self: center;
			margin-left: 140px;
			margin-right: 30px;
		}

		.confirmed-address-text {
			font-size: 15px;
			font-weight: 400;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.conf-img {
			width: 100%;
		}
	}

	@media (max-width: 950px) {
		.checkout-container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			justify-items: center;
			border-width: 1.5px;
			border-color: #0aac71;
			width: 100%;
		}

		.address-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			justify-content: center;
			align-self: center;
			align-items: center;
			position: relative;
			left: 0px;
		}

		#address-heading-select {
			position: relative;
			left: 0px;
		}

		#address-heading-or {
			position: relative;
			left: 0px;
		}
		#address-heading-new {
			position: relative;
			left: 0px;
			text-align: center;
		}

		.items-container {
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			justify-items: center;
			width: 100%;

			margin-top: 20px;
		}

		.items-container-2 {
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			justify-items: center;
			width: 100%;
			margin-top: 20px;
		}

		.input-label-payment {
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin: 1.2rem 0rem 1.2rem 0rem;
			color: white;
			position: relative;

			left: -100px;
		}

		#payment-method-label {
			position: relative;
			left: 0px;
			text-align: center;
			margin-left: 0px;
		}

		#payment-method {
			position: relative;
			left: 0px;
			text-align: center;
			margin-left: 0px;
		}

		.address-selector {
			width: 80%;
		}

		.final-amount {
			color: white;
			font-size: 22px;
			font-weight: 500;
			position: relative;
			left: 0px;
		}

		.save-address-btn {
			background-color: #002b1b;
			width: 100%;
			color: white;
			font-size: 15px;
			font-weight: 500;
			font-family: 'montserrat', sans-serif;
			border-radius: 5px;
			padding: 10px;
			margin: 20px 50px 20px 0;
		}

		.confirmed-address {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			justify-items: center;
			align-self: center;
			margin-left: 190px;
		}

		.confirmed-address-text {
			font-size: 15px;
			font-weight: 400;
			font-family: 'montserrat', sans-serif;
			color: white;
		}

		.conf-img {
			width: 100%;
		}
	}
</style>
