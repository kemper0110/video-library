
export const ROLE = {
    ROLE_UNAUTHORIZED: "UNAUTHORIZED",
    ROLE_USER: "ROLE_USER",
    ROLE_MODERATOR: "ROLE_MODERATOR"
}
const ROLE_PRIORITY = {
    ROLE_UNAUTHORIZED: 0,
    ROLE_USER: 1,
    ROLE_MODERATOR: 2
}

export const isAccepted = (user_role, required_role) => {
    return ROLE_PRIORITY[user_role] >= ROLE_PRIORITY[required_role];
}