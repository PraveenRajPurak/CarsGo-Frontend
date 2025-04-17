<script>
	import { goto } from '$app/navigation';
	import { GradientButton } from 'flowbite-svelte';
	import { admin_Data } from '../../../../../stores/admin.js';

	console.log('Admin data: ', $admin_Data);

	let sessionToken;

	admin_Data.subscribe((data) => {
		if (data?.SessionToken) {
			sessionToken = data.SessionToken;
		}
	});

	let products = [];

	let categories = [];

	export let data;

	console.log('Admin products: ', data.products.data);

	console.log('Admin categories: ', data.categories.data);

	products = data.products.data;

	categories = data.categories.data;

	let new_product_toggler = false;

	let name = '';
	let fuel_type = '';
	let mileage;
	let engine;
	let power_output;
	let seating_capacity;
	let tyre = '';
	let top_speed;
	let length;
	let width;
	let height;
	let weight = 0;
	let category = '';
	let company_name = '';
	let model_name = '';
	let regular_price = 0;
	let sale_price = 0;
	let sale_starts;
	let sale_ends;
	let in_stock = true;
	let sku;
	let image;

	let name_valid = false;
	let fuel_type_valid = false;
	let mileage_valid = false;
	let engine_valid = false;
	let power_output_valid = false;
	let seating_capacity_valid = false;
	let tyre_valid = false;
	let top_speed_valid = false;
	let length_valid = false;
	let width_valid = false;
	let height_valid = false;
	let weight_valid = false;
	let category_valid = false;
	let company_name_valid = false;
	let model_name_valid = false;
	let regular_price_valid = false;
	let sale_price_valid = false;
	let sale_starts_valid = false;
	let sale_ends_valid = false;
	let in_stock_valid = false;
	let sku_valid = false;
	let image_valid = false;

	function validate_name() {
		if (name.length > 0 && name.length < 50) {
			name_valid = true;
		} else {
			name_valid = false;
			alert("Name can't be empty and should be less than 50 characters!");
		}
	}

	function validate_fuel_type() {
		if (fuel_type.length > 0 && fuel_type.length < 50) {
			fuel_type_valid = true;
		} else {
			fuel_type_valid = false;
			alert("Fuel Type can't be empty and should be less than 50 characters!");
		}
	}

	function validate_seating_capacity() {
		if (seating_capacity) {
			seating_capacity = seating_capacity.toString();
			seating_capacity_valid = true;
		} else {
			seating_capacity_valid = false;
			alert("Seating Capacity can't be empty and should be a number!");
		}
	}

	function validate_tyre() {
		if (tyre.length > 0 && tyre.length < 50) {
			tyre_valid = true;
		} else {
			tyre_valid = false;
			alert("Tyre can't be empty and should be less than 50 characters!");
		}
	}

	function validate_model_name() {
		if (model_name.length > 0 && model_name.length < 50) {
			model_name_valid = true;
		} else {
			model_name_valid = false;
			alert("Model Name can't be empty and should be less than 50 characters!");
		}
	}

	function validate_regular_price() {
		if (regular_price) {

			regular_price_valid = true;
		} else {
			regular_price_valid = false;
			alert("Regular Price can't be empty and should be a number!");
		}
	}

	function validate_sale_price() {
		if (sale_price) {
			sale_price_valid = true;
		} else {
			sale_price_valid = false;
			alert("Sale Price can't be empty and should be a number!");
		}
	}

	function validate_sale_starts() {
		if (sale_starts) {
			sale_starts_valid = true;
		} else {
			sale_starts_valid = false;
			alert("Sale Starts can't be empty and should be a date!");
		}
	}

	function validate_sale_ends() {
		if (sale_ends) {
			sale_ends_valid = true;
		} else {
			sale_ends_valid = false;
			alert("Sale Ends can't be empty and should be a date!");
		}
	}

	function validate_sku() {
		if (sku.length > 0 && sku.length < 50) {
			sku = sku.toString();
			console.log("SKU's data type : ", typeof sku);
			sku_valid = true;
		} else {
			sku_valid = false;
			alert("SKU can't be empty and should be less than 50 characters!");
		}
	}

	function validate_category() {
		if (category.length > 0 && category.length < 50) {
			category_valid = true;
		} else {
			category_valid = false;
			alert("Category can't be empty and should be less than 50 characters!");
		}
	}

	function validate_company_name() {
		if (company_name.length >= 0) {
			company_name_valid = true;
		} else {
			company_name_valid = false;
			alert('Company Name should be at least 20 characters long.');
		}
	}

	function validate_mileage() {
		if (mileage) {
			mileage = mileage.toString();
			console.log("Mileage's data type : ", typeof mileage);
			mileage = mileage + ' km/l';
			mileage_valid = true;
		} else {
			mileage_valid = false;
		}
	}

	function validate_engine() {
		if (engine) {
			engine = engine.toString();
			console.log("Engine's data type : ", typeof engine);
			engine = engine + ' cc';
			engine_valid = true;
		} else {
			engine_valid = false;
			alert("Engine can't be empty and should be less than 50 characters!");
		}
	}

	function validate_power_output() {
		if (power_output) {
			power_output = power_output.toString();
			console.log("Power Output's data type : ", typeof power_output);
			power_output = power_output + ' bhp';
			power_output_valid = true;
		} else {
			power_output_valid = false;
			alert("Power Output can't be empty and should be less than 50 characters!");
		}
	}

	function validate_top_speed() {
		if (top_speed) {
			top_speed = top_speed.toString();
			console.log("Top Speed's data type : ", typeof top_speed);
			top_speed = top_speed + ' km/h';
			top_speed_valid = true;
		} else {
			top_speed_valid = false;
			alert("Top Speed can't be empty and should be less than 50 characters!");
		}
	}

	function validate_length() {
		if (length) {
			length = length.toString();
			console.log("Length's data type : ", typeof length);
			length = length + ' mm';
			length_valid = true;
		} else {
			length_valid = false;
			alert("Length can't be empty and should be less than 50 characters!");
		}
	}

	function validate_width() {
		if (width) {
			width = width.toString();
			console.log("Width's data type : ", typeof width);
			width = width + ' mm';
			width_valid = true;
		} else {
			width_valid = false;
			alert("Width can't be empty and should be less than 50 characters!");
		}
	}

	function validate_height() {
		if (height) {
			height = height.toString();
			console.log("Height's data type : ", typeof height);
			height = height + ' mm';
			height_valid = true;
		} else {
			height_valid = false;
			alert("Height can't be empty and should be less than 50 characters!");
		}
	}

	function validate_weight() {
		if (weight) {
			console.log("Weight's data type : ", typeof weight);
			weight_valid = true;
		} else {
			weight_valid = false;
			alert("Weight can't be empty and should be less than 50 characters!");
		}
	}

	function validation_Check() {
		validate_name();
		validate_tyre();
		validate_model_name();
		validate_regular_price();
		validate_sale_price();
		validate_sale_starts();
		validate_sale_ends();
		validate_sku();
		validate_category();
		validate_company_name();
		validate_mileage();
		validate_engine();
		validate_power_output();
		validate_top_speed();
		validate_length();
		validate_width();
		validate_height();
		validate_weight();
		validate_seating_capacity();
		validate_fuel_type();

		if (
			name_valid &&
			tyre_valid &&
			model_name_valid &&
			regular_price_valid &&
			sale_price_valid &&
			sale_starts_valid &&
			sale_ends_valid &&
			sku_valid &&
			category_valid &&
			company_name_valid &&
			mileage_valid &&
			engine_valid &&
			power_output_valid &&
			top_speed_valid &&
			length_valid &&
			width_valid &&
			height_valid &&
			weight_valid &&
			seating_capacity_valid &&
			fuel_type_valid
		) {
			return true;
		}
	}

	let imageFile;
	let imageUrl = '';

	async function handleImage(event) {
		imageFile = event.target.files[0];

		if (imageFile) {
			await uploadToCloudinary(imageFile);
		}
	}

	async function uploadToCloudinary(file) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'carsgo');

		const response = await fetch(
			'https://api.cloudinary.com/v1_1/backend-projectprp/image/upload',
			{
				method: 'POST',
				body: formData
			}
		);

		const data = await response.json();
		imageUrl = data.secure_url;

		console.log('Uploaded Image URL:', imageUrl);
	}

	async function add_product(event) {
		event.preventDefault();

		if (!validation_Check()) return;

		if (!imageUrl) {
			alert('Please wait until the image is uploaded!');
			return;
		}

		const product = {
			name: name,
			description: {
				fuel_type: fuel_type,
				mileage: mileage,
				engine: engine,
				power_output: power_output,
				seating_capacity: seating_capacity,
				tyre: tyre,
				top_speed: top_speed,
				dimensions: {
					length: length,
					width: width,
					height: height
				},
				weight: weight
			},
			company_name: company_name,
			model_name: model_name,
			regular_price: regular_price,
			sale_price: sale_price,
			sale_starts: sale_starts,
			sale_ends: sale_ends,
			in_stock: in_stock,
			sku: sku,
			category: category,
			images: [imageUrl]
		};

		console.log('Product: ', product);

		const formData = new FormData();

		formData.append('name', product.name);
		formData.append('description', JSON.stringify(product.description));
		formData.append('company_name', product.company_name);
		formData.append('model_name', product.model_name);
		formData.append('regular_price', product.regular_price);
		formData.append('sale_price', product.sale_price);
		formData.append('sale_starts', product.sale_starts);
		formData.append('sale_ends', product.sale_ends);
		formData.append('sku', product.sku);
		formData.append('category', product.category);
		formData.append('session_token', sessionToken);
		formData.append('in_stock', product.in_stock);


		if (imageFile) {
			formData.append('image', imageFile);
		}

		if (imageUrl) {
			formData.append('images', JSON.stringify(product.images));
		}

		const response = await fetch('?/add-product', { method: 'POST', body: formData });

		const res = await response.json();

		console.log('Response received in html : ', res);

		let parsedData = JSON.parse(res.data);

		console.log('Parsed data: ', parsedData);

		const { success, message} = parsedData[0];

		console.log('Order Success:', parsedData[success]);
		console.log('Message:', parsedData[message]);

		if (parsedData[success]) {
			alert('Product added successfully!');
		}
	}
