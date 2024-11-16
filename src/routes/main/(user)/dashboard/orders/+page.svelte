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
	import { onMount } from 'svelte';

    async function get_orders(event) {
        const orders_details = await fetch('http://localhost:10010/users/get-user-orders', {
            method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + $user_Data.SessionToken
			},
			credentials: 'include'
        })

        let orders = await orders_details.json();
        console.log("Orders list fetched from the backend : ",orders.data);

        if (orders.length == 0)  {
            return []
        }
        return orders.data
    }

    let orders = [];

    onMount(async () => {
        let orders2 = await get_orders();
       
        for(let i=0; i<orders2.length; i++) {
            orders2[i].product = [];
            orders2[i].product.push({
                productName: orders2[i].productName,
                quantity: orders2[i].quantity
            })
            let j = i+1;
            while (j < orders2.length && orders2[i].orderID === orders2[j].orderID) {
                orders2[i].product.push({
                    productName: orders2[j].productName,
                    quantity: orders2[j].quantity
                })
                j++;
            }
            i=j-1;
        }

        console.log("Orders before form : ", orders2);

        orders = [...orders2.filter(order => order.product != null)];

        console.log("Orders after form : ",orders);
    })
</script>

<div class="orders">
    <h1 class="orders-heading">Your Orders</h1>
<Table style="background: transparent; border-color: #0aac71; border-width: 1px; color: aliceblue; width: 700px; margin-top:20px;" hoverable={true}>
	<TableHead style="background: transparent" class="bg-gray-50 dark:bg-gray-700">
		<TableHeadCell style=" color: aliceblue;">Order ID</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Product</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Amount</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Date</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Status</TableHeadCell>
	</TableHead>
	<TableBody style="background: transparent" tableBodyClass="divide-y">
        {#each orders as order}
		<TableBodyRow style="background: transparent">
			<TableBodyCell style=" color: aliceblue;">{order.orderID}</TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">
                {#each order.product as product}
                    <p>{product.productName} X {product.quantity}</p>
                {/each}
            </TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">Rs. {order.order_amount}</TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">{order.order_date.split('T')[0]}</TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">{order.order_status}</TableBodyCell>
		</TableBodyRow>
        {/each}
	</TableBody>
</Table>
</div>

<style>
    .orders {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        margin-top: 60px;
    }

    .orders-heading{
        color: aliceblue;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        font-size: 30px;
    }
</style>