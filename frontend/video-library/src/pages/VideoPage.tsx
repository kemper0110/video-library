import CardContainer from "../features/video/cards/CardContainer.tsx";
import FilterSide from "../features/video/filter/FilterSide.tsx";

const VideoPage = () => {
    return (
        <div>
            <div className='w-full'>
                Header
            </div>
            <div className='w-full grid grid-cols-1 lg:grid-cols-cards_filter gap-7'>
                <CardContainer/>
                <FilterSide/>
            </div>
        </div>
    );
};

export default VideoPage;