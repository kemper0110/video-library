import {Role} from "./Role.ts";

export type User = {
    id: number,
    username: string,
    role: Role
}
export const initialUser: Readonly<User> = {
    id: 0,
    username: "",
    role: "UNAUTHORIZED"
}