export const load = async() => {
    try {

        const res = await fetch('http://localhost:10010/get-all-categories');
           
        const data = await res.json();

        console.log(data);
        return { categories: data}; 
    } catch (error) {
        console.error(error);
        return { categories: []}; 
    }
}
