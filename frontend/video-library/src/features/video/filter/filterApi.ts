import {api} from "../../api/api.ts";

type Genre = {
    id: number
    name: string
}

export async function getAllGenres() {
    const {data} = await api.get<Genre[]>("/api/genre")
    return data
}