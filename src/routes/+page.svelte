<script>
	import Footer from '$lib/Footer/footer.svelte';
	import Header from '$lib/Header/header.svelte';
</script>

<div class="home-page">
	<Header />
	<div class="main-upper-body">
		<div class="left-upper-body">
			<h2 class="left-upper-body-heading" style="position: relative; left:40px;">
				Find Your Perfect Ride,
			</h2>
			<h2 class="left-upper-body-heading" style="margin-top: -7px; position: relative; left:40px">
				Every Time
			</h2>
			<p class="left-upper-body-text" style="margin-top: -10px; position: relative; left:40px">
				Explore our wide range of premium vehicles, tailored to meet your needs.
			</p>
			<button class="pushable" style = "margin-left: 70px; margin-top: 10px">
				<span class="front"> Push me </span>
			</button>
		</div>
		<div class="right-upper-body">
			<img src="/car6.png" alt="Car" style="height: 530px;" />
		</div>
	</div>

	<div class="brands">
		<h2 class="left-upper-body-heading" style="margin-bottom:15px;">Brands We Offer</h2>
		<img src="/brands.png" alt="Brand" style="height: 400px;" />
	</div>
	<Footer />
</div>

<style>
	.home-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(150deg, #002b1b, black, black);
		padding: 0;
		margin: 0;
	}

	.main-upper-body {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		padding: 0;
		margin-bottom: 40px;
	}

	.left-upper-body {
		width: 34%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.left-upper-body-heading {
		color: white;
		font-size: 40px;
		font-weight: 400;
		font-family: 'montserrat', sans-serif;
		text-align: center;
	}

	.left-upper-body-text {
		color: white;
		font-size: 20px;
		font-weight: 200;
		font-family: 'montserrat', sans-serif;
		text-align: center;
	}

	.pushable {
		background: hsl(146, 99%, 31%);
		border-radius: 12px;
		border: none;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
	}
	.front {
		display: block;
		padding: 12px 42px;
        border: "1px solid ";
		border-radius: 12px;
		font-size: 1.25rem;
		background: hsl(156, 100%, 48%);
		color: white;
		transform: translateY(-6px);
	}

	.pushable:active .front {
		transform: translateY(-2px);
	}

	.right-upper-body {
		width: 66%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.brands {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		margin-bottom: 80px;
	}
</style>
