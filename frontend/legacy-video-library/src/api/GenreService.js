import {api} from "./api";


class GenreService {
    static getAll = () => api.get("/api/genre");
    static getByVideo = video_id => api.get("/api/genre", {
        params: {
            video_id: video_id
        }
    });
}

export default GenreService;