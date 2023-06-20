import {initialUser, User} from "../service/User.ts";
import {create} from 'zustand'
import {persist} from 'zustand/middleware'


// const useUser = () => {
//     // const {data} = useQuery({
//     //     queryKey: ["user", "info"],
//     //     queryFn: async () => (await getUserData()).data as Readonly<User>,
//     //     keepPreviousData: true,
//     //     refetchOnWindowFocus: false,
//     //     refetchOnMount: false,
//     //     refetchInterval: false,
//     //     enabled: false,
//     //     initialData: initialUser,
//     // })
//     const setUser = (user: User) => {
//
//     }
//     return {data, setUser}
// }

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

// type BearState = {
//     bears: number
// }
// type BearActions = {
//     addABear: () => void;
// }
//
// const useBearStore = create(
//     persist<BearState & BearActions>(
//         (set, get) => ({
//             bears: 0,
//             addABear: () => set({ bears: get().bears + 1 }),
//         }),
//         {
//             name: 'food-storage', // name of the item in the storage (must be unique)
//             storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//         }
//     )
// )

export default useUser;