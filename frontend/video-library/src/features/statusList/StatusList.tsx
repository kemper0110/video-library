import {StateModel, StatusModel} from "./statusApi.ts";
import Headline from "../../components/Headline.tsx";
import StatusRow from "./StatusRow.tsx";
import React from "react";

import {localizeState} from "../localize/localise.ts";
import useChangeStateMutation from "./mutations/useChangeStateMutation.tsx";


export type StatusInfo = {
    movies: number
    seasons: number
}

export interface StatusListProps {
    state: StateModel
    statusInfo: StatusInfo
    statuses: StatusModel[]
}


const StatusList = ({state, statusInfo, statuses}: StatusListProps) => {
    const changeStateMutation = useChangeStateMutation(state)
    const caption = localizeState(state)

    const onDragOver = (e: React.DragEvent<HTMLTableElement>) => {
        e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.dropEffect = "move"
    }
    const onDragEnter = (e: React.DragEvent<HTMLTableElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const onDragLeave = (e: React.DragEvent<HTMLTableElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const onDrop = (e: React.DragEvent<HTMLTableElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const data = e.dataTransfer.getData("application/json")
        const row = JSON.parse(data) as StatusModel
        if (row.state !== state)
            changeStateMutation.mutate(row.video_id)
        e.dataTransfer.clearData("application/json")
    }

    return (
        <>
            <table className='w-full whitespace-nowrap table-auto'
                   onDrop={onDrop} onDragOver={onDragOver}
                   onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragEnd={onDragLeave}
            >
                <Headline title={caption} tag='caption' className='text-2xl font-semibold py-1.5 px-3'/>
                <thead className=''>
                <tr className='border-b border-table_border'>
                    <th className='text-center text-secondary_column w-min px-3 py-1.5'>#</th>
                    <th className='text-left w-full px-3 py-1.5'>Название</th>
                    <th className='text-center w-min px-3 py-1.5'>Оценка</th>
                    <th className='text-center w-min px-3 py-1.5'>Эпизоды</th>
                    <th className='text-center w-min px-3 py-1.5'>Тип</th>
                </tr>
                </thead>
                <tbody className=''>
                {
                    statuses.map((status, i) =>
                        <StatusRow key={status.video_id + ' ' + (i + 1)} id={i + 1} status={status}/>)
                }
                </tbody>
                <tfoot className=''>
                <tr className=''>
                    <td colSpan={5} className=' text-sm italic'>
                        Сериалы: {statusInfo.seasons} / Фильмы: {statusInfo.movies}
                    </td>
                </tr>
                </tfoot>
            </table>
        </>
    )
}

export default StatusList;