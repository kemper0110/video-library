import useVideoQuery from "../../queries/useVideoQuery.tsx";

export interface VideoDialogProps {
    video_id: number
    cardRect: DOMRect
}

const VideoDialog = ({video_id, cardRect}: VideoDialogProps) => {
    const {data, isLoading, isError} = useVideoQuery(video_id)
    if (isLoading)
        return <></>
    if (isError)
        return <></>
    const cb = (dialog: HTMLDialogElement | null) => {
        if (dialog === null)
            return
        // console.log("card", cardRect.top + window.scrollY)
        // let top = cardRect.top + cardRect.height
        let left = cardRect.left + cardRect.width
        // if(top + dialog.offsetHeight > window.innerHeight)
        //     top = cardRect.top - dialog.offsetHeight
        if (left + dialog.offsetWidth > window.innerWidth)
            left = cardRect.left - dialog.offsetWidth
        // dialog.style.top = top + 'px'
        dialog.style.left = left + 'px'
    }
    // name, description part, type, studio, episodes, genres
    return (
        <dialog className='w-[400px] m-0 absolute shadow-2xl shadow-black/50 border border-black' open
                ref={cb}
        >
            {
                // isLoading ? (
                //     <ScreenSpinner/>
                //     )
                //     :
                (
                    <>
                        <h2 className='text-blue-600 font-semibold text-lg'>
                            {data.name}
                        </h2>
                        <p className='line-clamp-3 mt-3'>
                            {data.description}
                        </p>
                        <p className='mt-1'>
                            <span className='font-medium'>Тип: </span>
                            <span className=''>{data.type}</span>
                        </p>
                        <p className='mt-1'>
                            <span className='font-medium'>Студия: </span>
                            <span className=''>{data.studio.name}</span>
                        </p>
                        {
                            data.type === "season" ?
                                <p className='mt-1'>
                                    <span className='font-medium'>Эпизоды: </span>
                                    <span className=''>{data.episodes}</span>
                                </p> : null
                        }
                        <p className='mt-1'>
                            <span className='font-medium'>Жанры: </span>
                            <span className='inline-flex gap-1 flex-wrap'>
                                {data.genres.map(g => <span className=''>{g.name}</span>)}
                            </span>
                        </p>
                    </>
                )
            }
        </dialog>
    );
};

export default VideoDialog;