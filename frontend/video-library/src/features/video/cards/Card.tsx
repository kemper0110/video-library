import {useNavigate} from "react-router";
import {getImagePath} from "../videoApi.ts";

import {VideoModel} from "../../../models/video.ts";


// {title, episodes, rating}: {title: string, episodes: number, rating: number}
const Card = ({video} : {video: VideoModel}) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/video/" + video.id);
    };
    // max-w-[200px]
    return (
        <div className='flex flex-col justify-between gap-3 mx-auto rounded shadow bg-white' onClick={onClick}>
            <span className='h-[280px] overflow-hidden rounded-t'>
                <img src={getImagePath(video.image)} alt={video.name}
                     className=' object-cover bg-cover w-full'
                />
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