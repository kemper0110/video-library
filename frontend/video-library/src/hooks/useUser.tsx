import {initialUser, User} from "../service/User.ts";
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type State = {
    user: Readonly<User>
}

type Actions = {
    setUser: (user: Readonly<User>) => void
    invalidateUser: () => void
}

const useUser = create(persist<State & Actions>(
    (set) => ({
        user: initialUser,
        setUser: (user: Readonly<User>) => set(() => ({user})),
        invalidateUser: () => set(() => ({user: initialUser}))
    }),
    {
        name: "user-storage"
    }
))

export default useUser;