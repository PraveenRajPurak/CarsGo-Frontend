<script>
	import { goto } from '$app/navigation';
	import { GradientButton } from 'flowbite-svelte';
	import { admin_Data } from '../../../../../stores/admin.js';

	console.log('Admin data: ', $admin_Data);

	let sessionToken;

	admin_Data.subscribe((data) => {
		if (data?.SessionToken) {
			sessionToken = data.SessionToken;
		}
	});

	let cseData = [];

	export let data;

	console.log('Admin products: ', data.cseData.data);

    cseData = data.cseData.data;

	let new_cse_toggler = false;

	let cse_id = '';
	let password = '';
	let name='';
	let phone_number = '';
	let email = '';

    let name_valid = false;
    let phone_number_valid = false;
    let email_valid = false;

	function validate_name() {
		if (name.length > 0 && name.length < 50) {
			name_valid = true;
		} else {
			name_valid = false;
			alert("Name can't be empty and should be less than 50 characters!");
		}
	}

    function validate_phone_number() {
        if (phone_number.length == 10) {
            if (phone_number[0] != '9' || phone_number[0] != '8' || phone_number[0] != '7' || phone_number[0] != '6') {
                phone_number_valid = false;
                alert('Enter a valid phone number!'); 
            }
            phone_number_valid = true;
        } else {
            phone_number_valid = false;
            alert("Phone Number can't be empty and should be 10 digits!");
        }
    }

    function validate_email() {
        if (email.length > 0 && email.length < 50) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                email_valid = false;
                alert('Enter a valid email!'); 
            }
            email_valid = true;
        } else {
            email_valid = false;
            alert("Email can't be empty and should be less than 50 characters!");
        }
    }

	function validation_Check() {
        validate_name();
        validate_phone_number();
        validate_email();

		if (
			name_valid &&
            phone_number_valid &&
            email_valid
		) {
			return true;
		}
	}

	async function add_cse(event) {
		event.preventDefault();

		if (!validation_Check()) return;

		const cse = {
            cse_id: cse_id,
            password: password,
            name: name,
            phone_number: phone_number,
            email: email
		};

        console.log('CSE: ', cse);

		const formData = new FormData();

		formData.append('name', cse.name);
        formData.append('cse_id', cse.cse_id);
        formData.append('password', cse.password);
        formData.append('phone_number', cse.phone_number);
        formData.append('email', cse.email);
        formData.append('sessionToken', sessionToken);


		const response = await fetch('?/add-cse', { method: 'POST', body: formData });

		const res = await response.json();

		console.log('Response received in html : ', res);

		let parsedData = JSON.parse(res.data);

		console.log('Parsed data: ', parsedData);

		const { success, message} = parsedData[0];

		console.log('Order Success:', parsedData[success]);
		console.log('Message:', parsedData[message]);

		if (parsedData[success]) {
			alert('CSE added successfully!');
		}
	}
</script>

<div class="admin-cses">
	<div class="admin-cses-header">
		<h1 class="admin-cses-heading">CSEs</h1>

		<GradientButton
			style="position : relative; left: 300px;  top: 25px; height: 100%;"
			on:click={() => (new_cse_toggler = !new_cse_toggler)}
			shadow
			color="green">Add New CSE</GradientButton
		>
	</div>

	{#if new_cse_toggler}
		<div class="new-cse-ctn">
			<form style="width: 100%; height: 100%;">
				<h1 class="new-cse-heading">Add New CSE</h1>

                <div class="new-cse-containers">
                    <label for="cse_id" class="input-label">
                        CSE ID :
                        <input
                            class="input"
                            type="text"
                            name="cse_id"
                            bind:value={cse_id}
                            placeholder="CSE ID"
                        />
                    </label>
                </div>

                <div class="new-cse-containers">
                    <label for="password" class="input-label">
                        Password :
                        <input
                            class="input"
                            type="password"
                            name="password"
                            bind:value={password}
                            placeholder="Password"
                        />
                    </label>
                </div>

                <div class="new-cse-containers">
					<label for="name" class="input-label">
						Name :
						<input
							class="input"
							type="text"
							name="name"
							bind:value={name}
							placeholder="CSE Name"
						/>
					</label>
				</div>

                <div class="new-cse-containers">
                    <label for="phone_number" class="input-label">
                        Phone Number :
                        <input
                            class="input"
                            type="text"
                            name="phone_number"
                            bind:value={phone_number}
                            placeholder="Phone Number"
                        />
                    </label>
                </div>

                <div class="new-cse-containers">
                    <label for="email" class="input-label">
                        Email :
                        <input  
                            class="input"
                            type="email"
                            name="email"
                            bind:value={email}
                            placeholder="Email"
                        />
                    </label>
                </div>
			</form>

			<button
				class="submit-btn"
				on:click|preventDefault={() => {
					add_cse(event);
				}}
				type="button"
			>
				Submit
			</button>
		</div>
	{/if}
	{#each cseData as cse}
		<div class="cse">
            
			<h2 class="cse-name">{cse.name}</h2>
			<p class="cse-text">Email : {cse.email}</p>
			<p class="cse-text">Phone Number : {cse.phone_number}</p>
			<p class="cse-text">CSE ID : {cse.cse_id}</p>
            <p class="cse-text">Status : {cse.status}</p>
            <p class="cse-text">Active Chat Count : {cse.active_chats_count}</p>
            <p class="cse-text">Pending Chat Count : {cse.pending_chats_count}</p>
		</div>
	{/each}
</div>

<style>
	.admin-cses {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.admin-cses-header {
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.admin-cses-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
		margin-top: 20px;
		position: relative;
		left: 70px;
	}

	.cse {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 300%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #002b1b;
	}

	.cse-name {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.cse-text {
		font-size: 16px;
		margin-bottom: 5px;
	}

	/* .modify-btn {
		background-color: #4caf50;
		color: white;
		border: none;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin-top: 10px;
		cursor: pointer;
	} */

	.cse-name {
		color: white;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.cse-text {
		color: white;
		font-size: 16px;
		margin-bottom: 5px;
	}

	.new-cse-ctn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 30px;
	}

	.new-cse-containers {
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
		left: 10px;
		margin-bottom: 30px;
		color: white;
	}

	.new-cse-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
		margin-top: 20px;
		position: relative;
		left: 70px;
	}

	.input {
		height: 30px;
		width: 220px;
		font-size: 15px;
		font-weight: 500;
		justify-content: end;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		color: black;
		position: absolute;
		left: 130px;
	}

	.submit-btn {
		background-color: #002b1b;
		width: 100%;
		color: white;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
	}
</style>