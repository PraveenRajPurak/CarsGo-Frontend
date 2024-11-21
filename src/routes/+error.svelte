<script>
	export let error;
	export let status;
</script>

<div class="home-page">
	<div class="main-upper-body">
		{status} - Page Not Found

		<h1 class="error-heading">{status} - {status === 404 ? 'Page Not Found' : 'Something went wrong'}</h1>
        <br/>
		<p class="error-text">{error?.message || 'The page you are looking for does not exist.'}</p>

		<a class="go-back-url" href="/">Go back to Home</a>
	</div>
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		padding: 0;
		margin-bottom: 40px;
	}

    .error-heading {
        font-size: 30px;
        font-weight: 700;
        font-family: 'montserrat', sans-serif;
        color: white;
    }

    .error-text {
        font-size: 30px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        color: white;
    }

    .go-back-url {
        background-color: #002b1b;
        color: white;
        font-size: 20px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        border-radius: 5px;
        padding: 10px;
        margin: 20px;
    }
</style>
