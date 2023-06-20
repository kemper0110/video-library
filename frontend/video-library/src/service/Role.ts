export type Role = "UNAUTHORIZED" | "ROLE_USER" | "ROLE_MODERATOR"


const ROLE_PRIORITY = {
    UNAUTHORIZED: 0,
    ROLE_USER: 1,
    ROLE_MODERATOR: 2
}

export const isAccepted = (user_role: Role, required_role: Role) => {
    return ROLE_PRIORITY[user_role] >= ROLE_PRIORITY[required_role];
}
