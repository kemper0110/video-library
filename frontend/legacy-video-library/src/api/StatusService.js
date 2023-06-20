import {api} from "./api";


class StatusService {
    static getAll = () => api.get("/api/status/all");
    static getByVideo = video_id => api.get("/api/status", {
        params: {
            video_id: video_id
        }
    });
    static setStateByVideo = (video_id, state) => api.patch("/api/status", new URLSearchParams({video_id, state}));

    static deleteStatus = video_id => api.delete("/api/status", {
        params: {
            video_id: video_id
        }
    });
    static setRating = (video_id, rating) => api.post("/api/status/rating", {}, {
        params: {video_id, rating}
    });

    static sendEpisodes = (video_id, episodes) => api.post("/api/status/episode", {}, {
        params: {video_id, episodes}
    });
}

export default StatusService;