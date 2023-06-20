import {useNavigate} from "react-router-dom";
import {getNumEnding} from "../../util/endings";
import ImageCutter from "./ImageCutter";
import ImageService from "../../api/ImageRepository";


const Card = ({video}) => {
    const navigate = useNavigate();

    const onClick = e => {
        navigate("/video/" + video.id);
    };

    const body = video => {
        switch (video.type) {
            case "season":
                return <span className="m-1" style={{float: "left"}}>
                    {video.episodes > 0 ? video.episodes : "Нет"} {getNumEnding(video.episodes, ['эпизод', 'эпизода', 'эпизодов'])}
                </span>;
            case "movie":
                return <span className="m-1" style={{float: "left"}}>Фильм</span>
        }
    };

    return (
        <div className="card shadow" style={{flex: "1 1 auto", maxWidth: 200, margin: "20px", cursor: "pointer"}}
             onClick={onClick}>
            <ImageCutter maxWidth="200px" maxHeight="280px">
                <img src={ImageService.getPath(video.image)} alt={video.name} className={"card-img-top"}/>
            </ImageCutter>
            <div className={"card-body"}>
                <h6 className={"card-title card-link"} style={{textOverflow: "ellipsis"}}>{video.name}</h6>
                <p className={"card-text"}>
                    {body(video)}
                    <span className="m-1" style={{float: "right"}}>{video.rating}☆</span>
                </p>
            </div>
        </div>
    );
}


export default Card;