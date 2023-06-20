import {ROLE} from "../model/user";
import {createStore} from "state-pool";


const user_store = createStore();
user_store.persist({
    PERSIST_ENTIRE_STORE: true,
    saveState: (key, value, isInitialSet) => localStorage.setItem(key, JSON.stringify(value)),
    loadState: (key, noState) => {
        const state = localStorage.getItem(key);
        if(state === null)
            return noState;
        return JSON.parse(state);
    },
    removeState: key => localStorage.removeItem(key),
    clear: () => localStorage.clear()
})

user_store.setState("user", {
    id: null,
    username: null,
    role: ROLE.ROLE_UNAUTHORIZED
});

export const useUser = () => {
    const [user, setUser, updateUser] = user_store.useState("user");
    return {
        user,
        setUser,
        updateUser,
        invalidateUser: () => setUser({
            id: null,
            username: null,
            role: ROLE.ROLE_UNAUTHORIZED
        })
    };
}