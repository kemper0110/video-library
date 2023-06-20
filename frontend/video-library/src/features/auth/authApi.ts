import {api} from "../api/api.ts";
import {User} from "../../service/User.ts";

export function getUserData() {
    return api.get<User>("/api/user");
}

export function signIn(username: string, password: string) {
    return api.post<User>("/auth/login", new URLSearchParams({username, password}));
}

export function signUp(username: string, password: string) {
    return api.post<User>("/auth/registration", new URLSearchParams({username, password}));
}

export function signOut() {
    return api.delete("/auth/logout");
}
