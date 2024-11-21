<script>
	import { goto } from '$app/navigation';
	import { isLoggedIn, register_login_popup } from '../../stores/user.js';

	import { onMount } from 'svelte';

	let isMobileView = false; 

	const updateView = () => {
		isMobileView = window.innerWidth <= 1000;
	};

	onMount(() => {
		updateView(); 
		window.addEventListener('resize', updateView);
		return () => window.removeEventListener('resize', updateView);
	});

	let showMenu = false;
</script>

<header class="header">
	<div class="image_in_header">
		<img
			on:click={() => {
				goto('/');
			}}
			src="/logo.png"
			alt="Logo"
			class="logo_in_header"
		/>
	</div>

	<div class="menu_in_header">
		{#if !isMobileView}
			<nav class="full_menu" style:display={!showMenu ? 'flex' : 'none'}>
				<div class="menu_item">
					<a href="/" style="text-decoration: none; color: white;">Home</a>
				</div>
				<div class="menu_item">
					<a href="/main/products" style="text-decoration: none; color: white;">Products</a>
				</div>
				<div class="menu_item">
					<a href="/main/about" style="text-decoration: none; color: white;">About Us</a>
				</div>
				<div class="menu_item">
					<a href="/main/contact-us" style="text-decoration: none; color: white;">Contact</a>
				</div>
			</nav>
		{/if}

		<div class="hamburger" on:click={() => (showMenu = !showMenu)}>☰</div>

		<nav class="hamburger_menu" style:display={showMenu ? 'block' : 'none'}>
			<div class="menu_item">
				<a href="/" style="text-decoration: none; color: white;">Home</a>
			</div>
			<div class="menu_item">
				<a href="/main/products" style="text-decoration: none; color: white;">Products</a>
			</div>
			<div class="menu_item">
				<a href="/main/about" style="text-decoration: none; color: white;">About Us</a>
			</div>
			<div class="menu_item">
				<a href="/main/contact-us" style="text-decoration: none; color: white;">Contact</a>
			</div>
		</nav>
	</div>

	<div class="icons_in_header">
		<div
			on:click={() => {
				goto('/main/cart');
			}}
			class="icon-text-body"
			style="margin-right: 35px;"
		>
			<img src="/cart.png" alt="Cart" style="height:40px" class="cart-icon" />
			<p class="icon-text" style="left:10px">Your Cart</p>
		</div>
		<div
			on:click={() => {
				$isLoggedIn ? goto('/main/dashboard') : ($register_login_popup = true);
			}}
			class="icon-text-body"
		>
			<img src="/profile.png" alt="Cart" style="height:37px" class="cart-icon" />
			<p class="icon-text" style="left:10px">{$isLoggedIn ? ' Your Profile' : 'Register/Login'}</p>
		</div>
	</div>
</header>

<style>
	.full_menu {
		display: flex;
	}

	.hamburger {
		display: none;
		font-size: 24px;
		cursor: pointer;
		color: white;
	}

	.hamburger_menu {
		display: none;
		background-color: #002b1b;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		padding: 10px;
		border-radius: 4px;
		position: absolute;
		top: 50px;
		left: 10px;
		z-index: 1;
	}

	.hamburger_menu .menu_item {
		display: block;
		margin: 10px 0;
	}

	@media (max-width: 1000px) {
		.full_menu {
			display: none;
		}
		.hamburger {
			display: block;
		}
	}

	.header {
		width: 100%;
		height: 90px;
		background-color: 'transparent';
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}

	.image_in_header {
		order: 1;
		width: 25%;
		height: 50px;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 0;
	}

	.logo_in_header {
		width: auto;
		height: 50px;
		cursor: pointer;
	}

	.menu_in_header {
		order: 2;
		width: 45%;
		height: 50px;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 0;
	}

   

	.icons_in_header {
		order: 3;
		width: 30%;
		height: 50px;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 0;
	}

    @media (max-width: 600px) {
        .menu_in_header{
            width: 15%;
        }
        .image_in_header{
            width: 55%;
        }
        .icons_in_header{
            width: 30%;
        }
    }

	.menu_item {
		margin: 0 40px;
		padding: 0;
		list-style: none;
		display: inline-block;
		font-size: 18px;
		font-weight: 300;
		font-family: 'montserrat', sans-serif;
		color: white;
		text-decoration: none;
		cursor: pointer;
	}

	@media (min-width: 1150px) and (max-width: 1300px) {
		.menu_item {
			margin: 0 30px;
		}
	}
	@media (min-width: 1000px) and (max-width: 1150px) {
		.menu_item {
			margin: 0 20px;
		}
	}
	@media (max-width: 1000px) {
		.menu_item {
			margin: 0 10px;
		}
	}

	.icon-text-body {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	.icon-text {
		margin-left: 10px;
		list-style: none;
		font-size: 18px;
		font-weight: 200;
		opacity: 0.7;
		font-family: 'montserrat', sans-serif;
		color: white;
		text-decoration: none;
		cursor: pointer;
	}

	@media only screen and (max-width: 1130px) {
		.icon-text {
			display: none;
		}
	}

    @media (max-width: 484px) {
        .image_in_header {
            order: 2;
        }
        .menu_in_header {
            order: 1;
        }
        .icons_in_header {
            order: 3;
        }
    }
</style>
