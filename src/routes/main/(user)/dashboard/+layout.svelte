<script>
    import {goto} from "$app/navigation";
</script>
<div class="dashboard-container">
	<div class="dashboard-banner">
		<img src="/userd-banner.png" alt="Banner" style="width: 100%; height: 250px;" />
		<h1 class="dashboard-heading">Dashboard</h1>
		<div class="upper-tabs">
			<div class="tab" on:click = {() => {goto ('/main/dashboard') }}>
				<img class="tab-image" src="/dashboard-icon.png" alt="Dashboard" />
				<p class="tab-text">Dashboard</p>
			</div>
			<div class="tab" on:click = {() => {goto ('/main/dashboard/orders') }}>
				<img class="tab-image" src="/orders-icon.png" alt="Orders" />
				<p class="tab-text">Orders</p>
			</div>
			<div class="tab" on:click = {() => {goto ('/main/dashboard/tickets') }}>
				<img class="tab-image" src="/tickets-icon.png" alt="Tickets" />
				<p class="tab-text">Tickets</p>
			</div>
			<div class="tab" on:click = {() => {goto ('/main/cart') }}>
				<img class="tab-image" src="/cart-icon.png" alt="Dashboard" />
				<p class="tab-text">Cart</p>
			</div>
		</div>
	</div>
	<div class="dashboard-frame">
		<div class="left-tabs">
            <div class="tab-bottom" on:click = {() => {goto ('/main/dashboard/addresses') }}>
				<img class="tab-image" src="/addresses-icon.png" alt="Dashboard" />
				<p class="tab-text">Addresses</p>
			</div>
			<div class="tab-bottom" on:click = {() => {goto ('/main/products') }}>
				<img class="tab-image" src="/shop-icon.png" alt="Shop" />
				<p class="tab-text">Shop</p>
			</div>
			<div class="tab-bottom">
				<img class="tab-image" src="/logout-icon.png" alt="Logout" />
				<p class="tab-text">Logout</p>
			</div>
        </div>
		<div class="content">
			<slot />
		</div>
	</div>
</div>

<style>
	.dashboard-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		justify-items: center;
		width: 100%;
		height: 100%;
		margin-top: 20px;
	}

	.dashboard-heading {
		font-size: 70px;
		font-weight: 600;
		font-family: 'montserrat', sans-serif;
		color: white;
		position: relative;
		top: -150px;
		text-align: center;
	}

	.dashboard-banner {
		width: 100%;
		height: 100%;
		background-color: 'transparent';
		margin: 0;
		margin-top: -25px;
	}

	.dashboard-frame {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 100%;
		height: 100%;
	}

	.left-tabs {
        display: flex;
        flex-direction: column;
		width: 30%;
		height: 100%;
		background-color: 'transparent';
        justify-content: center;
        justify-content: center;
        align-items: center;
        justify-items: center;
        position: relative;
        left: 104px;
        margin-top: 80px;
	}

	.content {
		width: 70%;
		height: 100%;
		background-color: 'transparent';
	}

    .upper-tabs{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-items: center;
        margin-top: -150px;
    }

	.tab {
		width: 120px;
		height: 120px;
        background-color: 'transparent';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        margin-right: 100px;
        border-width: 1.5px;
        border-color: #0aac71;
        border-radius: 10%;
        border-style: solid;
		cursor: pointer;
	}
	.tab-bottom {
		width: 120px;
		height: 120px;
        background-color: 'transparent';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        margin-bottom: 80px;
        border-width: 1.5px;
        border-color: #0aac71;
        border-radius: 10%;
        border-style: solid;
		cursor: pointer;
	}

    .tab-image{
        width: 80px;
        height: 80px;
    }

    .tab-text {
        font-size: 20px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        color: white;
    }
</style>
