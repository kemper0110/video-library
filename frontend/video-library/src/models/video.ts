import {StudioModel} from "./studio.ts";
import {GenreModel} from "./genre.ts";

export type VideoTypeModel = "season" | "movie"
export type VideoModel = {
    id: number
    name: string
    image: string
    rating: number
    type: VideoTypeModel
    episodes: number
}
export type VideoDetailedModel = VideoModel & {
    studio: StudioModel
    genres: GenreModel[]
    description: string
}