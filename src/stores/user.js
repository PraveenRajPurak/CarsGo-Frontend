import { writable } from "svelte/store";

export const isLoggedIn = writable(false);
export const register_login_popup = writable(false);
export const user_Data = writable({});
export const user_Extended_Data = writable({});

export function updateUserData(data) {
    user_Data.set(data);
}

export function updateExtendedUserData(data) {
    user_Extended_Data.set(data);
}