import ScreenSpinner from "../../components/ScreenSpinner.tsx";
import VideoUpdateForm from "./VideoUpdateForm.tsx";
import {VideoDetailedModel} from "../../models/video.ts";
import {VideoFormModel} from "./form.ts";
import useVideoQuery from "../queries/useVideoQuery.tsx";

function map(video: VideoDetailedModel): VideoFormModel {
    return {
        id: video.id,
        name: video.name,
        type: video.type,
        episodes: video.episodes,
        description: video.description,
        rating: video.rating,
        studio: video.studio.id,
        genres: video.genres.map(g => g.id),
        image: video.image
    }
}

const VideoProvider = ({video_id}: { video_id: number }) => {
    const {data, isLoading, isError} = useVideoQuery(video_id)
    if (isLoading)
        return <ScreenSpinner/>
    if (isError)
        return <div>Ошибка загрузки видео</div>
    return (
        <VideoUpdateForm initialForm={map(data)}/>
    );
};

export default VideoProvider;