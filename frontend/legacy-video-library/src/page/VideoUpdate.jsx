import {useParams} from "react-router-dom";
import VideoForm from "./VideoForm";
import {useEffect, useState} from "react";
import VideoService from "../api/VideoService";


const VideoUpdate = () => {
    const {id} = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        VideoService.getOne(id).then(res => setVideo(res.data));
    }, [id]);

    const getVideo = () => {
            return {
                id: video.id,
                name: video.name,
                type: video.type,
                description: video.description,
                rating: video.rating,
                episodes: video.episodes,
                genres: new Set(video.genres.map(genre => genre.name)),
                studio: video.studio.name,
                image: video.image
            };
    };

    if(video == null)
        return <h1>Loading</h1>;
    else
        return <VideoForm videoform={getVideo()}/>;
}
export default VideoUpdate;