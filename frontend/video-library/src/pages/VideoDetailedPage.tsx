import {useNavigate, useParams} from "react-router";
import VideoDetailed from '../features/detailedVideo/VideoDetailed.tsx';

const VideoDetailedPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    if(id === undefined) {
        navigate("/")
        return <></>
    }
    return <VideoDetailed video_id={Number.parseInt(id)}/>
};



export default VideoDetailedPage;