import {useSearchParams} from "react-router-dom";
import Card from "./Card.tsx";
import ScreenSpinner from "../../../components/ScreenSpinner.tsx";
import useVideosQuery from "../queries/useVideosQuery.tsx";

const CardContainer = () => {
    const [searchParams] = useSearchParams();
    const {data, isLoading, isError} = useVideosQuery(searchParams.toString())
    if (isLoading)
        return <ScreenSpinner/>
    if (isError)
        return <span>Ошибка выполнения запроса</span>

    return (
        <div className='max-w-full grid grid-cols-cards gap-3'>
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