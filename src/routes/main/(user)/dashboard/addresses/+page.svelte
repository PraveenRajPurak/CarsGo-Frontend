<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	import { isLoggedIn, user_Data, user_Extended_Data } from '../../../../../stores/user.js';
	import { goto } from '$app/navigation';

	let addresses = [];

	user_Extended_Data.subscribe((value) => {
		addresses = value.addresses;
	});

	let add_address_toggler = false;

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
</script>

<div class="addresses">
	{#if addresses.length > 0}
	<h1 class="address-heading">Your Saved Addresses</h1>
	<Table
		style="background: transparent; border-color: #0aac71; border-width: 1px; color: aliceblue; width: 700px; margin-top:20px;"
		hoverable={true}
	>
		<TableHead style="background: transparent" class="bg-gray-50 dark:bg-gray-700">
			<TableHeadCell style=" color: aliceblue;">Address Field</TableHeadCell>
			<TableHeadCell style=" color: aliceblue;" class="table-header-text">City</TableHeadCell>
			<TableHeadCell style=" color: aliceblue;" class="table-header-text">State</TableHeadCell>
			<TableHeadCell style=" color: aliceblue;" class="table-header-text">Country</TableHeadCell>
			<TableHeadCell style=" color: aliceblue;" class="table-header-text">Pincode</TableHeadCell>
		</TableHead>
		<TableBody style="background: transparent" tableBodyClass="divide-y">
			{#each addresses as address}
				<TableBodyRow style="background: transparent">
					<TableBodyCell style=" color: aliceblue;">
						{#if address.addressfield == undefined}
						{address.address_field}
						{:else}
						{address.addressfield}
						{/if}
					</TableBodyCell>
					<TableBodyCell style=" color: aliceblue;">{address.city}</TableBodyCell>
					<TableBodyCell style=" color: aliceblue;">{address.state}</TableBodyCell>
					<TableBodyCell style=" color: aliceblue;">{address.country}</TableBodyCell>
					<TableBodyCell style=" color: aliceblue;">{address.pincode}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	{:else}
	<div style="background: transparent; aliceblue; width: 700px; margin-top:20px;">
		<h1 class="address-heading" style="margin-left: 160px;">You don't have any saved addresses</h1>
	</div>
	{/if}

	<button class="add-address-btn" on:click={() => (add_address_toggler = true)}
		>Add a new address</button
	>

	{#if add_address_toggler}
		<div style="position: relative; left: -120px; top:20px;">
			<form>
				<div class="address-containers">
					<label for="address.addressField" class="input-label">
						Address Field :
						<input
							class="input"
							style="width:593px;"
							type="text"
							name="addressField"
							bind:value={address_field}
							placeholder="Address Field"
							disabled={address_field_valid}
						/>
					</label>
				</div>
	
				<div style="display: flex; flex-direction: row;">
					<div class="address-containers" >
						<label for="address.city" class="input-label" >
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
					</div>
		
					<div class="address-containers" style="position: relative; left: 100px;">
						<label for="address.state" class="input-label" style="position: relative; left: 100px;">
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
					</div>
				</div>
				
				<div style="display: flex; flex-direction: row;">
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
					</div>
		
					<div class="address-containers" style="position: relative; left: 100px;">
						<label for="address.pincode" class="input-label" style="position: relative; left: 100px;">
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
					</div>
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
				</div>
	
				<div style="display: flex; flex-direction: row; position: relative; left: 120px;">
					<button
						on:click|preventDefault={() => {
							add_address(event);
						}}
						class="add-address-btn"
						>Save Address</button
					>
					<button
						class="add-address-btn"
						
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
						}}>Clear Address</button
					>
				</div>
			</form>
		</div>
	{/if}
</div>

<style>
	.addresses {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-top:60px;
		margin-bottom:60px;
	}

	.address-heading {
		color: aliceblue;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		font-size: 30px;
	}

	.add-address-btn {
		background-color: #002b1b;
		color: white;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
	}

	.address-heading {
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
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

	.address-containers {
		display: flex;
		flex-direction: column;
		width: 60%;
		justify-content: start;
		align-self: center;
	}
</style>
