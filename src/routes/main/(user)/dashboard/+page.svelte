<script>
	import { goto } from '$app/navigation';

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
</script>


<div class="dashboard">
	{#if $isLoggedIn}
		<div class="dashboard-logged-in-user">
			<h2 class="dashboard-logged-in-user-text">Welcome {$user_Extended_Data.name}!</h2>
			<div class="maintaining-heading">
				<h2 class="dashboard-logged-in-user-text">
					If not {$user_Extended_Data.name},
				</h2>
				<p
					class="dashboard-logged-in-user-text"
					style="cursor: pointer; font-weight: 400px; color: #0aac71;"
					on:click={() => {
						registration_toggler = true;
						$isLoggedIn = false;
						goto('/');
					}}
				>
					&nbsp; Logout
				</p>
			</div>
		</div>
	{:else}
		<button on:click={() => goto('/')} class="dashboard-register-btn">Home</button>
	{/if}
</div>

<style>
	.dashboard {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top:70px;
		margin-left:100px;
	}

	.dashboard-logged-in-user {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		position: relative;
	}

	.dashboard-logged-in-user-text {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.maintaining-heading {
		display: flex;
		flex-direction: row;
	}

	.dashboard-register-btn {
		width: 120px;
		height: 40px;
		background-color: 'transparent';
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		border-width: 1.5px;
		border-color: #0aac71;
		border-radius: 10%;
		border-style: solid;
		font-size: 12px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
		margin-right: 30px;
	}
</style>
