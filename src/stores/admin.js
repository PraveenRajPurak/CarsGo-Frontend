import { writable } from "svelte/store";

export const isAdminLoggedIn = writable(false);
export const admin_Data = writable({});

export function updateAdminData(data) {
    admin_Data.set(data);
}

export function updateAdminLoggedIn(data) {
    isAdminLoggedIn.set(data);
}