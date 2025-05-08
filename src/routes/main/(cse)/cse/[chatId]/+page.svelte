<script>
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { cse_Data } from '../../../../../stores/cse.js';
	import { fly } from 'svelte/transition';

	// Get chatId from URL parameters
	const { chatId } = $page.params;

	console.log('CSE data: ', $cse_Data);

	let sessionToken;

	cse_Data.subscribe((data) => {
		if (data?.SessionToken) {
			sessionToken = data.SessionToken;
		}
	});

	let messages = [];
	let chatStatus = '';
	let newMessage = '';
	let messageContainer;
	let loading = false;
	let customerId = '';
	let orderId = '';
	let pollingInterval;

    let shouldAutoScroll = true;
    let previousScrollTop = 0;
    let previousScrollHeight = 0;

    // AI Response Generation
    let showAssistant = true; // Toggle for showing/hiding assistant panel
    let aiResponse = '';
    let formattedAiResponse = '';
    let isGeneratingResponse = false;
    let generationError = null;
    
    // AI Response parameters
    let tone = 'Professional';
    let length = 'Moderate';
    let responseNeeds = ['Information', 'Assurance'];
    let additionalInfo = '';
    
    // Tone options
    const toneOptions = [
        'Professional', 
        'Friendly', 
        'Formal', 
        'Empathetic', 
        'Technical'
    ];
    
    // Length options
    const lengthOptions = [
        'Short', 
        'Moderate', 
        'Long', 
        'Detailed'
    ];
    
    // Response needs options with checkboxes
    const responseNeedsOptions = [
        'Information',
        'Assurance',
        'Apology',
        'Clarification',
        'Solution',
        'Replacement'
    ];
    
    // Get customer messages only
    $: customerMessages = messages
        .filter(message => !isCSEMessage(message))
        .map(message => message.text);

	$: if (messageContainer && shouldAutoScroll && messages.length > 0) {
        const scrollHeight = messageContainer.scrollHeight;
        // Only scroll if we have new content
        if (scrollHeight > previousScrollHeight) {
            setTimeout(() => {
                messageContainer.scrollTop = scrollHeight;
                previousScrollHeight = scrollHeight;
            }, 50);
        }
    }

    const handleScroll = () => {
        if (!messageContainer) return;
        
        const { scrollTop, scrollHeight, clientHeight } = messageContainer;
        
        // Check if user is scrolled to bottom (or very close)
        // We use a small threshold (20px) to account for minor differences
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
        
        // If user scrolls up, disable auto-scroll
        // If user scrolls to bottom, enable auto-scroll
        shouldAutoScroll = isNearBottom;
        
        // Save current scroll position
        previousScrollTop = scrollTop;
    };
	// Function to format timestamp to a readable format
	const formatTime = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	const isCSEMessage = (message) => {
		return message.sender_id === $cse_Data.ID;
	};

	// Function to fetch chat data
	const fetchChatData = async () => {
		if (loading || !sessionToken) return;

		loading = true;
		try {
			const response = await fetch(`http://localhost:10010/cse/chat/${chatId}`, {
				headers: {
					CSE_Authorization: `Bearer ${sessionToken}`
				}
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch chat: ${response.status} ${response.statusText}`);
			}

			const chatData = await response.json();

			console.log('chat fetched : ', chatData);
			messages = chatData.messages || [];
			chatStatus = chatData.status;
			customerId = chatData.customer_id;
			orderId = chatData.order_id;
            scrollToBottom();
		} catch (err) {
			throw new Error('Error fetching chat!');
		} finally {
			loading = false;
		}
	};

	//Function to send a message
	const sendMessage = async () => {
	    if (!newMessage.trim() || !sessionToken) return;

	    try {
	        const messageData = {
	            chat_id: chatId,
	            text: newMessage.trim(),
	            receiver_id: customerId,
	            sender_id: $cse_Data.ID
	        };

	        const response = await fetch(`http://localhost:10010/cse/send-message`, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	                'CSE_Authorization': `Bearer ${sessionToken}`
	            },
	            body: JSON.stringify(messageData)
	        });

	        if (!response.ok) {
	            throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
	        }

            alert("Message :",newMessage)

	        // Clear the input field
	        newMessage = '';

	        // Fetch updated messages immediately
	        fetchChatData();
	    } catch (err) {
	        console.error('Error sending message:', err);
	        sendError = err.message;
	    }
	};

    const generateAIResponse = async () => {
        if (customerMessages.length === 0 || isGeneratingResponse) return;
        
        isGeneratingResponse = true;
        generationError = null;
        
        try {
            const requestData = {
                customerMessages,
                tone,
                length,
                responseNeeds,
                additional_info: additionalInfo
            };
            
            const response = await fetch('http://localhost:5010/api/generate-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Failed to generate response');
            }
            
            const data = await response.json();
            aiResponse = data.rawResponse;
            formattedAiResponse = data.formattedResponse;
        } catch (err) {
            console.error('Error generating AI response:', err);
            generationError = err.message;
        } finally {
            isGeneratingResponse = false;
        }
    };
    
    // Function to use AI response as message
    const useAIResponse = () => {
        if (!aiResponse) return;
        
        newMessage = aiResponse;
        // Scroll to input field
        setTimeout(() => {
            const inputField = document.querySelector('textarea');
            if (inputField) inputField.focus();
        }, 100);
    };


    // Handle Enter key press in the textarea
    const handleKeydown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    // Toggle response needs
    const toggleResponseNeed = (need) => {
        if (responseNeeds.includes(need)) {
            responseNeeds = responseNeeds.filter(n => n !== need);
        } else {
            responseNeeds = [...responseNeeds, need];
        }
    };
    
    // Manual scroll to bottom function
    const scrollToBottom = () => {
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
            shouldAutoScroll = true;
            previousScrollHeight = messageContainer.scrollHeight;
            previousScrollTop = messageContainer.scrollTop;
        }
    };
	// Set up polling on component mount
	onMount(() => {
		// Initial fetch
		fetchChatData();

		// Set up interval for polling
		pollingInterval = setInterval(fetchChatData, 5000); // 5 seconds

        if (messageContainer) {
            previousScrollHeight = messageContainer.scrollHeight;
            messageContainer.scrollTop = previousScrollHeight;
        }
	});

	// Clean up on component destroy
	onDestroy(() => {
		if (pollingInterval) {
			clearInterval(pollingInterval);
		}
	});
