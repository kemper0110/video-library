import ImageService from "../../api/ImageRepository";

const Card = ({video}) => {

    return (
        <span style={{maxWidth: 200, maxHeight: 280, overflow: "hidden"}}>
                <img src={ImageService.getPath(video.image)} alt={video.name} className={"card-img-top"}/>
        </span>
    )
}

export default Card;