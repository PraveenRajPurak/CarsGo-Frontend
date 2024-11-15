<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

    let orders = [
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
            },
            date: '2024-01-01'
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
            },
            date: '2024-01-01'
        },
        {
            id: 3,
            name: 'Maruti Suzuki Swift',
            category: 'Hatchback',
            price: 'Rs.600000',
            img_url: '/car4.png',
            quantity: 1,
            get subtotal() {
                let price = (this.price).substring(3);
                let quantity = this.quantity;
                return price*quantity
            },
            date: '2024-01-01'
        }
    ]
</script>

<div class="orders">
    <h1 class="orders-heading">Your Orders</h1>
<Table style="background: transparent; border-color: #0aac71; border-width: 1px; color: aliceblue; width: 700px; margin-top:20px;" hoverable={true}>
	<TableHead style="background: transparent" class="bg-gray-50 dark:bg-gray-700">
		<TableHeadCell style=" color: aliceblue;">Product name</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Category</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Price</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Quantity</TableHeadCell>
		<TableHeadCell style=" color: aliceblue;" class="table-header-text">Subtotal</TableHeadCell>
	</TableHead>
	<TableBody style="background: transparent" tableBodyClass="divide-y">
        {#each orders as order}
		<TableBodyRow style="background: transparent">
			<TableBodyCell style=" color: aliceblue;">{order.name}</TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">{order.category}</TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">{order.price}</TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">{order.quantity}</TableBodyCell>
			<TableBodyCell style=" color: aliceblue;">{order.subtotal}</TableBodyCell>
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