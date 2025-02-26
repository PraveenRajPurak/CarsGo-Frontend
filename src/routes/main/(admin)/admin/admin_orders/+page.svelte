<script>
	import { admin_Data } from '../../../../../stores/admin.js';
	import { onMount } from 'svelte';

	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronRightOutline, ChevronDownOutline } from 'flowbite-svelte-icons';

	let sessionToken;
	let orders = [];
	let chartData = { labels: [], datasets: [], sum: 0 };

	async function GetOrders() {
		try {
			if (!sessionToken) {
				throw new Error('Session token not found');
			}
			console.log('Session Token:', sessionToken);
			const res = await fetch('http://localhost:10010/admin/view-orders', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Admin_Authorization: `Bearer ${sessionToken}`
				},
				credentials: 'include'
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await res.json();
			orders = data.data;
			console.log('Orders:', orders);
			updateChartData();
		} catch (error) {
			console.error(error);
			orders = [];
		}
	}

	function groupOrdersByMonth(orders) {
		const monthlyData = {};

		orders.forEach((order) => {
			const date = new Date(order.order_date);
			const month = date.toLocaleString('default', { month: 'short' });

			monthlyData[month] = (monthlyData[month] || 0) + 1;
		});

		return Object.entries(monthlyData).map(([month, count]) => ({
			month,
			count
		}));
	}

	let options;

	function updateChartData() {
		const monthlyOrders = groupOrdersByMonth(orders);
		console.log('Monthly Orders:', monthlyOrders);

		chartData = {
			labels: monthlyOrders.map((item) => item.month),
			datasets: monthlyOrders.map((item) => item.count),
			sum: monthlyOrders.reduce((total, item) => total + item.count, 0)
		};
		console.log('ChartData : ', chartData);

		if (chartData.labels.length > 0) {
			options = {
				chart: {
					height: '370px',
					maxWidth: '100%',
					type: 'area',
					fontFamily: 'Inter, sans-serif',
					dropShadow: {
						enabled: true
					},
					toolbar: {
						show: false
					}
				},
				tooltip: {
					enabled: true,
					x: {
						show: true
					}
				},
				fill: {
					type: 'gradient',
					gradient: {
						opacityFrom: 0.55,
						opacityTo: 0,
						shade: '#002b1b',
						gradientToColors: ['#002b1b']
					}
				},
				dataLabels: {
					enabled: true
				},
				stroke: {
					width: 6
				},
				grid: {
					show: false,
					strokeDashArray: 4,
					padding: {
						left: 2,
						right: 2,
						top: 0
					}
				},
				series: [
					{
						name: 'Number of Orders',
						data: chartData.datasets,
						color: '#002b1b'
					}
				],
				xaxis: {
					categories: chartData.labels,
					labels: {
						show: true
					},
					axisBorder: {
						show: true
					},
					axisTicks: {
						show: false
					}
				},
				yaxis: {
					show: true
				}
			};
		}
	}

	onMount(() => {
		admin_Data.subscribe((data) => {
			if (data?.SessionToken) {
				sessionToken = data.SessionToken;
				GetOrders();
			}
		});
	});
</script>

<Card class="w-full h-full" style = "background-color: #C7DB9C; margin-top: 30px; " >
	<div class="flex justify-between">
		<div>
			<h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
				{chartData.sum}
			</h5>
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">Total Orders</p>
		</div>
	</div>
	{#if chartData.labels.length > 0}
		<Chart {options} />
	{/if}
</Card>

<div class="admin-orders-container">
	<h1 class="admin-orders-heading">Orders</h1>
	<div class="cards">
		{#each orders as order}
			<div class="card">
				<h1 class="card-text">Order ID #{order.orderID}</h1>
				<p class="card-text">Order Status: {order.order_status}</p>
				<p class="card-text">Order Date: {order.order_date}</p>
				<p class="card-text">Order Amount: Rs. {order.order_amount}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.admin-orders-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}


	.admin-orders-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
		margin-top: 40px;
	}

	.cards {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card {
		width: 600px;
		padding: 20px;
		margin: 10px;
		background-color: #002b1b;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		align-items: center;
		justify-content: center;
		justify-items: center;
	}

	.card-text {
		color: whitesmoke;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 5px;
	}
</style>
