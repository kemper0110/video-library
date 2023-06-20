import {useEffect, useState} from "react";
import {translateType} from "../../util/translate";
import GenreService from "../../api/GenreService";


const Info = ({video}) => {

    const [genres, setGenres] = useState([]);
    useEffect(() => {
        GenreService.getByVideo(video.id).then(res => {
            if (res.status !== 200) {
                console.log("genres fetching error");
                return;
            }
            setGenres(res.data);
        })
    }, [video.id]);


    return (
        <>
            <h3>Информация</h3>
            <div style={{display: "inline"}}>
                <p>Тип: {translateType(video.type)}</p>
                <p className={"d-inline-block"}>
                    Жанры: {genres.map(genre => <span key={genre.id} className={"d-inline m-1"}>{genre.name}</span>)}
                </p>
                <span>

                </span>
            </div>
        </>
    )
}

export default Info;