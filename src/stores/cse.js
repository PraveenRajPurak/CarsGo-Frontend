import { writable } from "svelte/store";

export const isCSELoggedIn = writable(false);
export const cse_Data = writable({});
export const cse_Extended_Data = writable({}); 

export function updateCSEData(data) {
    cse_Data.set(data);
}

export function updateCSELoggedIn(data) {
    isCSELoggedIn.set(data);
}

export function updateCSEExtendedData(data) {
    cse_Extended_Data.set(data);
}