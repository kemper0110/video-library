import {useNavigate} from "react-router-dom";
import ImageService from "../../api/ImageRepository";


const WildCard = () => {
    const navigate = useNavigate();

    const onClick = e => {
        navigate("/video/add");
    };
    return (
        <div className={"card shadow"} style={{flex: "1 1 auto", maxWidth: 200, margin: "20px", cursor: "pointer"}} onClick={onClick}>
            <span style={{maxWidth: 200, maxHeight: 280, overflow: "hidden"}}>
            <img src={ImageService.getPath("null.jpg")} alt={"Добавить видео"} className={"card-img-top"}/>
            </span>
            <div className={"card-body"}>
                <h6 className={"card-title card-link"} style={{textOverflow: "ellipsis"}}>Добавить видео</h6>
                <p className={"card-text"}>
                </p>
            </div>
        </div>
    );
}

export default WildCard;