import { writable } from "svelte/store";

export const isLoggedIn = writable(false);
export const register_login_popup = writable(false);
export const user_Data = writable({});