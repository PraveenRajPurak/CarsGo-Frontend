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
