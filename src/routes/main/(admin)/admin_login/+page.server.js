export const actions = {
    'admin-login': async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        console.log("Data provided for login: ", email, " , ", password)

        try {
            const res = await fetch("http://localhost:10010/sign-in-admin", {
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
        }
        catch (err) {
            console.error("Error during login:", err);
            return { error: "Server error, please try again later." };
        }
    }
}