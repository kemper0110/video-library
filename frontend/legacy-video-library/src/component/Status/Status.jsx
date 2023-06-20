import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {translateType} from "../../util/translate";
import StatusService from "../../api/StatusService";

const Status = ({videostatus, idx}) => {
    const navigate = useNavigate();
    const onVideoClick = () => {
        const id = videostatus.video.id;
        navigate("/video/" + id);
    };
    const [rating, setRating] = useState(videostatus.rating);
    const onRatingChange = e => {
        setRating(e.target.value);
    };
    const onRatingSubmit = () => {
        StatusService.setRating(videostatus.video.id, rating).then(res => {
            console.log(JSON.stringify(res));
            // if(res.status === 200)
            //     alert.success("Рейтинг успешно выставлен");
            // else
            //     alert.error("Ошибка выставления рейтинга");
        })
            // .catch(reason => alert.error("Ошибка выставления рейтинга: " + reason));
    };

    const [episodes, setEpisodes] = useState(videostatus.episodes);
    const onEpisodesChange = e => {
        setEpisodes(e.target.value);
    };
    const onEpisodesSubmit = () => {
        StatusService.sendEpisodes(videostatus.video.id, episodes).then(res => {
            // if(res.status === 200)
            //     alert.success("Количество эпизодов успешно выставлено");
            // else
            //     alert.error("Ошибка выставления количества эпизодов");
        });
    };

    return (
        <tr>
            <td>{idx + 1}</td>
            <td className={"link-dark"} onClick={onVideoClick}>{videostatus.video.name}</td>
            <td><input type="number" className="form-control"
                       style={{minWidth: "20%", maxWidth: "60%"}}
                       value={rating}
                       onChange={onRatingChange} onBlur={onRatingSubmit} max={10}
                       min={0}
            /></td>
            <td>
                <span className="m-1">
                    <input type="number" className="form-control m-1" style={{minWidth: "20%", maxWidth: "40%", display: "inline-block"}} value={episodes}
                           onBlur={onEpisodesSubmit}
                           onChange={onEpisodesChange} max={videostatus.video.episodes} min={0}/>
                    / {videostatus.video.episodes}</span>
            </td>
            <td>{translateType(videostatus.video.type)}</td>
        </tr>
    );
}

export default Status;