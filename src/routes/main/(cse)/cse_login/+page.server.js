export const actions = {
    'cse-login': async ({ request }) => {
        const data = await request.formData();
        const cse_id = data.get('cse_id');
        const password = data.get('password');

        console.log("Data provided for login: ", cse_id," , ",password)

        try {
            const res = await fetch("http://localhost:10010/cse_login", {
                method: 'POST',
                body: JSON.stringify({ cse_id, password }),
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
                    cse_id: resData.cse_id,
                    phone_number: resData.phone_number,
                    session_token: resData.session_token,
                };
            } else {
                return { error: "Failed to login! Try again" };
            }
        }
        catch (err) {
            console.error("Error during login:", err);
            return { error: "Server error, please try again later." };
        }
    }
}