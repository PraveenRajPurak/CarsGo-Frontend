<script>
	import { goto } from '$app/navigation';
	import { isAdminLoggedIn, admin_Data, updateAdminData } from '../../../../stores/admin.js';

	console.log('Admin data: ', $admin_Data);
	console.log('Is admin logged in: ', $isAdminLoggedIn);
</script>

{#if $isAdminLoggedIn}
	<div class="dashboard-container-parent">
		<div class="left-panel">
			<div
				on:click={() => {
					goto('/main/admin/admin_orders');
				}}
				class="left-panel-buttons"
				style="margin-top: 70px;"
			>
				<div class="left-panel-buttons-container">
					<img
						src="/orders.png"
						alt="Orders"
						style="height: 27px; width: 27px; margin-right: 10px;"
					/>
					<h1 class="left-panel-button-heading">Orders</h1>
				</div>
				<p class="left-panel-button-text">Track and manage orders</p>
			</div>
			<div
				on:click={() => {
					goto('/main/admin/admin_products');
				}}
				class="left-panel-buttons"
			>
				<div class="left-panel-buttons-container">
					<img
						src="/Products.png"
						alt="Orders"
						style="height: 33px; width: 33px; margin-right: 10px;"
					/>
					<h1 class="left-panel-button-heading">Products</h1>
				</div>
				<p class="left-panel-button-text">Manage products</p>
			</div>
			<div
				on:click={() => {
					goto('/main/admin/admin_categories');
				}}
				class="left-panel-buttons"
			>
				<div class="left-panel-buttons-container">
					<img
						src="/categs.png"
						alt="Categories"
						style="height: 29px; width: 29px; margin-right: 10px;"
					/>
					<h1 class="left-panel-button-heading">Categories</h1>
				</div>
				<p class="left-panel-button-text">Manage categories</p>
			</div>
			<div
				on:click={() => {
					goto('/main/admin/admin_customers');
				}}
				class="left-panel-buttons"
			>
				<div class="left-panel-buttons-container">
					<img
						src="/customers.png"
						alt="Customers"
						style="height: 27px; width: 27px; margin-right: 10px;"
					/>
					<h1 class="left-panel-button-heading">Customers</h1>
				</div>
				<p class="left-panel-button-text">Manage customers</p>
			</div>
			<div
				on:click={() => {
					goto('/main/admin/admin_Admins');
				}}
				class="left-panel-buttons"
			>
				<div class="left-panel-buttons-container">
					<img
						src="/admins.png"
						alt="Admins"
						style="height: 28px; width: 28px; margin-right: 10px;"
					/>
					<h1 class="left-panel-button-heading">Admins</h1>
				</div>
				<p class="left-panel-button-text">Manage admins</p>
			</div>
			<div
				on:click={() => {
					goto('/main/admin/admin_shipments');
				}}
				class="left-panel-buttons"
			>
				<div class="left-panel-buttons-container">
					<img
						src="/ship.png"
						alt="Shipments"
						style="height: 33px; width: 33px; margin-right: 10px;"
					/>
					<h1 class="left-panel-button-heading">Shipments</h1>
				</div>
				<p class="left-panel-button-text">Manage Shipments</p>
			</div>
		</div>
		<div class="right-panel">
			<div class="right-panel-header" style="margin-top:20px; margin-bottom: 20px;">
				<h1
					style="color:whitesmoke; margin-left: 10px; font-size: 35px; font-family: 'montserrat', sans-serif; font-weight: 600; text-align: center;"
				>
					Admin Dashboard
				</h1>
				<div class="admin-init">
					<h1 style="color:whitesmoke; margin-right: 10px; font-size: 20px; ">Hi, Admin</h1>
					<img src="/profile.png" alt="Profie_Picture" style="height: 40px; width: 40px;" />
				</div>
			</div>

			<div class="right-panel-content">
				<slot />
			</div>
		</div>
	</div>
{:else}
	<div class="not-logged-in">
		We couldn't find the page you were looking for
		{goto('/main/admin_login')}
	</div>
{/if}

<style>
	.dashboard-container-parent {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
	}
	.left-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		background-color: #002b1b;
		position: sticky;
	}

	.left-panel-buttons {
		display: flex;
		flex-direction: column;
		width: 70%;
		justify-content: center;
		align-items: center;
		justify-items: center;
		border-color: #004029;
		border-radius: 15px;
		background-color: #002b1b;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-width: 0.75px;
		padding: 15px;
		margin: 20px;
	}
	.left-panel-buttons:hover {
		display: flex;
		flex-direction: column;
		width: 70%;
		justify-content: center;
		align-items: center;
		justify-items: center;
		background-color: #004029;
		border-color: #004029;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-width: 0.75px;
		padding: 15px;
		margin: 20px;
		cursor: pointer;
	}

	.left-panel-buttons-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		justify-items: center;
		width: 100%;
		height: 100%;
		margin-bottom: 10px;
	}

	.left-panel-button-heading {
		color: whitesmoke;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		font-size: 20px;
	}

	.left-panel-button-text {
		color: whitesmoke;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		font-size: 15px;
	}

	.right-panel {
		display: flex;
		flex-direction: column;
		width: 75%;
		height: 100%;
		background-color: #003521;
		padding: 10px;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.right-panel-header {
		display: flex;
		flex-direction: row;
		width: 100%;
		border-bottom-width: 1px;
		border-color: whitesmoke;
		margin-bottom: 30px;
		padding: 10px;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.right-panel-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.admin-init {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		position: relative;
		right: -300px;
	}
</style>