</script>

<div class="chat-container">
	<header class="chat-header">
		<div class="chat-info">
			<h1>Chat {chatId}</h1>
			<div class="chat-status {chatStatus}">
				Status: {chatStatus}
			</div>
			{#if orderId}
				<div class="order-info">
					Order ID: {orderId}
				</div>
			{/if}
		</div>
        <div class="actions">
            <button class="scroll-button" on:click={scrollToBottom}>
                Scroll to Bottom
            </button>
        </div>
	</header>

	{#if loading}
		<div class="error-container">
			<p class="error-message">Loading...</p>
			<button on:click={fetchChatData}>Retry</button>
		</div>
	{:else}
		<div class="messages-container" bind:this={messageContainer} on:scroll={handleScroll}>
			{#if messages.length === 0}
				<div class="no-messages">
					<p>No messages yet. Start the conversation!</p>
				</div>
			{:else}
				{#each messages as message, i (message._id)}
					<div
						class="message {isCSEMessage(message) ? 'outgoing' : 'incoming'}"
						in:fly={{ y: 20, duration: 300, delay: Math.min(i * 50, 500) }}
					>
						<div class="message-bubble">
							<p class="message-text">{message.text}</p>
							<span class="message-time">{formatTime(message.timestamp)}</span>
						</div>
					</div>
				{/each}
			{/if}

			{#if loading}
				<div class="loading-indicator">
					<div class="loading-dots">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			{/if}
		</div>

		<div class="input-container">
			{#if chatStatus === 'closed'}
				<div class="chat-closed-notice">This chat is closed. You cannot send messages.</div>
			{:else}
				<textarea
					bind:value={newMessage}
					on:keydown={handleKeydown}
					placeholder="Type your message here..."
					disabled={chatStatus === 'closed'}
					rows="3"
				></textarea>

				<button
					class="send-button"
					on:click={sendMessage}
					disabled={!newMessage.trim() || chatStatus === 'closed'}
				>
					Send
				</button>
			{/if}

		</div>
	{/if}

    {#if !shouldAutoScroll && messages.length > 0}
        <button 
            class="scroll-indicator" 
            on:click={scrollToBottom}
            transition:fly={{ y: 20, duration: 200 }}
        >
            ↓ New messages
        </button>
    {/if}

    {#if showAssistant}
        <div class="assistant-panel" transition:slide={{ duration: 300, axis: 'x' }}>
            <h2>AI Response Assistant</h2>
            
            <div class="assistant-form">
                <!-- Tone selection -->
                <div class="form-group">
                    <label for="tone">Response Tone:</label>
                    <select id="tone" bind:value={tone}>
                        {#each toneOptions as option}
                            <option value={option}>{option}</option>
                        {/each}
                    </select>
                </div>
                
                <!-- Length selection -->
                <div class="form-group">
                    <label for="length">Response Length:</label>
                    <select id="length" bind:value={length}>
                        {#each lengthOptions as option}
                            <option value={option}>{option}</option>
                        {/each}
                    </select>
                </div>
                
                <!-- Response needs checkboxes -->
                <div class="form-group">
                    <label>Response should include:</label>
                    <div class="checkbox-group">
                        {#each responseNeedsOptions as option}
                            <label class="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    checked={responseNeeds.includes(option)} 
                                    on:change={() => toggleResponseNeed(option)}
                                />
                                {option}
                            </label>
                        {/each}
                    </div>
                </div>
                
                <!-- Additional info textarea -->
                <div class="form-group">
                    <label for="additional-info">Additional Context (optional):</label>
                    <textarea 
                        id="additional-info" 
                        bind:value={additionalInfo}
                        rows="3"
                        placeholder="Add any specific information to include in the response..."
                    ></textarea>
                </div>
                
                <!-- Generate button -->
                <button 
                    class="generate-button" 
                    on:click={generateAIResponse}
                    disabled={isGeneratingResponse || customerMessages.length === 0}
                >
                    {isGeneratingResponse ? 'Generating...' : 'Generate Response'}
                </button>
                
                {#if generationError}
                    <p class="error-message">{generationError}</p>
                {/if}
            </div>
            
            <!-- AI Response display -->
            <div class="ai-response-container">
                <h3>Suggested Response:</h3>
                {#if isGeneratingResponse}
                    <div class="generating-indicator">
                        <div class="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p>Generating response...</p>
                    </div>
                {:else if formattedAiResponse}
                    <div class="ai-response">
                        <div class="response-text">
                            {@html formattedAiResponse}
                        </div>
                        <div class="response-actions">
                            <button class="use-response" on:click={useAIResponse}>
                                Use This Response
                            </button>
                        </div>
                    </div>
                {:else}
                    <p class="no-response">
                        Click "Generate Response" to get an AI-suggested reply based on the customer's messages.
                    </p>
                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
	.main-container {
        display: flex;
        height: calc(100vh - 100px);
        width: 100%;
    }
    
    .chat-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        max-width: 65%;
        margin: 0 auto;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background-color: white;
        overflow: hidden;
    }
    
    .chat-header {
        padding: 15px 20px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .chat-info h1 {
        margin: 0;
        font-size: 1.2rem;
        color: #333;
    }
    
    .chat-status {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        margin-top: 5px;
    }
    
    .chat-status.active {
        background-color: #e7f7ed;
        color: #28a745;
    }
    
    .chat-status.pending {
        background-color: #fff8e1;
        color: #ffc107;
    }
    
    .chat-status.waiting {
        background-color: #e8eaf6;
        color: #3f51b5;
    }
    
    .chat-status.closed {
        background-color: #f8d7da;
        color: #dc3545;
    }
    
    .order-info {
        font-size: 0.8rem;
        color: #666;
        margin-top: 5px;
    }
    
    .actions {
        display: flex;
        gap: 10px;
    }
    
    .actions button {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 0.8rem;
        cursor: pointer;
    }
    
    .toggle-assistant {
        background-color: #e8eaf6 !important;
        color: #3f51b5;
    }
    
    .error-container {
        padding: 20px;
        text-align: center;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .error-message {
        color: #dc3545;
        margin-bottom: 15px;
    }
    
    .messages-container {
        flex-grow: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #f9f9f9;
    }
    
    .no-messages {
        text-align: center;
        color: #888;
        margin: auto 0;
    }
    
    .message {
        display: flex;
        margin-bottom: 10px;
    }
    
    .message.incoming {
        justify-content: flex-start;
    }
    
    .message.outgoing {
        justify-content: flex-end;
    }
    
    .message-bubble {
        max-width: 70%;
        padding: 10px 15px;
        border-radius: 18px;
        position: relative;
    }
    
    .incoming .message-bubble {
        background-color: white;
        border: 1px solid #e1e1e1;
        border-bottom-left-radius: 4px;
    }
    
    .outgoing .message-bubble {
        background-color: #0084ff;
        color: white;
        border-bottom-right-radius: 4px;
    }
    
    .message-text {
        margin: 0;
        word-wrap: break-word;
    }
    
    .message-time {
        display: block;
        font-size: 0.7rem;
        margin-top: 5px;
        text-align: right;
        opacity: 0.7;
    }
    
    .input-container {
        padding: 15px;
        background-color: white;
        border-top: 1px solid #e5e5e5;
        display: flex;
        flex-wrap: wrap;
    }
    
    textarea {
        flex-grow: 1;
        resize: none;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
        font-family: inherit;
        margin-right: 10px;
    }
    
    .send-button {
        background-color: #0084ff;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 0 20px;
        cursor: pointer;
        height: 40px;
        align-self: flex-end;
    }
    
    .send-button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
    
    .send-error {
        width: 100%;
        color: #dc3545;
        margin-top: 10px;
        font-size: 0.9rem;
    }
    
    .chat-closed-notice {
        width: 100%;
        text-align: center;
        color: #dc3545;
        background-color: #f8d7da;
        padding: 10px;
        border-radius: 4px;
    }
    
    .loading-indicator {
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
    
    .loading-dots {
        display: flex;
        align-items: center;
    }
    
    .loading-dots span {
        width: 8px;
        height: 8px;
        margin: 0 3px;
        background-color: #888;
        border-radius: 50%;
        display: inline-block;
        animation: dot-flashing 1s infinite alternate;
    }
    
    .loading-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .loading-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes dot-flashing {
        0% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
    
    .scroll-indicator {
        position: absolute;
        bottom: 80px;
        right: 20px;
        background-color: #0084ff;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 8px 15px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        z-index: 10;
    }
    
    /* AI Assistant Panel Styles */
    .assistant-panel {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        border-left: 1px solid #ddd;
        padding: 20px;
        overflow-y: auto;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
    }
    
    .assistant-panel h2 {
        margin-top: 0;
        color: #333;
        font-size: 1.3rem;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }
    
    .assistant-form {
        margin-bottom: 20px;
        
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #555;
    }
    
    .form-group select, 
    .form-group textarea {
        width: 100%;
        padding: 8px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: normal;
    }
    
    .generate-button {
        width: 100%;
        background-color: #3f51b5;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        font-weight: 500;
    }
    
    .generate-button:disabled {
        background-color: #c5cae9;
        cursor: not-allowed;
    }
    
    .ai-response-container {
        background-color: white;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .ai-response-container h3 {
        margin-top: 0;
        font-size: 1.1rem;
        margin-bottom: 15px;
        color: #333;
    }
    
    .generating-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }
    
    .ai-response {
        border-radius: 8px;
        overflow: hidden;
    }
    
    .response-text {
        padding: 15px;
        background-color: #f9f9f9;
        border: 1px solid #eee;
        border-radius: 8px;
        margin-bottom: 10px;
        font-size: 0.95rem;
        line-height: 1.5;
    }
    
    .response-actions {
        display: flex;
        justify-content: flex-end;
    }
    
    .use-response {
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 15px;
        cursor: pointer;
    }
    
    .no-response {
        color: #666;
        text-align: center;
        padding: 20px 0;
    }
</style>
