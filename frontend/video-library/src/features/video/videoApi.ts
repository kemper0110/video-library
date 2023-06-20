import {api, baseURL} from "../api/api.ts";

export type VideoType = "season" | "movie"

export type Video = {
    id: number
    name: string
    image: string
    rating: number
    type: VideoType
    episodes: number
}

export type Studio = {
    id: number
    name: string
    description: string
}
export type Genre = {
    id: number
    name: string
    description: string
}
export type VideoDetailed = Video & {
    studio: Studio
    genres: Genre[]
    description: string
}

export async function getAllVideo(query: string) {
    const {data} = await api.get<Video[]>("/api/video" + '?' + query)
    return data
}

export async function getOneVideo(video_id: number) {
    const {data} = await api.get<VideoDetailed>("/api/video/" + video_id);
    return data
}


// TODO: create video type
export function addVideo(video: Video) {
    return api.post("/api/video", video);
}

export function deleteVideo(video_id: number) {
    return api.delete("/api/video/" + video_id);
}

export function getImagePath(image: string) {
    return baseURL + "/image/" + image;
}

export function uploadImage(video_id: number, image: string) {
    const form = new FormData();
    form.append("file", image);
    form.append("video_id", video_id.toString());
    return api.post("/image", form);
}