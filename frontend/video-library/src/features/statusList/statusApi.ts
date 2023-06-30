import {api} from "../api/api.ts";
import {AxiosError} from "axios";

import {VideoTypeModel} from "../../models/video.ts";


export type StateModel = "PLANNED" | "WATCHING" | "WATCHED" | "ABANDONED"

export type StatusModel = {
    state: StateModel
    rating: number
    episodes: number

    video_id: number
    video_episodes: number
    video_name: string
    video_type: VideoTypeModel
}


export async function getAllStatuses() {
    const {data} = await api.get<StatusModel[]>("/api/status/all")
    return data
}

export type PreviewStatusModel = {
    // video_id: number
    state?: StateModel
}

export async function getStatusByVideo(video_id: number) {
    try {
        const response = await api.get<PreviewStatusModel>("/api/status", {
            params: {
                video_id: video_id
            }
        })
        return response.data
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 404) {
            console.error("У пользователя отсутствует статус для данного видео")

            return {state: undefined} as PreviewStatusModel
        }
        throw e
    }
}

export function setStateByVideo(video_id: number, state: StateModel) {
    return api.patch("/api/status", new URLSearchParams({video_id: video_id.toString(), state}));
}

export function deleteStatus(video_id: number) {
    return api.delete("/api/status", {
        params: {
            video_id: video_id
        }
    })
}

export function setStatusRating(video_id: number, rating: number) {
    return api.post("/api/status/rating", {},
        {
            params: {video_id, rating}
        }
    )
}

export function setStatusEpisodes(video_id: number, episodes: number) {
    return api.post("/api/status/episode", {}, {
        params: {video_id, episodes}
    })
}