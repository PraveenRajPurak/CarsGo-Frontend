export const load = async() => {
    try {

        const res = await fetch('http://localhost:10010/get-cseData');
           
        const data = await res.json();

        console.log(data);
        return { cseData: data}; 
    } catch (error) {
        console.error(error);
        return { users: []}; 
    }
}

export const actions = {
    'add-cse': async ({ request }) => {
        const data = await request.formData();

        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');
        const cse_id = data.get('cse_id');
        const phone_number = data.get('phone_number');

        console.log("Data Received: ", "name : " , name, " , ","email : ", email, " , ","password : ", password, " , ","cse_id : ", cse_id, " , ","phone_number : ", phone_number);

        const session_token = data.get('sessionToken');

        console.log("Session token: ", session_token);

        try {
            const res = await fetch("http://localhost:10010/admin/create-cse", {
                method: 'POST',
                body: JSON.stringify({ name, email, password, cse_id, phone_number }),
                headers: {
                    'Content-Type': 'application/json',
                    Admin_Authorization: `Bearer ${session_token}`
                },
                credentials: 'include'
            });

            const resData = await res.json();
            console.log("Response received: ", resData);

            if (resData.message === "CSE created successfully") {
                return {
                    success: true,
                    message: resData.message
                }
            }

        }
        catch (err) {
            console.error("Error during login:", err);
            return { error: "Server error, please try again later." };
        }
    }
}