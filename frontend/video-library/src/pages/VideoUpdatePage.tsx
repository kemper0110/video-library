import {useNavigate, useParams} from "react-router";
import VideoProvider from "../features/videoForm/VideoProvider.tsx";

const VideoUpdatePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    if (id === undefined) {
        navigate("/")
        return <></>
    }
    return <VideoProvider video_id={Number.parseInt(id)}/>
};

export default VideoUpdatePage;