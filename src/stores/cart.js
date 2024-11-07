import {writable} from "svelte/store";

export const cart = writable([]);

export function addToCart(product){

    cart.update((data) => {
        return [...data, product]
})}

export function removeFromCart(product){
    cart.update((data) => {
        return data.filter((item) => item.id !== product.id)
    })
}

export function changeQuantity(product, quantity){
    cart.update((data) => {
        return data.map((item) => {
            if(item.id === product.id){
                item.quantity = quantity
            }
            return item
        })
    })
}
export function clearCart(){
    cart.set([])
}