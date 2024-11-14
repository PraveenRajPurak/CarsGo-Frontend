import { writable } from 'svelte/store'

export const products_store = writable([])

export function addProduct(product) {
    products_store.update((data) => {
        return [...data, product]
    })
}

export function updateProducts(data) {
    products_store.set(data)
}