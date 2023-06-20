import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {Genre, getImagePath, getOneVideo, Studio, VideoDetailed, VideoType} from "../features/video/videoApi.ts";
import ScreenSpinner from "../components/ScreenSpinner.tsx";
import Headline from "../components/Headline.tsx";
import {ReactNode, useId, useState} from "react";

const VideoDetailedPage = () => {
    const {id} = useParams();
    if (id === undefined)
        return <div>Видео не найдено</div>
    const {data, isLoading, isError} = useQuery(["video", Number.parseInt(id)], () => getOneVideo(Number.parseInt(id)))
    if (isLoading)
        return <ScreenSpinner/>
    if (isError)
        return <div>Ошибка загрузки видео</div>
    return (
        <div className='bg-white px-4 w-[1024px] mx-auto'>
            <h1 className='text-3xl'>{data.name}</h1>
            {/*<div className='grid grid-areas-detailed_wide3 grid-cols-3 gap-6 w-full'>*/}
            <div className='grid grid-areas-detailed_wide gap-6 w-full mt-5'>
                <ManageVideo video={data}/>
                <Info type={data.type} episodes={data.episodes} genres={data.genres}/>
                <Rating rating={data.rating}/>
                <StudioInfo studio={data.studio}/>
                <Description description={data.description}/>
            </div>
        </div>
    );
};

const State1 = () => {
    const id = useId();

    return (
        <div className='m-4 flex items-stretch'>
            <label htmlFor={id} className='bg-[#e9ecef] rounded-l-lg p-2 border-1 border-r-0 border-[#ced4da]'>Состояние</label>
            <select id={id} className='bg-white rounded-r-lg p-2 border border-1 border-[#ced4da] '>
                <option>Отсутствует в списке</option>
                <option>Запланировано</option>
                <option>Просмотренно</option>
                <option>Брошено</option>
                <option>Смотрю</option>
            </select>
        </div>
    )
}
const State2 = () => {
    const [open, setOpen] = useState(false)
    // const height = open ? '100%' : "0%";
    const rows = open ? "1fr" : "0fr";
    return (
        <div className='mt-4'>
            <div className='bg-[#daf1ff] border-[#bce6ff] border border-l-8 flex justify-between py-1 px-2 items-center'>
                <div className='flex gap-1 font-semibold text-[#176093] items-center'>
                    +
                    <div>
                        Добавить в список
                    </div>
                </div>
                <div onClick={() => setOpen(state => !state)} className='cursor-pointer select-none'>
                    &gt;
                </div>
            </div>
            <div className='grid transition-all duration-300' style={{gridTemplateRows: rows}}>
                <div className='border-[#bce6ff] border border-l-8 bg-[#daf1ff] transition-all duration-300 overflow-hidden'>
                    <div className='border-[#bce6ff] border border-t-0 py-1 px-2'>Отсутствует в списке</div>
                    <div className='border-[#bce6ff] border py-1 px-2'>Запланировано</div>
                    <div className='border-[#bce6ff] border py-1 px-2'>Просмотренно</div>
                    <div className='border-[#bce6ff] border py-1 px-2'>Брошено</div>
                    <div className='border-[#bce6ff] border py-1 px-2'>Смотрю</div>
                </div>
            </div>
        </div>
    )
}

const ManageVideo = ({video}: { video: VideoDetailed }) => {
    return (
        <div className='grid-in-img bg-white'>
            <Image img={video.image} alt={video.name}/>
            <State2/>
        </div>
    )
}

const Image = ({img, alt}: { img: string, alt: string }) => (
    <div>
        <img src={getImagePath(img)} alt={alt}/>
    </div>
)
const Info = ({type, episodes, genres}: { type: VideoType, episodes: number, genres: Genre[] }) => (
    <div className='grid-in-info'>
        <Headline title='Информация'/>
        <ul className=''>
            <InfoItem field={
                <div>Тип:</div>
            } value={
                <div>{type}</div>
            }/>
            <InfoItem field={
                <div>Эпизоды:</div>
            } value={
                <div>{episodes}</div>
            }/>
            <InfoItem field={
                <div>Жанры:</div>
            } value={
                genres.map(genre => <div className='underline'>{genre.name}</div>)
            }/>
        </ul>
    </div>
)
const InfoItem = ({field, value}: { field: ReactNode, value: ReactNode }) => (
    <li className='flex flex-wrap gap-x-2'>
        {field}
        {value}
    </li>
)
const Description = ({description}: { description: string }) => (
    <div className='grid-in-desc'>
        <Headline title='Описание'/>
        <span className='text-sm'>{description}</span>
    </div>
)

const Rating = ({rating}: { rating: number }) => (
    <div className='grid-in-rating'>
        <Headline title='Рейтинг'/>
        <h5 className='text-3xl'>{rating} ☆</h5>
    </div>
)
const StudioInfo = ({studio}: { studio: Studio }) => (
    <div className='grid-in-studio'>
        <Headline title='Студия'/>
        <h5 className='text-3xl'>{studio.name}</h5>
    </div>
)

export default VideoDetailedPage;