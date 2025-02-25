<div class="dashboard-container">
	<h1 class="dashboard-heading">Welcome to Admin Dashboard 🚀</h1>
	<h2 class="dashboard-subheading">Here are your superpowers to manage the store efficiently:</h2>
	<div class="cards">
		<div class="card">
			<h1 class="card-heading">Products 🏷️</h1>
			<ul class="card-list">
				<li class="list-item">View all listed products (cars)</li>
				<li class="list-item">Add new cars to the inventory</li>
				<li class="list-item">Modify or delete existing cars</li>
			</ul>
		</div>
		<div class="card">
			<h1 class="card-heading">Orders 📦</h1>
			<ul class="card-list">
				<li class="list-item">View all placed orders</li>
				<li class="list-item">Update order statuses (Pending, Shipped, Delivered)</li>
				<li class="list-item">Cancel or refund orders if needed</li>
			</ul>
		</div>
		<div class="card">
			<h1 class="card-heading">Categories 📂</h1>
			<ul class="card-list">
				<li class="list-item">Manage product categories</li>
				<li class="list-item">Create new categories or modify existing ones</li>
			</ul>
		</div>
		<div class="card">
			<h1 class="card-heading">Customers 👥</h1>
			<ul class="card-list">
				<li class="list-item">View registered customers</li>
				<li class="list-item">Manage customer details</li>
				<li class="list-item">Handle customer inquiries</li>
			</ul>
		</div>
		<div class="card">
			<h1 class="card-heading">Admins 🔑</h1>
			<ul class="card-list">
				<li class="list-item">Manage store admins</li>
				<li class="list-item">Add or remove admin access</li>
			</ul>
		</div>
		<div class="card">
			<h1 class="card-heading">Shipments 🚚</h1>
			<ul class="card-list">
				<li class="list-item">Track and manage shipments</li>
				<li class="list-item">Update delivery statusesy</li>
				<li class="list-item">Assign shipping providers</li>
			</ul>
		</div>
	</div>
</div>

<style>
    .dashboard-container{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        display: flex;
        height: 100%;
        width: 100%;
    }

    .dashboard-heading{
        color: whitesmoke;
        font-size: 35px;
        font-weight: 700;
        font-family: 'montserrat', sans-serif;
        margin-bottom: 30px;
    }

    .dashboard-subheading{
        color: whitesmoke;
        font-size: 25px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        margin-bottom: 30px;
    }

    .cards{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        width: 100%;
        padding: 10px;
        margin-top: 0px;
        margin-bottom: 25px;
    }

    .card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 15px;
        background-color: #002b1b;
    }

    .card-heading{
        color: whitesmoke;
        font-size: 25px;
        font-weight: 700;
        font-family: 'montserrat', sans-serif;
        margin-bottom: 30px;
    }

    .card-list{
        color: whitesmoke;
        font-size: 20px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
    }

    .list-item{
        color: whitesmoke;
        font-size: 20px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        margin-bottom: 5px;
    }

</style>