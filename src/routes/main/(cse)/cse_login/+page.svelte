<script>
	import { goto } from '$app/navigation';

	import {
		isCSELoggedIn,
		cse_Data,
		updateCSEData,
		updateCSELoggedIn
	} from '../../../../stores/cse.js';

	let loggedinsucces = false;
	let loginmessage = '';
	let cse_data1 = {};
</script>

<div class="login-page">
	<h1 class="cse-heading">Welcome to CSE Section.</h1>
	<section
		style="background-color: transparent; border-color:#002b1b; border-width: 1px; border-radius:10%; transform: perspective(800px) rotateX(8deg); box-shadow:
			rgba(0, 38, 22, 0.1) 0px 0px 0px 1px,
			rgba(0, 0, 0, 0.05) 0px 1px 0px 0px,
			rgba(0, 0, 0, 0.03) 0px 0px 8px 0px,
			rgba(0, 0, 0, 0.1) 0px 20px 30px 0px;
            padding:10px;"
	>
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
							const response = await fetch('?/cse-login', { method: 'POST', body: formData });
							const res = await response.json();

							console.log('Response received in html : ', res);

							let parsedData = JSON.parse(res.data);

							console.log('Parsed data: ', parsedData);

							const { success, message, email, id, name, phone_number, cse_id, session_token } =
								parsedData[0];

							console.log('Login Success:', parsedData[success]);
							console.log('Message:', parsedData[message]);
							console.log('Email:', parsedData[email]);
							console.log('ID:', parsedData[id]);
							console.log('Name:', parsedData[name]);
							console.log('Phone Number:', parsedData[phone_number]);
							console.log('CSE ID:', parsedData[cse_id]);
							console.log('Session Token:', parsedData[session_token]);

							if (parsedData[success]) {
								loggedinsucces = true;
								loginmessage = 'Successfully logged in!';
								updateCSEData({
									Email: parsedData[email],
									ID: parsedData[id],
									Name: parsedData[name],
									PhoneNumber: parsedData[phone_number],
									CSE_ID: parsedData[cse_id],
									SessionToken: parsedData[session_token]
								});
								updateCSELoggedIn(true);
								alert('Successfully logged in! Going to dashboard...');
								goto('/main/cse/');
							} else {
								loginmessage = res.error;
								loggedinsucces = false;
								updateCSELoggedIn(false);
								alert(res.error);
							}
						}}
					>
						<div>
							<label
								for="cse_id"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								style="color: aliceblue;">Your CSE ID</label
							>
							<input
								type="text"
								name="cse_id"
								id="cse_id"
								class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="CSE ID"
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
</div>

<style>
	.login-page {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.cse-heading {
		color: aliceblue;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
	}
</style>
