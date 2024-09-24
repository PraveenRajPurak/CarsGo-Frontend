<header class ="header">
    <div class="image_in_header">
        <img src="/logo.png" alt="Logo" style = "width: auto; height: 50px;">
    </div>

    <nav class="menu_in_header">

        <div class="menu_item">
            <a href="/" style = "text-decoration: none; color: white;">Home</a>
        </div>
        <div class="menu_item">
            <a href="/main/products" style = "text-decoration: none; color: white;">Products</a>
        </div>
        <div class="menu_item">
            <a href="/main/about" style = "text-decoration: none; color: white;">About Us</a>
        </div>
        <div class="menu_item">
            <a href="/main/contact-us" style = "text-decoration: none; color: white;">Contact</a>
        </div>
    </nav>
    
    <div class="icons_in_header">
        <div class="icon-text-body" style="margin-right: 35px;">
            <img src="/cart.png" alt="Cart" style="height:40px" />
            <p class="icon-text" style="left:10px">Your Cart</p>
        </div>
        <div class="icon-text-body">
            <img src="/profile.png" alt="Cart" style="height:37px" />
            <p class="icon-text" style="left:10px">Your Profile</p>
        </div>
    </div>
    
</header>
<style>
    .header {
        width: 100%;
        height: 90px;
        background-color: "transparent";
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-items: center;
    }

    .image_in_header {
        width: 25%;
        height: 50px;
        justify-content: center;
        align-items: center;
        display: flex;
        padding: 0
    }

    .menu_in_header {
        width: 45%;
        height: 50px;
        justify-content: center;
        align-items: center;
        display: flex;
        padding :0;
    }

    .icons_in_header {
        width: 30%;
        height: 50px;
        justify-content: center;
        align-items: center;
        display: flex;
        padding :0;
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

    .icon-text-body{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .icon-text{
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
</style>