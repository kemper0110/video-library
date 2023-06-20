import {api} from "./api";


class VideoService {
    static getAll = query => api.get("/api/video" + '?' + query);
    static getOne = video_id => api.get("/api/video/" + video_id);
    static add = video => api.post("/api/video", video);
    static delete = video_id => api.delete("/api/video/" + video_id);
}


export default VideoService;