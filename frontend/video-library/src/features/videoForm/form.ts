import {Errors} from "../auth/form.ts";
import {VideoTypeModel} from "../../models/video.ts";


export type VideoFormModel = {
    id?: number
    name: string
    rating: number
    studio: number
    type: VideoTypeModel
    episodes: number
    genres: number[]
    description: string
    image: File | string | null
    /*
        Тут без пояснений не обойтись
        image имеет тип string, когда у видео ранее было изображение - это путь к изображению
        имеет тип File, когда для видео выбрали новое изображение
        имеет тип null, когда еще не выбрали ничего
    */
}
export type VideoFormErrors = Partial<Errors<VideoFormModel>>
export const validateVideoForm = (values: Readonly<VideoFormModel>): VideoFormErrors => {
    const errors: VideoFormErrors = {}
    if (!values.name)
        errors.name = "Обязательное поле"
    return errors
}