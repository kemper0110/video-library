import CardContainer from "../features/video/cards/CardContainer.tsx";
import FilterSide from "../features/video/filter/FilterSide.tsx";
import {useState} from "react";
import closeIcon from '../assets/close.svg';

const VideoPage = () => {
    //  grid grid-cols-1 lg:grid-cols-cards_filter
    const [open, setOpen] = useState(false)

    return (
        <div className='w-full '>
            <div className='mt-1 flex justify-end'>
                {
                    open ? (
                        <button onClick={() => setOpen(false)}
                                className='top-0 right-0 fixed z-50 '
                        >
                            <img className='invert w-[30px] h-[30px]' src={closeIcon} alt='close'/>
                        </button>
                    ) : null
                }
                <button type='button' onClick={() => setOpen(true)}
                        className='lg:hidden px-3 py-1 border border-solid rounded-lg'
                >
                    Фильтры
                </button>
            </div>
            <div className='flex gap-7 pt-3 px-5'>
                <CardContainer/>
                <FilterSide open={open}/>
            </div>
        </div>
    );
};

export default VideoPage;