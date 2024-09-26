<script> 
	import { goto } from '$app/navigation';
	let cartitems = [
		{
			id: 1,
			name: 'Maruti Suzuki Swift',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car4.png',
			quantity: 1,
			get subtotal() {
				let price = (this.price).substring(3);
				let quantity = this.quantity;
				return price*quantity
			}
		},
		{
			id: 2,
			name: 'Maruti Suzuki Baleno',
			category: 'Hatchback',
			price: 'Rs.600000',
			img_url: '/car4.png',
			quantity: 2,
			get subtotal() {
				let price = (this.price).substring(3);
				let quantity = this.quantity;
				return price*quantity
			}
		}
	];

	let sum = 0;

    let address = {
        addressField: "",
        city: "",
        country: "",
        pincode: ""
    }

    let phone = "";

    let payment_methods = ["Paytm", "GooglePay","PhonePe","COD"];

    let payment_method = "";

    $: {
        sum = 0;
        for (let i = 0; i < cartitems.length; i++) {
			let item_price = parseInt((cartitems[i].price).substring(3));
			let item_quantity = cartitems[i].quantity;
            sum += item_price * item_quantity;
        }
    }
</script>

<div class="checkout-page">
	<h1 class="checkout-heading">You are almost there...</h1>
	<div class="checkout-container">
		<div class="address-container">
            <h1 class="address-heading">Enter Your Address</h1>
            <label for="address.addressField" class="input-label">
                Address Field :
                <input class="input" type="text" bind:value={address.addressField} placeholder="Address Field">
            </label>
            <label for="address.city" class="input-label"> 
                City :
                <input class="input" type="text" bind:value={address.city} placeholder="City">
            </label>
            <label for="address.country" class="input-label">
                Country
                <input class="input" type="text" bind:value={address.country} placeholder="Country">
            </label>
            <label for="address.pincode" class="input-label">
                Pincode
                <input class="input" type="text" bind:value={address.pincode} placeholder="Pincode">
            </label>
            <label for="phone" class="input-label">
                Phone
                <input class="input" type="text" bind:value={phone} placeholder="Phone Number">
            </label>
            <label for="payment_method" class="input-label">
                Payment Method
                <select class="input" name="payment_method" id="payment_method" bind:value={payment_method}>
                    {#each payment_methods as method}   
                    <option value="{method}">{method}</option>
                    {/each}
                </select>
            </label>
        </div>
        <div class="items-container">

            <p class="total-text"> Items</p>

            {#each cartitems as item}
            <div class="item">
                <img src={item.img_url} alt="Product" style="height: 100px; width: 100px;" />
                <p class="item-text">{item.name}</p>
                <p class="item-text">{item.price} X {item.quantity}</p>
                <p class="item-text">{"Rs. "+item.subtotal}</p>
            </div>
            {/each}

            <p class="total-text">Total: Rs.{sum}</p>
            {#if payment_method !== ""}
            <p class="total-text">Payment Method: {payment_method}</p>
            {/if}

            <button class="checkout-btn">Place Order</button>
        </div>
	</div>
</div>

<style>

    .checkout-page {
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin: 80px;
    }

    .checkout-heading {
        margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
    }

    .checkout-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-items: center;
        border-width: 1.5px;
        border-color: #0aac71;
        width: 80%;
    }

    .address-container {
        display: flex;
        flex-direction: column;
        width: 60%;
        justify-content: start;
        align-self: center;
        position: relative;
        left: 60px;
    }	

    .items-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        justify-items: center;
        width: 40%;
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
        height:30px;
        width: 220px;
        font-size: 15px;
        font-weight: 500;
        justify-content: end;
        font-family: 'montserrat', sans-serif;
        border-radius: 5px;
        padding: 10px;
        color: black;
        position : absolute;
        left: 200px;
    }

    .item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-items: center;
        margin-bottom: 10px;
        color: white;
    }

    .item-text {
        font-size: 12px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        margin: 7px;
        color: white;
    }

    .total-text {
        font-size: 20px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        margin: 20px;
        color: white;
    }

    .checkout-btn {
        background-color: #002b1b;
        color: white;
        font-size: 20px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        margin: 20px;
    }
</style>
