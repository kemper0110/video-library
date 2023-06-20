import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Card from "./Card";
import WildCard from "./WildCard";
import {ROLE} from "../../model/user";
import {useUser} from "../../store/user";
import VideoService from "../../api/VideoService";

const CardContainer = () => {
    const {user} = useUser();
    const [searchParams, setSearchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        VideoService.getAll(searchParams.toString()).then(res => setVideos(res.data));
    }, [setVideos, searchParams]);


    return (
        <>
            <h2>Найдено {videos.length} видео</h2>

            <main style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-start",
                justifyContent: "space-evenly",
                width: "80%",
                float: "left"
            }}>
                {
                    videos ?
                        videos.map(video => <Card key={video.id} video={video}/>) : null
                }
                {user.role === ROLE.ROLE_MODERATOR && <WildCard/>}
            </main>
        </>
    )
}

export default CardContainer;