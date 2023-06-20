import {useNavigate} from "react-router";
import {getImagePath, Video} from "../videoApi.ts";


// {title, episodes, rating}: {title: string, episodes: number, rating: number}
const Card = ({video} : {video: Video}) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/video/" + video.id);
    };

    return (
        <div className='flex flex-col max-w-[200px] justify-between gap-3 mx-auto rounded shadow bg-white' onClick={onClick}>
            <span className='w-[200px] h-[280px] overflow-hidden'>
                <img src={getImagePath(video.image)} alt={video.name}/>
            </span>
            <div className='overflow-ellipsis line-clamp-2 text-sm px-3'>
                {video.name}
            </div>
            <div className='flex justify-between text-sm px-3 pb-3'>
                <div>
                    {video.type === "movie" ? "Фильм" : `${video.episodes} эпизодов`}
                </div>
                <div>
                    {video.rating} ☆
                </div>
            </div>
        </div>
    );
};

export default Card;