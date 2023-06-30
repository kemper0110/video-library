import {api, baseURL} from "../api/api.ts";

import {VideoDetailedModel, VideoModel} from "../../models/video.ts";

import {VideoFormModel} from "../videoForm/form.ts";

export async function getAllVideo(query: string) {
    const {data} = await api.get<VideoModel[]>("/api/video" + '?' + query)
    return data
}

export async function getOneVideo(video_id: number) {
    const {data} = await api.get<VideoDetailedModel>("/api/video/" + video_id);
    return data
}

function makeVideoForm(videoForm: VideoFormModel): FormData {
    const file = videoForm.image
    if(file instanceof File)
        videoForm.image = null

    const form = new FormData()
    const video = JSON.stringify(videoForm)
    form.append('video', new Blob([video], {type: 'application/json'}))
    if (file !== null && typeof file !== 'string')
        form.append('file', file)
    console.log(video + ' ' + file)
    return form
}

export function addVideo(videoForm: Readonly<VideoFormModel>) {
    const form = makeVideoForm(videoForm)
    return api.post("/api/video", form);
}

export function updateVideo(videoForm: Readonly<VideoFormModel>) {
    const form = makeVideoForm(videoForm)
    return api.put("/api/video", form);
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