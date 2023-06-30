import {api} from "../api/api.ts";

export type PreviewCommentModel = {
    date: Date
    text: string
    username: string
}

export async function getAllByVideo(video_id: number) {
    const {data} = await api.get<PreviewCommentModel[]>(`/api/comment/all?video_id=${video_id}`)
    return data
}

export function addComment(video_id: number, text: string) {
    const params = new URLSearchParams()
    params.append("video_id", String(video_id))
    params.append("text", text)
    return api.post("/api/comment", params)
}

