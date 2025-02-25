<script>
	import { admin_Data } from '../../../../../stores/admin.js';
	import { onMount } from 'svelte';

	let sessionToken;
	let orders = [];

	admin_Data.subscribe((data) => {
		sessionToken = data?.SessionToken;
	});

	onMount(async () => {
		try {
			console.log('Session Token:', sessionToken);
			const res = await fetch('http://localhost:10010/admin/view-orders', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'agfegsrt',
				},
				credentials: 'include',
                mode: 'no-cors',
			});

            if (!res.ok) {  
                throw new Error('Network response was not ok');
            }

			const data = await res.json();
            orders = data;
            console.log('Orders:', orders);
		} catch (error) {
			console.error(error);
            orders = [];
		}
	});
</script>

<div class="admin-orders-container">
	<h1 class="admin-orders-heading">Orders</h1>
	{#if orders.length > 0}
		{#each orders as order}
			<p>Order ID: {order.id} - Status: {order.status}</p>
		{/each}
	{:else}
		<p>No orders found.</p>
	{/if}
</div>
