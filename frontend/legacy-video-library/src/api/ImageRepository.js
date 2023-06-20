import {api, baseURL} from "./api";


class ImageService {
    static getPath = image => baseURL + "/image/" + image;
    static upload = (video_id, image) => {
        const form = new FormData();
        form.append("file", image);
        form.append("video_id", video_id);
        return api.post("/image", form);
    }
}

export default ImageService;