<script>
	import { goto } from '$app/navigation';
	import { GradientButton } from 'flowbite-svelte';
	import { onMount, onDestroy } from 'svelte';
	import {
		isCSELoggedIn,
		cse_Data,
		updateCSEData,
		updateCSELoggedIn,
		cse_Extended_Data,
		updateCSEExtendedData
	} from '../../../../stores/cse.js';

	console.log('CSE data: ', $cse_Data);
	console.log('CSE Extended Data : ', $cse_Extended_Data);

	let sessionToken;

	cse_Data.subscribe((data) => {
		if (data?.SessionToken) {
			sessionToken = data.SessionToken;
		}
	});

	let active_chats = [];
	let pending_chats = [];
	let closed_chats = [];
	let polling_interval;

	export let data;

	console.log('All CSE Data: ', data.cse.data);

	let all_cse_data = data.cse.data;

	console.log('CSE ID we are matching: ', $cse_Data.CSE_ID);

	let our_cse_data = {};
	
	// Function to update data
	const updateData = () => {
		if ($cse_Data.CSE_ID) {
			console.log('CSE ID is not null');
			our_cse_data = all_cse_data.find((item) => {
				console.log('Item: ', item);
				return item._id === $cse_Data.ID;
			});
		}

		console.log('Our CSE Data: ', our_cse_data);

		if (our_cse_data) {
			active_chats = our_cse_data.active_chats || [];
			pending_chats = our_cse_data.pending_chats || [];
			closed_chats = our_cse_data.closed_chats || [];
		}

		console.log('Active Chats: ', active_chats);
		console.log('Pending Chats: ', pending_chats);
		console.log('Closed Chats: ', closed_chats);
	};

	// Initial data setup
	updateData();

	// Function to fetch fresh data
	const fetchCSEData = async () => {
		try {
			const response = await fetch('http://localhost:10010/get-cseData', {
				headers: {
					'CSE_Authorization': sessionToken ? `Bearer ${sessionToken}` : ''
				}
			});
			
			if (!response.ok) {
				throw new Error('Failed to fetch CSE data');
			}
			
			const newData = await response.json();
			all_cse_data = newData.data;
			updateData();
		} catch (error) {
			console.error('Error fetching CSE data:', error);
		}
	};

	const movetoActive = async (pending_chat) => {

		console.log("Pending Chat's ID :",pending_chat )

		try{
			const dataPrep = {
	            chat_id: pending_chat,
				cse_id: cse_Data.ID
	        };

	        const response = await fetch(`http://localhost:10010/cse//move-chat-to-active`, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	                'CSE_Authorization': `Bearer ${sessionToken}`
	            },
	            body: JSON.stringify(dataPrep)
	        });

	        if (!response.ok) {
	            throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
	        }

		}
		catch(err){
			throw new Error("Error in moving chat to active list. ")
		}
	}

	// Set up polling on component mount
	onMount(() => {
		// Initial fetch
		fetchCSEData();
		
		// Set up interval for polling
		polling_interval = setInterval(fetchCSEData, 5000); // 5 seconds
	});

	// Clean up on component destroy
	onDestroy(() => {
		if (polling_interval) {
			clearInterval(polling_interval);
		}
	});
</script>


<div class="cse-dashboard">
	<div class="cse-header">
		<h1 class="cse-heading">CSE Dashboard</h1>
	</div>
	<div class="cse-info">
		<h2 class="cse-heading">Your Information</h2>
		<h2 class="cse-details">Name: {$cse_Data.Name}</h2>
		<h2 class="cse-details">Email: {$cse_Data.Email}</h2>
		<h2 class="cse-details">Phone Number: {$cse_Data.PhoneNumber}</h2>
		<h2 class="cse-details">CSE ID: {$cse_Data.CSE_ID}</h2>
	</div>

    <div class="chats">
        <h2 class="cse-heading">Active Chats</h2>
        {#if active_chats.length > 0}
            {#each active_chats as active_chat}
                <div class="active-chat">
                    <h2 class="chat-id">{active_chat}</h2>
                    <button
                        on:click={() => {
                            goto('cse/' + active_chat);
                        }}
                        type="button"
                        class="modify-btn text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >Open Chat</button
                    >
                </div>
            {/each}
        {:else}
            <div class="cse-info">
                <h2>No Active Chats</h2>
            </div>
        {/if}
    </div>

    <div class="chats">
        <h2 class="cse-heading">Pending Chats</h2>
	{#if pending_chats.length > 0}
		{#each pending_chats as pending_chat}
			<div class="pending-chat">
				<h2 class="chat-id">{pending_chat}</h2>
				<button
					on:click={() => {
						movetoActive(pending_chat)
					}}
					type="button"
					class="modify-btn text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>Move to Active Chats</button
				>
			</div>
		{/each}
	{:else}
		<div class="cse-info">
			<h2>No Pending Chats</h2>
		</div>
	{/if}
    </div>
    <div class="chats">
        <h2 class="cse-heading">Closed Chats</h2>
	{#if closed_chats.length > 0}
		{#each closed_chats as closed_chat}
			<div class="closed-chat">
				<h2 class="chat-id">{closed_chat}</h2>
				<button
					on:click={() => {
						goto('cse/' + closed_chat);
					}}
					type="button"
					class="modify-btn text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>Open Chat</button
				>
			</div>
		{/each}
	{:else}
		<div class="cse-info">
			<h2>No Closed Chats</h2>
		</div>
	{/if}
    </div>
    
    
</div>

<style>
	.cse-dashboard {
		display: flex;
        flex: 1;
		flex-direction: column;
		align-items: center;
        justify-content: center;

        background-color: #002b1b;
	}

    .cse-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        width: 100%;
        height: 15%;
        background-color: #002b1b;
    }
	.cse-heading {
		color: whitesmoke;
		font-size: 35px;
		font-weight: 700;
		font-family: 'montserrat', sans-serif;
		margin-bottom: 30px;
		margin-top: 20px;
	}

	.cse-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 40%;
		padding: 30px;
		border-radius: 10px;
        border-width: 0.1rem;
        border-color: #002115;
		margin-bottom: 50px;
		background-color: #002b1b;
        box-shadow: #002b1b;
		color: white;
	}

    .chats{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-items: center;
        width: 70%;
        border-width: 0.01rem;
        border-color: whitesmoke;
        border-style: solid;
        border-radius: 10px;
        margin-bottom: 15px;
        background-color: #002b1b;
    }

	.cse-details {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
		color: white;
	}

	.active-chat {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 80%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #A0C878;
	}
	.pending-chat {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 80%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #ffef5c;
	}
	.closed-chat {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 80%;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 15px;
		background-color: #CA7373;
	}

	.chat-id {
		font-size: 20px;
		font-weight: bold;
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
</style>
