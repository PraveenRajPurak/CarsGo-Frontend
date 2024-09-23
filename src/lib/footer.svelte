<footer class="footer-main">
	<div class="footer">
		<div class="image_in_footer">
			<img src="src/lib/images/footer_img.png" alt="Logo" style="width: auto; height: 100px;" />
		</div>

		<nav class="quick_links_in_footer">
			<p
				style="text-decoration: none; color: white; font-size: 21px;
            font-weight: 500; font-family: 'montserrat', sans-serif;"
			>
				Quick Links
			</p>

			<div class="link_item">
				<a href="/" style="text-decoration: none; color: white;">Home</a>
			</div>
			<div class="link_item">
				<a href="/main/products" style="text-decoration: none; color: white;">Products</a>
			</div>
			<div class="link_item">
				<a href="/main/about" style="text-decoration: none; color: white;">About Us</a>
			</div>
			<div class="link_item">
				<a href="/main/contact-us" style="text-decoration: none; color: white;">Contact</a>
			</div>
		</nav>

		<div class="mini-contact">
			<p
				style="text-decoration: none; color: white; font-size: 21px;
            font-weight: 500; font-family: 'montserrat', sans-serif;"
			>
				Contact Us
			</p>
			<div class="mini-contact-icon-body">
				<div class="mini-contact-icon">
					<img src="src/lib/images/mail.png" alt="Email" style="height:23.5px" />
				</div>
				<div class="mini-contact-text">
					<p class="link_item" style="left:20px;">support@carsgo.com</p>
				</div>
			</div>
			<div class="mini-contact-icon-body">
				<img src="src/lib/images/phone.png" alt="Phone" style="height:40px" />
				<p class="link_item" style="left:10px">+91-1234567890</p>
			</div>
		</div>
	</div>
	<div class="copyright">@2024 Copyright: CarsGo</div>
</footer>

<style>
	.footer-main {
		left: 0;
		bottom: 0;
		width: 100%;
		height: 200px;
		background-color: 'transparent';
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}
	.footer {
		width: 100%;
		height: 100%;
		background-color: 'transparent';
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
		padding: 0;
	}

	.image_in_footer {
		width: 30%;
		height: 100px;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 0;
	}

	.quick_links_in_footer {
		width: 30%;
		height: 100px;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	.mini-contact {
		width: 30%;
		height: 100px;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	.link_item {
		margin-bottom: 15px;
		padding: 0;
		list-style: none;
		display: inline-block;
		font-size: 16px;
		font-weight: 200;
		font-family: 'montserrat', sans-serif;
		color: white;
		text-decoration: none;
		cursor: pointer;
	}

	.copyright {
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		display: flex;
		font-size: 16px;
		font-weight: 200;
		font-style: italic;
		font-family: 'montserrat', sans-serif;
		color: white;
		text-decoration: none;
		cursor: pointer;
		margin-top: 30px;
	}

	.mini-contact-icon-body {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.mini-contact-icon {
		width: 25%;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 0;
		position: relative;
		left: 3.5px;
	}

	.mini-contact-text {
		width: 75%;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 0;
		left: 20px;
		position: relative;
		left: 13px;
	}
</style>
