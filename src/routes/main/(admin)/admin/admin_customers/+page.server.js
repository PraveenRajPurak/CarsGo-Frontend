export const load = async() => {
    try {

        const res = await fetch('http://localhost:10010/get-all-users');
           
        const data = await res.json();

        console.log(data);
        return { users: data}; 
    } catch (error) {
        console.error(error);
        return { users: []}; 
    }
}
