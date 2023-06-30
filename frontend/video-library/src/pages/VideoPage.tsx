import CardContainer from "../features/video/cards/CardContainer.tsx";
import FilterSide from "../features/video/filter/FilterSide.tsx";

const VideoPage = () => {
    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-cards_filter gap-7 pt-3 px-5'>
            <CardContainer/>
            <FilterSide/>
        </div>
    );
};

export default VideoPage;