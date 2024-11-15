export const actions = {
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
    }
};