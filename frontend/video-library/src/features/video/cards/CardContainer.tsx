import {useQuery} from "@tanstack/react-query";
import {getAllVideo} from "../videoApi.ts";
import {useSearchParams} from "react-router-dom";
import Card from "./Card.tsx";
import ScreenSpinner from "../../../components/ScreenSpinner.tsx";

const CardContainer = () => {
    // const {user} = useUser();
    const [searchParams] = useSearchParams();
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery(['videos', searchParams.toString()], () => getAllVideo(searchParams.toString()))
    if (isLoading)
        return <ScreenSpinner/>
    if (isError)
        return <span>Ошибка выполнения запроса{error instanceof Error ? ": " + error.message : ""}</span>

    return (
        <div className='max-w-full grid grid-cols-cards grid-rows-cards bg-red-100 gap-3'>
            {
                data.map(video => <Card key={video.id} video={video}/>)
            }
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
            {/*<SkeletonCard/>*/}
        </div>
    );
};

export default CardContainer;