</script>

<div class="admin-products">
	<div class="admin-products-header">
		<h1 class="admin-products-heading">Products</h1>

		<GradientButton
			style="position : relative; left: 300px;  top: 25px; height: 100%;"
			on:click={() => (new_product_toggler = !new_product_toggler)}
			shadow
			color="green">Add New Product</GradientButton
		>
	</div>

	{#if new_product_toggler}
		<div class="new-product-ctn">
			<form style="width: 100%; height: 100%;">
				<h1 class="new-product-heading">Add New Product</h1>

				<div class="new-product-containers">
					<label for="prdouct.name" class="input-label">
						Name :
						<input
							class="input"
							type="text"
							name="name"
							bind:value={name}
							placeholder="Product Name"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="fuel_type" class="input-label">
						Fuel Type:
						<select class="input" name="fuel_type" bind:value={fuel_type}>
							<option value="Petrol">Petrol</option>
							<option value="Diesel">Diesel</option>
							<option value="EV">EV</option>
							<option value="CNG">CNG</option>
						</select>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="tyre" class="input-label">
						Tyre Type:
						<select class="input" name="tyre" bind:value={tyre}>
							<option value="Tubeless Radial Tyre">Tubeless Radial Tyre</option>
							<option value="All-Terrain Tyre">All-Terrain Tyre</option>
							<option value="Performance Tyre">Performance Tyre</option>
							<option value="Winter Tyre">Winter Tyre</option>
						</select>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="mileage" class="input-label">
						Mileage:
						<input
							class="input"
							type="number"
							name="mileage"
							bind:value={mileage}
							placeholder="Mileage"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="engine" class="input-label">
						Engine:
						<input
							class="input"
							type="number"
							name="engine"
							bind:value={engine}
							placeholder="Engine"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="power_output" class="input-label">
						Power Output:
						<input
							class="input"
							type="number"
							name="power_output"
							bind:value={power_output}
							placeholder="Power Output"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="seating_capacity" class="input-label">
						Seating Capacity:
						<input
							class="input"
							type="number"
							name="seating_capacity"
							bind:value={seating_capacity}
							placeholder="Seating Capacity"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="top_speed" class="input-label">
						Top Speed:
						<input
							class="input"
							type="number"
							name="top_speed"
							bind:value={top_speed}
							placeholder="Top Speed"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="length" class="input-label">
						Length:
						<input
							class="input"
							type="number"
							name="length"
							bind:value={length}
							placeholder="Length"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="width" class="input-label">
						Width:
						<input
							class="input"
							type="number"
							name="width"
							bind:value={width}
							placeholder="Width"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="height" class="input-label">
						Height:
						<input
							class="input"
							type="number"
							name="height"
							bind:value={height}
							placeholder="Height"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="weight" class="input-label">
						Weight:
						<input
							class="input"
							type="number"
							name="weight"
							bind:value={weight}
							placeholder="Weight"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="regular_price" class="input-label">
						Regular Price:
						<input
							class="input"
							type="number"
							name="regular_price"
							bind:value={regular_price}
							placeholder="Regular Price"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="sale_price" class="input-label">
						Sale Price:
						<input
							class="input"
							type="number"
							name="sale_price"
							bind:value={sale_price}
							placeholder="Sale Price"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="category" class="input-label">
						Category:
						<select class="input" name="category" bind:value={category}>
							{#each categories as cat}
								<option value={cat.name}>{cat.name}</option>
							{/each}
						</select>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="company_name" class="input-label">
						Company Name:
						<input
							class="input"
							type="text"
							name="company_name"
							bind:value={company_name}
							placeholder="Company Name"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="model_name" class="input-label">
						Model Name:
						<input
							class="input"
							type="text"
							name="model_name"
							bind:value={model_name}
							placeholder="Model Name"
						/>
					</label>
				</div>

				<div class="new-product-containers">
					<label for="sku" class="input-label">
						SKU:
						<input class="input" type="text" name="sku" bind:value={sku} placeholder="SKU" />
					</label>
				</div>

				<div class="new-product-containers">
					<label for="sale_starts" class="input-label">
						Sale Starts:
						<input class="input" type="date" name="sale_starts" bind:value={sale_starts} />
					</label>
				</div>

				<div class="new-product-containers">
					<label for="sale_ends" class="input-label">
						Sale Ends:
						<input class="input" type="date" name="sale_ends" bind:value={sale_ends} />
					</label>
				</div>

				<div class="new-product-containers">
					<label for="in_stock" class="input-label">
						In Stock:
						<input class="input" type="checkbox" name="in_stock" bind:checked={in_stock} />
					</label>
				</div>

				<div class="new-product-containers">
					<label for="image" class="input-label">
						Upload Image:
						<input class="input" type="file" on:change={handleImage} name="image" bind:value={image} accept="image/*" />
					</label>
				</div>
			</form>

			<button
				class="submit-btn"
				on:click|preventDefault={() => {
					add_product(event);
				}}
				type="button"
			>
				Submit
			</button>
		</div>
	{/if}
	{#each products as product}
		<div class="product">
			<h2 class="product-name">{product.name}</h2>
			<p class="product-text">Category: {product.category}</p>
			<p class="product-text">Regular Price: {product.regularprice}</p>
			<p class="product-text">Sale Price: {product.saleprice}</p>
			<button
				on:click={() => {
					goto('admin_products/' + product._id);
				}}
				type="button"
				class="modify-btn text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
				>Modify this product</button
			>
		</div>
	{/each}
</div>

<style>
	.admin-products {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.admin-products-header {
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.admin-products-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
		margin-top: 20px;
		position: relative;
		left: 70px;
	}

	.product {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 300%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #002b1b;
	}

	.product-name {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.product-text {
		font-size: 16px;
		margin-bottom: 5px;
	}

	.modify-btn {
		background-color: #4caf50;
		color: white;
		border: none;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin-top: 10px;
		cursor: pointer;
	}

	.product-name {
		color: white;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.product-text {
		color: white;
		font-size: 16px;
		margin-bottom: 5px;
	}

	.new-product-ctn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 30px;
	}

	.new-product-containers {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		justify-items: center;
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

	.new-product-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
		margin-top: 20px;
		position: relative;
		left: 70px;
	}

	.input {
		height: 30px;
		width: 220px;
		font-size: 15px;
		font-weight: 500;
		justify-content: end;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		color: black;
		position: absolute;
		left: 130px;
	}

	.submit-btn {
		background-color: #002b1b;
		width: 100%;
		color: white;
		font-weight: 500;
		font-family: 'montserrat', sans-serif;
		border-radius: 5px;
		padding: 10px;
	}
</style>
