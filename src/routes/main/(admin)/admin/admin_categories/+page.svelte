<script>
	import { goto } from '$app/navigation';
	let categories = [];

	export let data;

	console.log('Admin Categs: ', data.categories.data);

	categories = data.categories.data;
</script>

<div class="admin-categories">
	<h1 class="admin-categories-heading">Categories</h1>

	{#each categories as category}
		<div class="category">
			<h2 class="category-name">{category.name}</h2>
			<img src={category.categoryimage} alt="image2" style="width: 10rem;" />
			<p class="category-text">Description: {category.general_description}</p>
		</div>
	{/each}
</div>

<style>
	.admin-categories {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.admin-categories-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
        margin-top: 20px;
	}

	.category {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 100%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #002b1b;
	}

	.category-name {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.category-text {
		font-size: 16px;
		margin-bottom: 5px;
	}

	.category-name {
		color: white;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.category-text {
		color: white;
		font-size: 16px;
		margin-bottom: 5px;
	}
</style>
