<script>
	import {
		Alert,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	import { Modal, Button, Label, Textarea, Rating, Spinner } from 'flowbite-svelte';

	import { goto } from '$app/navigation';

	import { products_store, addProduct, updateProducts } from '../../../../../stores/products.js';

	console.log('Products from store here : ', $products_store);

	import { isLoggedIn, user_Data, user_Extended_Data } from '../../../../../stores/user.js';
	import { onMount } from 'svelte';

	function getProductsID(product_name) {
		return $products_store.find((product) => product.name === product_name)._id;
	}

	async function get_orders(event) {
		const orders_details = await fetch('http://localhost:10010/users/get-user-orders', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + $user_Data.SessionToken
			},
			credentials: 'include'
		});

		let orders = await orders_details.json();
		console.log('Orders list fetched from the backend : ', orders.data);

		if (orders.length == 0) {
			return [];
		}
		return orders.data;
	}

	let orders = [];

	let orderID = '';

	let reviewModal = false;
	let selectedOrder = null;
	let reviewContent = '';
	let ratingValue = 0;
	let isSubmitting = false;
	let reviewSuccess = false;
	let errorMessage = '';

	function openReviewModal(order) {
		selectedOrder = order;
		reviewModal = true;
		reviewContent = '';
		ratingValue = 0;
		reviewSuccess = false;
		errorMessage = '';
	}

    let allowReview = true;

	// Function to submit review
	async function submitReview(productId) {

        ratingValue = parseInt(ratingValue);
		if (ratingValue === 0) {
			errorMessage = 'Please select a rating';
			return;
		}

		if (!reviewContent.trim()) {
			errorMessage = 'Please provide a review';
			return;
		}

		try {
			isSubmitting = true;
			errorMessage = '';

			let formData = {
				customer_id: $user_Data.ID,
				order_id: orderID,
				product_id: productId,
				review: reviewContent,
				rating: ratingValue
			};

			console.log('Form Data : ', formData);

			const response = await fetch('http://localhost:10010/users/reviews', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + $user_Data.SessionToken
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'Failed to submit review');
			}

			// Review submitted successfully
			reviewSuccess = true;

			// Optional: Mark the product as reviewed locally
			const productIndex = selectedOrder.product.findIndex((p) => {
				const productDetails = $products_store.find((prod) => prod.name === p.productName);
				return productDetails && productDetails._id === productId;
			});

            if (productIndex !== -1) {
                selectedOrder.product[productIndex].reviewed = true;
            }

            console.log('Review submitted successfully');
            allowReview = false;			// Reset form after successful submission
            goto('/main/dashboard/');
			reviewContent = '';
			ratingValue = 0;
		} catch (error) {
			console.error('Review submission error:', error);
			errorMessage = error.message || 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// Close modal and reset
	function closeReviewModal() {
		reviewModal = false;
		selectedOrder = null;
		reviewContent = '';
		ratingValue = 0;
		reviewSuccess = false;
		errorMessage = '';
	}

	async function chat_support(event, order) {
		event.preventDefault();

		if (order.chatID == null || order.chatID == '000000000000000000000000') {
			let formData = {
				user_id: $user_Data.ID,
				order_id: orderID
			};

			console.log('Form Data: ', formData);
			//do something
			try {
				const res = await fetch('http://localhost:10010/users/create-chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + $user_Data.SessionToken
					},
					body: JSON.stringify(formData)
				});

				if (!res.ok) {
					throw new Error('Error creating chat!');
				}
				const data = await res.json();
				console.log(data);

				console.log('chat id : ', data.chat_id);

				let ChatID = String(data.chat_id);

				if (data.chat_id == null || data.chat_id == '000000000000000000000000') {
					Alert('Error creating chat!');
					throw new Error('Error creating chat!');
				} else {
					goto('/main/dashboard/orders/' + ChatID);
				}
			} catch (err) {
				console.log(err);
				throw new Error('Error creating chat!');
			}
		} else {
			console.log('Chat id : ', order.chatID);
			let ChatID = String(order.chatID);
			goto('/main/dashboard/orders/' + ChatID);
		}
	}

	function handleRatingChange(event) {
		ratingValue = event.detail;
		console.log('Rating changed to:', ratingValue);
	}

	onMount(async () => {
		let orders2 = await get_orders();

		for (let i = 0; i < orders2.length; i++) {
			orders2[i].product = [];
			orders2[i].product.push({
				productName: orders2[i].productName,
				quantity: orders2[i].quantity
			});
			let j = i + 1;
			while (j < orders2.length && orders2[i].orderID === orders2[j].orderID) {
				orders2[i].product.push({
					productName: orders2[j].productName,
					quantity: orders2[j].quantity
				});
				j++;
			}
			i = j - 1;
		}

		console.log('Orders before form : ', orders2);

		orders = [...orders2.filter((order) => order.product != null)];

		console.log('Orders after form : ', orders);
	});
