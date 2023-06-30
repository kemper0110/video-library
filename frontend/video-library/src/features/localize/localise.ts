import {StateModel} from "../statusList/statusApi.ts";
import {VideoTypeModel} from "../../models/video.ts";

export function localizeState(state: StateModel): string {
    switch (state) {
        case "PLANNED":
            return "ЗАПЛАНИРОВАНО"
        case "WATCHING":
            return "СМОТРЮ"
        case "WATCHED":
            return "ПРОСМОТРЕНО"
        case "ABANDONED":
            return "БРОШЕНО"
    }
    return ""
}

export function localizeVideoType(video_type: VideoTypeModel): string {
    switch (video_type) {
        case "season":
            return "сериал"
        case "movie":
            return "фильм"
    }
    return ""
}