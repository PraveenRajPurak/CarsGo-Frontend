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

export const actions = {
    'add-product': async ({ request }) => {
        const data = await request.formData();

        const name = data.get('name');
        const category = data.get('category');
        const company_name = data.get('company_name');
		const model_name = data.get('model_name');
		let regular_price = data.get('regular_price');
        regular_price = parseInt(regular_price);
		let sale_price = data.get('sale_price');
        sale_price = parseInt(sale_price);
		let sale_starts = data.get('sale_starts');
        sale_starts = new Date(sale_starts + "T00:00:00Z");
		let sale_ends = data.get('sale_ends');
        sale_ends = new Date(sale_ends + "T00:00:00Z");
		let sku = data.get('sku');
        sku = sku.toString();
        let in_stock = data.get('in_stock');

        console.log("Data type of in_stock: ", typeof in_stock);

        console.log("Value of in_stock: ", in_stock);

        let desc = JSON.parse(data.get('description'));

        let description = {};

        let engine = desc.engine;
        engine = engine.toString();

        let fuel_type = desc.fuel_type;
        fuel_type = fuel_type.toString();

        let mileage = desc.mileage;
        mileage = mileage.toString();

        let power_output = desc.power_output;
        power_output = power_output.toString();

        let seating_capacity = desc.seating_capacity;
        seating_capacity = seating_capacity.toString();

        let top_speed = desc.top_speed;
        top_speed = top_speed.toString();

        let tyre = desc.tyre;
        tyre = tyre.toString();

        let length = desc.dimensions.length;
        length = length.toString();

        let width = desc.dimensions.width;
        width = width.toString();

        let height = desc.dimensions.height;
        height = height.toString();

        let weight = desc.weight;
        weight = parseInt(weight);

        let dimensions = {
            length: length,
            width: width,
            height: height
        }

        description = {
            engine: engine,
            fuel_type: fuel_type,
            mileage: mileage,
            power_output: power_output,
            seating_capacity: seating_capacity,
            top_speed: top_speed,
            tyre: tyre,
            dimensions: dimensions,
            weight: weight
        };

        console.log("Description : ", description);


        const images = JSON.parse(data.get('images'));

        const session_token = data.get('session_token');

        console.log("Data Received: ", "name : " , name, "categoty : ", category, " , images : ", images, " , ","company_name : ", company_name, " , ","model_name : ", model_name, " , ","regular_price : ", regular_price, " , ","sale_price : ", sale_price, " , ","sale_starts : ", sale_starts, " , ","sale_ends : ", sale_ends, " , ","sku : ", sku, " , ","in_stock : ", in_stock);
        console.log("Description: ", description);
        console.log("Session token: ", session_token);

        console.log("Sale price: ", sale_price, " , Data Type", typeof sale_price);
        console.log("Regular price: ", regular_price, " , Data Type", typeof regular_price);
        console.log("Sale starts: ", sale_starts, " , Data Type", typeof sale_starts);
        console.log("Sale ends: ", sale_ends, " , Data Type", typeof sale_ends);
        console.log("SKU: ", sku, " , Data Type", typeof sku);

        try {
            const res = await fetch("http://localhost:10010/admin/create-product", {
                method: 'POST',
                body: JSON.stringify({ name, category, images, company_name, model_name, regular_price, sale_price, sale_starts, sale_ends, sku, description, in_stock }),
                headers: {
                    'Content-Type': 'application/json',
                    Admin_Authorization: `Bearer ${session_token}`
                },
                credentials: 'include'
            });

            const resData = await res.json();
            console.log("Response received: ", resData);

            if (resData.message === "Product created successfully") {
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