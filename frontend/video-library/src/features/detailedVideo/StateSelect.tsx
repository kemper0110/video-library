import {useState} from "react";
import {deleteStatus, setStateByVideo, StateModel, StatusModel} from "../statusList/statusApi.ts";
import {VideoDetailedModel} from "../../models/video.ts";
import Spinner from "../../components/Spinner.tsx";
import {localizeState} from "../localize/localise.ts";
import useStatuses from "../queries/useStatuses.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";


export type PartialStatus = Omit<StatusModel, 'state'> & {
    state?: StateModel
}

export const StateLoader = ({video}: { video: VideoDetailedModel }) => {
    const {data, isLoading, isError} = useStatuses()
    if (isLoading)
        return <Spinner/>
    if (isError)
        return <>Ошибка загрузки статуса видео</>
    const status = data.find(s => s.video_id === video.id)
    const status_part: PartialStatus = {
        video_id: video.id,
        video_name: video.name,
        video_type: video.type,
        video_episodes: video.episodes,
        episodes: 0,
        rating: 0,
        state: undefined
    }
    if (status !== undefined)
        return <StateSelect status={status} video_id={video.id}/>
    else
        return <StateSelect status={status_part} video_id={video.id}/>
}

const useChangeStateMutation = (video_id: number, status: PartialStatus) => {
    const client = useQueryClient()
    return useMutation(
        (state?: StateModel) =>
            state ? setStateByVideo(video_id, state) : deleteStatus(video_id),
        {
            onMutate: async (newstate) => {
                await client.cancelQueries({queryKey: ["status"]})
                const previousStatuses = client.getQueryData(['status'])
                client.setQueryData(['status'], (oldData) => {
                    const data = oldData as StatusModel[]
                    // 3 ways to update cache
                    // 0. delete status
                    if (newstate === undefined) {
                        return data.filter(s => s.video_id !== video_id)
                    } else {
                        const idx = data.findIndex(v => v.video_id === video_id)
                        // 1. add new status
                        if (idx === -1)
                            return [...data, {...status, state: newstate} as StatusModel]
                        // 2. change state of existing status
                        else
                            return data.map(s => s.video_id !== video_id ? s :
                                {...s, state: newstate} as StatusModel)
                    }
                })
                return {previousStatuses}
            },
            onError: (_error, _rating, context) => {
                client.setQueryData(["status"], context?.previousStatuses)
            },
            onSettled: () => {
                // client.invalidateQueries(["status"])
            }
        }
    )
}

const StateSelect = ({status, video_id}: { status: PartialStatus, video_id: number }) => {
    const [open, setOpen] = useState(false)
    const [rows, rotate] = open ? ["1fr", "0.25turn"] : ["0fr", "0.5turn"];

    const changeStateMutation = useChangeStateMutation(video_id, status)

    // возможная проблема
    // В кэше ['status'] может появиться ['status', 7]={state:undefined}, который будет отображаться в списках
    const onClick = (newstate?: StateModel) => {
        setOpen(false)
        changeStateMutation.mutate(newstate)
    }
    return (
        <div className='mt-4'>
            <div
                className='bg-[#daf1ff] border-[#bce6ff] border border-l-8 flex justify-between py-1 px-2 items-center'>
                <div className='flex gap-1 text-[#176093] items-center font-bold decoration-2'>
                    <span className='leading-none text-2xl'>+</span>
                    <div className='leading-none hover:underline underline-offset-4'>
                        {
                            status.state === undefined ? "Добавить в список" : localizeState(status.state)
                        }
                    </div>
                </div>
                <button onClick={() => setOpen(state => !state)} className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" className=""
                         style={{
                             width: "1em",
                             height: "1em",
                             verticalAlign: "middle",
                             fill: "currentColor",
                             overflow: "hidden",
                             rotate: rotate
                         }}
                         viewBox="0 0 1024 1024" version="1.1">
                        <path
                            d="M513 257c13.2 0 26 5.7 35.1 15.7l406.7 445.7c7.9 8.7 7.3 22.2-1.4 30.1-8.7 7.9-22.2 7.3-30.1-1.4L516.6 301.5c-2.2-2.4-5-2.4-7.3 0L102.7 747.1c-7.9 8.7-21.4 9.3-30.1 1.4-8.7-7.9-9.3-21.4-1.4-30.1l406.7-445.7c9.1-9.9 21.9-15.7 35.1-15.7z"
                            fill="#4F4F4F"/>
                    </svg>
                </button>
            </div>
            <div className='grid transition-all duration-300' style={{gridTemplateRows: rows}}>
                <div
                    className='border-[#bce6ff] border border-l-8 bg-[#daf1ff] transition-all duration-300 overflow-hidden'>
                    <div onClick={() => onClick(undefined)}
                         className='border-[#bce6ff] border border-t-0 py-1 px-2'>
                        Отсутствует в списке
                    </div>
                    <div onClick={() => onClick("PLANNED")}
                         className='border-[#bce6ff] border py-1 px-2'>
                        Запланировано
                    </div>
                    <div onClick={() => onClick("WATCHED")}
                         className='border-[#bce6ff] border py-1 px-2'>
                        Просмотренно
                    </div>
                    <div onClick={() => onClick("ABANDONED")}
                         className='border-[#bce6ff] border py-1 px-2'>
                        Брошено
                    </div>
                    <div onClick={() => onClick("WATCHING")}
                         className='border-[#bce6ff] border py-1 px-2'>
                        Смотрю
                    </div>
                </div>
            </div>
        </div>
    )
}