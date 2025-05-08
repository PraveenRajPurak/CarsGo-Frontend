export const load = async() => {
    try {

        const res = await fetch('http://localhost:10010/get-cseData')

        const data = await res.json();

        return { cse: data}; 
    } 
    catch (error) {
        console.error(error);
        return { cse: [] }; 
    }
}