export const load = async() => {
    try {

        const [res, res2] = await Promise.all([
            fetch('http://localhost:10010/view-all-products'),
            fetch('http://localhost:10010/get-all-categories')
        ])

        const data = await res.json();
        const data2 = await res2.json();
        console.log("categories", data2);
        return { products: data, categories : data2 }; 
    } catch (error) {
        console.error(error);
        return { products: [], categories: [] }; 
    }
}

export const actions ={

    'signup': async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');
        const phone = data.get('phone');

        console.log("Data provided for signup: ", name," , ",email," , ",password," , ",phone)

        try {
            const res = await fetch("http://localhost:10010/sign-up", {
                method: 'POST',
                body: JSON.stringify({ name, email, password, phone }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            const resData = await res.json();
            console.log("Response received: ", resData);

            if (resData.message === "User created successfully") {
                return {
                    success: true,
                    message: resData.message
                };
            } else {
                return { error: "Failed to signup! Try again" };
            }
        }
        catch(err){
            console.error("Error during signup:", err);
        }
    },
    
    'login': async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    console.log("Data provided for login: ", email," , ",password)

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
};

