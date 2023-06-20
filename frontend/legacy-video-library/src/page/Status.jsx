import {useEffect, useState} from "react";
import Article from "../component/Status/Article";
import StatusService from "../api/StatusService";


const STATE = {
    PLANNED: "PLANNED",
    WATCHING: "WATCHING",
    WATCHED: "WATCHED",
    ABANDONED: "ABANDONED"
}

// omg it not copies object
// even with {...initialVideos}
// so I just copy this scheme to all places
// const initialVideos = {
//     PLANNED: [],
//     WATCHING: [],
//     WATCHED: [],
//     ABANDONED: []
// }

const Status = () => {
    const [baseVideos, setBaseVideos] = useState([]);
    const [videos, setVideos] = useState({
        PLANNED: [],
        WATCHING: [],
        WATCHED: [],
        ABANDONED: []
    });

    useEffect(() => {
        StatusService.getAll().then(res => {
            if (res.status !== 200)
                return;
            setBaseVideos(res.data);
            console.log("old videos: " + videos.PLANNED.length);
            const splitted = res.data.reduce((accumulator, value) => {
                accumulator[value.state].push(value);
                return accumulator;
            }, {
                PLANNED: [],
                WATCHING: [],
                WATCHED: [],
                ABANDONED: []
            });
            setVideos(splitted);
            console.log("splitted: " + splitted.PLANNED.length);
        });
    }, []);

    return (
        <>
            <Article name="Запланировано" videos={videos.PLANNED}/>
            <hr/>
            <Article name="Смотрю" videos={videos.WATCHING}/>
            <hr/>
            <Article name="Просмотрено" videos={videos.WATCHED}/>
            <hr/>
            <Article name="Брошено" videos={videos.ABANDONED}/>
        </>
    );
};

export default Status;