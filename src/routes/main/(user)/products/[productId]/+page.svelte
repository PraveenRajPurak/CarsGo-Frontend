<script>
    import {page} from "$app/stores";

    const {productId} = $page.params

    let product = {
        id:1,
        name: "Maruti Suzuki Swift",
        category: "Hatchback",
        price: "Rs.600000",
        img_url: "/car4.png",
        description: "The Maruti Suzuki Swift is a popular hatchback known for its stylish design, fuel efficiency, and reliable performance.It offers a comfortable interior, advanced features, and a peppy engine, making it a great choice for city driving and short trips."
    }

    let featured_product = [
        {
            id: 1,
            name: "Maruti Suzuki Swift",
            category: "Hatchback",
            price: "Rs.600000",
            img_url : "/car6.png"
        },
        {
            id: 2,
            name: "Maruti Suzuki Swift",
            category: "Hatchback",
            price: "Rs.600000",
            img_url : "/car6.png"
        },
        {
            id: 3,
            name: "Maruti Suzuki Swift",
            category: "Hatchback",
            price: "Rs.600000",
            img_url : "/car6.png"
        }
    ]
</script>

<div class="product-page">
    <div class="product-route">
        <p class = "product-route-text">carsgo.com/home/products/{product.id}</p>
    </div>
    <div class="product-card">
        <div class="product-image">
            <img src="{product.img_url}" alt="Product" style="height: 450px; width: 450px">
        </div>
        <div class="product-info">
            <h1 class="product-name">{product.name}</h1>
            <p class="product-category">{product.category}</p>
            <p class="product-price">{product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    </div>
    <div class="product-description">
        <p class="description-heading">Product Description</p>
        <p class="description-text">{product.description}</p>
    </div>
    <h1 class="product-heading">Featured Products</h1>
    <div class="featured-products">
        {#each featured_product as fp}
        <div class="featured-product">
            <img src="{fp.img_url}" alt="Product" style="height: 200px; width: 200px">
            <p class="featured-product-name">{fp.name}</p>
            <p class="featured-product-category">{fp.category}</p>
            <p class="featured-product-price">{fp.price}</p>
        </div>
        {/each}
    </div>
</div>

<style>

    .product-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        margin: 50px;
    }

    .product-route {
        display: flex;
        color: "#002b1b";
        text-align: left;

    }

    .product-route-text {
        color: white;
        font-size: 20px;
        font-family: 'montserrat', sans-serif;
        position: relative;
        top: -20px;
        left: -300px;
    }

    .product-card {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-items: center;
    }

    .product-image {
        width: 40%;
        justify-content: center;
        align-items: center;
        justify-items: center;
        border-color: "#002b1b";
        border-width: 1px;
    }

    .product-info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
    }

    .product-name {
        font-size: 40px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        color: white;
        margin: 20px;
    }

    .product-price {
        font-size: 30px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        color: white;
        margin: 20px;
    }

    .product-category {
        font-size: 30px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        color: white;
        margin: 20px;
    }

    .add-to-cart {
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

    .featured-products {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6rem;
		justify-items: center;
		align-items: center;
		justify-content: center;
	}

	.featured-product {
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

	.featured-product-name {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

	.featured-product-price {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

    .featured-product-category {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

    .product-heading {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		color: white;
	}

</style>