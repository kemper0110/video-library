import {useNavigate} from "react-router";
import {getImagePath} from "../videoApi.ts";

import {VideoModel} from "../../../models/video.ts";
import VideoDialog from "./VideoDialog.tsx";
import React, {useState} from "react";


type OpenDialog = {
    open: true
    cardRect: DOMRect
}
type ClosedDialog = {
    open: false
    cardRect: null
}

type DialogData = OpenDialog | ClosedDialog

// {title, episodes, rating}: {title: string, episodes: number, rating: number}
const Card = ({video}: { video: VideoModel }) => {
    const navigate = useNavigate();
    const [dialogData, setDialogData] = useState<DialogData>({
        open: false,
        cardRect: null
    })
    const [delay, setDelay] = useState<number | undefined>(undefined)

    const onClick = () => {
        navigate("/video/" + video.id);
    };

    const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setDelay(setTimeout(() => {
            setDialogData({open: true, cardRect: rect})
        }, 500))
    }
    const onMouseLeave = () => {
        clearTimeout(delay)
        setDialogData({
            open: false,
            cardRect: null
        })
    }

    return (
        <article className='flex flex-col max-w-[220px] justify-between gap-3 mx-auto rounded shadow bg-white'
                 onClick={onClick}
                 onMouseEnter={onMouseEnter}
                 onMouseLeave={onMouseLeave}
        >
            {
                dialogData.open ? <VideoDialog video_id={video.id} cardRect={dialogData.cardRect}/> : null
            }
            <figure>
                <div className='min-w-[200px] h-[280px] overflow-hidden rounded-t'>
                    <img src={getImagePath(video.image)} alt={video.name}
                         className='min-h-full min-w-full object-cover bg-cover'
                    />
                </div>
                <figcaption className='overflow-ellipsis line-clamp-2 text-sm px-3 mt-3'>
                    {video.name}
                </figcaption>
            </figure>
            <p className='flex justify-between text-sm px-3 pb-3'>
                <span>
                    {video.type === "movie" ? "Фильм" : `${video.episodes} эпизодов`}
                </span>
                <span>
                    {video.rating} ☆
                </span>
            </p>
        </article>
    );
};

export default Card;