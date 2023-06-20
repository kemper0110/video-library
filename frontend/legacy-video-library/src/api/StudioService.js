import {api} from "./api";


class StudioService {
    static getAll = api.get("/api/studio");
}

export default StudioService;