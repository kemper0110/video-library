import {api} from "../api/api.ts";
import {PreviewStudioModel} from "../../models/studio.ts";

export async function getAllStudios() {
    const {data} = await api.get<PreviewStudioModel[]>("/api/studio")
    return data
}
