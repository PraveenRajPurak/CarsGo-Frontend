<script>
	import Footer from '$lib/Footer/footer.svelte';
	import Header from '$lib/Header/header.svelte';
	import { goto } from '$app/navigation';
	import { isLoggedIn} from '../stores/user'
	
	import {
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		ButtonGroup,
		GradientButton
	} from 'flowbite-svelte';
	import { register_login_popup } from './main/(user)/stores/user.js';
	let registration_toggler = false;
	let loggedinsucces = false;
	let loginmessage = '';
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
							<form class="space-y-4 md:space-y-6" action="#">
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
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
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
										placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>
								<button
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

									const { success, message, email, id, name } = parsedData[0];

									console.log('Login Success:', parsedData[success]);
									console.log('Message:', parsedData[message]);
									console.log('Email:', parsedData[email]);
									console.log('ID:', parsedData[id]);
									console.log('Name:', parsedData[name]);

									if (parsedData[success]) {
										loggedinsucces = true;
										loginmessage = 'Successfully logged in!';
										$isLoggedIn = true;
										$register_login_popup = true;
										user_Data.set({
											Email: 'msh@gmail.com',
											ID: '66f66998cdd371da47560355',
											Name: 'Mayank Sharma'
										});
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
			<p class="left-upper-body-text" style="margin-top: -10px; position: relative; left:40px">
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
			<img src="/car6.png" alt="Car" style="height: 530px;" />
		</div>
	</div>

	<div class="brands">
		<h2 class="left-upper-body-heading" style="margin-bottom:15px;">Brands We Offer</h2>
		<img src="/brands.png" alt="Brand" style="height: 400px;" />
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
