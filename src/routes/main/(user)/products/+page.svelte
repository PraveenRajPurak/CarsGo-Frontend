<script>
	let categories = [
		{
			id: 1,
			name: 'Hatchback',
			img_url: '/car4.png'
		},
		{
			id: 2,
			name: 'Sedan',
			img_url: '/car5.png'
		},
		{
			id: 1,
			name: 'SUV',
			img_url: '/car6.png'
		}
	];

	let products = [
		{
			id: 1,
			name: 'Maruti Suzuki Swift',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.6,00,000'
		},
		{
			id: 2,
			name: 'Maruti Suzuki Baleno',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.6,00,000'
		},
		{
			id: 3,
			name: 'Tata Nexon',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.8,00,000'
		},
		{
			id: 4,
			name: 'Hyundai i20',
			img_url: '/car1.png',
			category: 'Hatchback',
			price: 'Rs.7,00,000'
		}
	];
</script>

<div class="product-list">
	<h1 class="product-heading">Our Categories</h1>
	<div class="categories">
		{#each categories as category}
			<div class="category">
				<img
					src={category.img_url}
					alt="category"
					style="width: 100px; height: 100px; border-radius: 50%;"
				/>
				<p class="category-name">{category.name}</p>
			</div>
		{/each}
	</div>

	<h1 class="product-heading" style="margin-top:30px;">Our Products</h1>
	<div class="products">
		{#each products as product}
			<div class="product">
				<img src={product.img_url} alt="product" style="width: 200px; height: 200px;" />
				<p class="product-name">{product.name}</p>
				<p class="product-category">{product.category}</p>
				<p class="product-price">{product.price}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.product-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 40px;
	}

	.categories {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		position: relative;
		left: 55px;
	}

	.category {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-right: 120px;
	}

	.product-heading {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.category-name {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.products {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6rem;
		justify-items: center;
		align-items: center;
		justify-content: center;
	}

	.product {
        padding: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 20px;
		border-color: #002b1b;
		border-width: 2px;
	}

	.product-name {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.product-price {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.product-category {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}
</style>
