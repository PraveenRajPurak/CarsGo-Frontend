export const load = async() => {
    try {

        const res = await fetch('http://localhost:10010/view-all-products');
           
        const data = await res.json();

        console.log(data);
        return { products: data}; 
    } catch (error) {
        console.error(error);
        return { products: []}; 
    }
}
