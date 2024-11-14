export const actions = {

    'login': async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        console.log("Data provided for login: ", email, " , ", password)

        try {
            const res = await fetch("http://localhost:10010/sign-in", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            const resData = await res.json();
            console.log("Response received: ", resData);

            if (resData.message === "Successfully Logged in") {

                return {
                    success: true,
                    message: resData.message,
                    email: resData.email,
                    id: resData.id,
                    name: resData.name,
                    session_token: resData.session_token,
                };
            } else {
                return { error: "Failed to login! Try again" };
            }
        } catch (err) {
            console.error("Error during login:", err);
            return { error: "Server error, please try again later." };
        }
    },

    add_address: async ({ request }) => {

        // const data = await request.address;

        const data = await request.formData();

        let address_field = data.get('address_field');
        address_field = address_field.toString();
        const city = data.get('city');
        const state = data.get('state');
        const country = data.get('country');
        const pincode = data.get('pincode');

        const user_id = data.get('user_id');
        const session_token = data.get('session_token')

        console.log("user id, session token : ", user_id, "<-->", session_token);

        console.log("Data provided for adding address: ", address_field, " , ", city, " , ", state, " , ", country, " , ", pincode)

        const address = {
            address_field: address_field,
            city: city,
            state: state,
            country: country,
            pincode: pincode
        }

        console.log("Address object ready to ship...", address);

        try {

            const res = await fetch("http://localhost:10010/users/add-address", {
                method: 'POST',
                body: JSON.stringify({ user_id, address, user_id }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session_token}`
                },
                credentials: 'include'
            });

            const resData = await res.json();
            console.log("Response received: ", resData);

            if (resData.message === "Address added successfully") {

                return {
                    success: true,
                    message: resData.message
                }
            }
        }
        catch {

            return {
                error: "Failed to add address! Try again"
            }

        }
    },

    payment_creation: async ({ request }) => {
        const data = await request.formData();

        const paid_by = data.get('paid_by');
        const session_token = data.get('session_token');
        const payment_type = data.get('payment_type');
        let paid_amount = data.get('paid_amount');
        const paid_date = data.get('paid_date');
        paid_amount = parseInt(paid_amount);
        //console.log("Amount's 10 percent : ", paid_amount*0.1);

        console.log("Data provided for adding payment: ", paid_by, " , ", payment_type, " , ", paid_amount, " , ", paid_date)
        console.log("Session token: ", session_token);

        try {
            const res = await fetch("http://localhost:10010/users/payment-creation", {
                method: 'POST',
                body: JSON.stringify({ paid_by, payment_type, paid_amount, paid_date }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session_token}`
                },
                credentials: 'include'
            });

            const resData = await res.json();
            console.log("Response received: ", resData);

            if (resData.message === "Payment created successfully") {
                return {
                    success: true,
                    message: resData.message,
                    payment_id: resData.data._id,
                    payment_date: resData.data.paid_date,
                    payment_amount: resData.data.paid_amount
                }
            }
        }
        catch (err) {
            console.error("Error during login:", err);
            return { error: "Server error, please try again later." };
        }
    },

    order_creation: async ({ request }) => {

        const data = await request.formData();

        const order_items = data.get('order_items');
        let order_amount = data.get('order_amount');
        order_amount = parseInt(order_amount);
        const order_date = data.get('order_date');
        const transaction_id = data.get('transaction_id');
        const order_status = data.get('order_status');
        const customer_id = data.get('customer_id');

        const session_token = data.get('session_token');

        console.log("Data provided for adding order: ", order_items, " , ", order_amount, " , ", order_date, " , ", transaction_id, " , ", order_status, " , ", customer_id)
        console.log("Session token: ", session_token);

        try {
            const res = await fetch("http://localhost:10010/users/place-order", {
                method: 'POST',
                body: JSON.stringify({ order_items, order_amount, order_date, transaction_id, order_status, customer_id }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session_token}`
                },
                credentials: 'include'
            });

            const resData = await res.json();
            console.log("Response received: ", resData);

            if (resData.message === "Order created successfully") {
                return {
                    success: true,
                    message: resData.message,
                    order_id: resData.data._id,
                    order_date: resData.data.order_date,
                    order_status: resData.data.order_status,
                    order_amount: resData.data.order_amount,
                   
                }
            }

        }
        catch (err) {
            console.error("Error during login:", err);
            return { error: "Server error, please try again later." };
        }
    }
};

