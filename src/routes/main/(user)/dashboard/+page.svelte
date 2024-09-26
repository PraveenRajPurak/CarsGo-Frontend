<script>
	let isLoggedin = false;
	let registration_toggler = false;

	let user = {
		name: 'User',
		email: '2Hq7u@example.com'
	};
</script>

<div class="dashboard">
	{#if isLoggedin}
		<div class="dashboard-logged-in-user">
			<h2 class="dashboard-logged-in-user-text">Welcome {user.name}!</h2>
			<h2 class="dashboard-logged-in-user-text">
				If not {user.name},
				<p style="cursor: pointer; font-weight: 400px; color: #0aac71;"
					on:click={() => {
						registration_toggler = true;
						isLoggedin = false;
					}}
				>
					Logout
				</p>
			</h2>
		</div>
	{:else if !isLoggedin}
		<div class="btn-containers">
			<button on:click={() => {registration_toggler = true}} class="dashboard-register-btn">Register</button>
			<button on:click={() => {registration_toggler = false}} class="dashboard-register-btn">Login</button>
		</div>
		{#if registration_toggler}
        <section style = "background-color: transparent;">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full rounded-lg shadow  sm:max-w-md " style="background-color: transparent; border-color: #E5E7EB; position: relative; left: -120px;">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" style="color: aliceblue;">
                            Create an account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style="color: aliceblue;">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style="color: aliceblue;">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style="color: aliceblue;">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                            </div>
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                        </form>
                    </div>
                </div>
            </div>
          </section>
        {:else}
        <section style = "background-color: transparent;">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full rounded-lg shadow  sm:max-w-md " style="background-color: transparent; border-color: #E5E7EB; position: relative; left: -120px; top: -35px;">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" style="color: aliceblue;">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style="color: aliceblue;">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style="color: aliceblue;">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                            </div>
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
          </section>
        {/if}
	{/if}
</div>

<style>

    .dashboard {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .dashboard-logged-in-user {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        position: relative;
        top: -150px;
        left: -200px;
    }

    .dashboard-logged-in-user-text {
        margin-bottom: 20px;
        font-size: 30px;
        font-weight: 700;
        font-family: 'montserrat', sans-serif;
        color: white;
    }

    .btn-containers {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-items: center;
        position: relative;
        position: relative;
        top: 100px;
        left: -100px;
    }

    .dashboard-register-btn {
        width: 120px;
        height: 40px;
        background-color: 'transparent';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        border-width: 1.5px;
        border-color: #0aac71;
        border-radius: 10%;
        border-style: solid;
        font-size: 12px;
        font-weight: 500;
        font-family: 'montserrat', sans-serif;
        color: white;
        margin-right: 30px;
    }
</style>