<script>
	import { goto } from '$app/navigation';
	let users = [];

	export let data;

	console.log('Admin Customers: ', data.users.data);

	users = data.users.data;
</script>

<div class="admin-categories">
	<h1 class="admin-categories-heading">Customers</h1>

	{#each users as user}
		<div class="category">
			<h2 class="category-name">{user.name}</h2>
			<p class="category-text">Email: {user.email}</p>
			<p class="category-text">Phone: {user.phone}</p>
			{#if user.orders.length > 0}
				<p class="category-text">Orders</p>
				<hr style="width: 20%; border-color: whitesmoke;" />
				<div class="orders-table">
					{#each user.orders as order}
						<div
							style="display: flex; flex-direction: 'column'; border-bottom: 1px solid whitesmoke"
						>
							<p class="category-text">{order}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="category-text">No orders</p>
			{/if}
			{#if user.addresses.length > 0}
				<p class="category-text">Addresses</p>
				<hr style="width: 50%; border-color: whitesmoke;" />
				<div class="orders-table">
					{#each user.addresses as address}
						<div
							style="display: flex; flex-direction: 'column'; border-bottom: 0.5px solid #004029"
						>
							<p class="category-text">Address Field : {address.addressfield} &nbsp</p>
							<p class="category-text">City : {address.city} &nbsp</p>
							<p class="category-text">State : {address.state} &nbsp</p>
							<p class="category-text">Country : {address.country} &nbsp</p>
							<p class="category-text">Pincode : {address.pincode}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="category-text">No addresses</p>
			{/if}
		</div>
	{/each}
</div>

<style>
	.admin-categories {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.admin-categories-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
		margin-top: 20px;
	}

	.orders-table {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		border-width: 1px;
		border-color: #004029;
		padding: 10px;
		border-radius: 5px;
	}

	.category {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 100%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #002b1b;
	}

	.category-name {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.category-text {
		font-size: 16px;
		margin-bottom: 5px;
	}

	.category-name {
		color: white;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.category-text {
		color: white;
		font-size: 16px;
		margin-bottom: 5px;
	}
</style>
