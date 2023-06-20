import {api} from "./api";


class UserService{
    static data = () => api.get("/api/user");
    static signIn = (username, password) => api.post("/auth/login", new URLSearchParams({username, password}));
    static signUp = (username, password) => api.post("/auth/registration", new URLSearchParams({username, password}));
    static signOut = () => api.delete("/auth/logout");
}
export default UserService;