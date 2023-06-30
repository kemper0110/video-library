import ScreenSpinner from "../../components/ScreenSpinner.tsx";
import Headline from "../../components/Headline.tsx";
import Info from "./Info.tsx";
import ManageVideo from "./ManageVideo.tsx";
import CommentsSection from "../comments/CommentsSection.tsx";
import YourComment from "../comments/YourComment.tsx";
import {StudioModel} from "../../models/studio.ts";
import Stars from "./Stars.tsx";
import useVideoQuery from "../queries/useVideoQuery.tsx";


const VideoDetailed = ({video_id}: { video_id: number }) => {
    const {data, isLoading, isError} = useVideoQuery(video_id)
    if (isLoading)
        return <ScreenSpinner/>
    if (isError)
        return <div>Ошибка загрузки видео</div>
    return (
        <div className='bg-white px-4 w-[1024px] mx-auto mt-4'>
            <h1 className='text-4xl'>{data.name}</h1>
            {/*<div className='grid grid-areas-detailed_wide3 grid-cols-3 gap-6 w-full'>*/}
            <div className='grid grid-areas-detailed_wide gap-6 w-full mt-5 mb-6'>
                <ManageVideo video={data}/>
                <Info type={data.type} episodes={data.episodes} genres={data.genres}/>
                <Rating rating={data.rating}/>
                <StudioInfo studio={data.studio}/>
                <Description description={data.description}/>
            </div>
            <CommentsSection video_id={video_id}/>
            <YourComment video_id={video_id}/>
        </div>
    );
};


const Description = ({description}: { description: string }) => (
    <div className='grid-in-desc'>
        <Headline title='Описание'/>
        <span className='text-sm pt-3'>{description}</span>
    </div>
)

const Rating = ({rating}: { rating: number }) => (
    <div className='grid-in-rating'>
        <Headline title='Рейтинг'/>
        <h5 className='text-3xl pt-3 flex items-center justify-center gap-3'>
            <Stars rating={rating}/>
            <div>{rating}</div>
        </h5>
    </div>
)
const StudioInfo = ({studio}: { studio: StudioModel }) => (
    <div className='grid-in-studio'>
        <Headline title='Студия'/>
        <h5 className='text-3xl text-center pt-3 font-medium text-slate-700'>
            {studio.name}
        </h5>
    </div>
)

export default VideoDetailed;