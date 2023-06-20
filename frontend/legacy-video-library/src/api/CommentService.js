import {api} from "./api";


class CommentService {
    static getAllByVideo = video_id => api.get(`/api/comment/all?video_id=${video_id}`);
    static add = (video_id, text) => api.post("/api/comment", new URLSearchParams({video_id, text}));
}

export default CommentService;