</script>

<!-- Your existing table code remains unchanged -->

<!-- Review Modal -->
<Modal bind:open={reviewModal} size="lg" autoclose={false} class="w-full">
	<div class="text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{#if reviewSuccess}
				Thank you for your review!
			{:else}
				Rate & Review Your Purchase
			{/if}
		</h3>

		{#if selectedOrder && !reviewSuccess}
			<div class="mb-6">
				<h4 class="font-medium mb-2">Select a product to review:</h4>
				<div class="space-y-4">
					{#each selectedOrder.product as product}
						<div class="border p-4 rounded-lg dark:border-gray-700">
							<h5 class="font-medium">{product.productName}</h5>
							<div class="mt-3">
								<Label class="block mb-2">Your Rating (1-5)</Label>

								<!-- Just simple radio buttons -->
								<div class="flex justify-center items-center gap-4 mb-4">
									<div class="flex items-center">
										<input
											type="radio"
											id="rating1"
											name="rating"
											value="1"
											bind:group={ratingValue}
										/>
										<label for="rating1" class="ml-1">1</label>
									</div>
									<div class="flex items-center">
										<input
											type="radio"
											id="rating2"
											name="rating"
											value="2"
											bind:group={ratingValue}
										/>
										<label for="rating2" class="ml-1">2</label>
									</div>
									<div class="flex items-center">
										<input
											type="radio"
											id="rating3"
											name="rating"
											value="3"
											bind:group={ratingValue}
										/>
										<label for="rating3" class="ml-1">3</label>
									</div>
									<div class="flex items-center">
										<input
											type="radio"
											id="rating4"
											name="rating"
											value="4"
											bind:group={ratingValue}
										/>
										<label for="rating4" class="ml-1">4</label>
									</div>
									<div class="flex items-center">
										<input
											type="radio"
											id="rating5"
											name="rating"
											value="5"
											bind:group={ratingValue}
										/>
										<label for="rating5" class="ml-1">5</label>
									</div>
								</div>

								<Label for="review" class="block mb-2">Your Review</Label>
								<Textarea
									id="review"
									placeholder="Share your experience with this product..."
									rows="4"
									bind:value={reviewContent}
									class="mb-4"
								/>

								{#if errorMessage}
									<p class="text-red-500 text-sm mb-4">{errorMessage}</p>
								{/if}

								<div class="flex justify-center space-x-4">
									<Button color="alternative" on:click={closeReviewModal}>Cancel</Button>
									<Button
										color="primary"
										on:click={() => submitReview(getProductsID(product.productName))}
										disabled={isSubmitting}
									>
										{#if isSubmitting}
											<Spinner size="sm" class="mr-2" />
											Submitting...
										{:else}
											Submit Review
										{/if}
									</Button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if reviewSuccess}
			<div class="text-center">
				<svg
					class="mx-auto mb-4 w-14 h-14 text-green-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
					></path>
				</svg>
				<p class="mb-5">Your review has been submitted successfully!</p>
				<Button color="primary" on:click={closeReviewModal}>Close</Button>
			</div>
		{/if}
	</div>
</Modal>
<div class="orders">
	<h1 class="orders-heading">Your Orders</h1>
	<Table
		style="background: transparent; border-color: #0aac71; border-width: 1px; color: aliceblue; width: 700px; margin-top:20px;"
		hoverable={true}
	>
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
					<TableBodyCell class="help-button" on:click={console.log('Hello')}>
						<button
							preventDefault
							class="help-button"
							on:click={() => {
								console.log('Hello');
								orderID = order.orderID;
								chat_support(event, order);
							}}>Help</button
						>
					</TableBodyCell>
					{#if (!order.rated || order.rated == false)  }
						<TableBodyCell class="rate-button">
							<button
								preventDefault
								class="help-button"
								on:click={() => {
									console.log('Rate button clicked');
									orderID = order.orderID;
									openReviewModal(order); // Call our new function
								}}>Rate</button
							>
						</TableBodyCell>
					{/if}
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

	.orders-heading {
		color: aliceblue;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		font-size: 30px;
	}

	.help-button {
		background-color: #002b1b;
		color: white;
		font-size: 15px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 5px;
	}
</style>
