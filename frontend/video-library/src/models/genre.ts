export type PreviewGenreModel = {
    id: number
    name: string
}
export type GenreModel = PreviewGenreModel & {
    description?: string
}