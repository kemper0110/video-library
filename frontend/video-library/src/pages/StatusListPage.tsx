import {StatusModel} from "../features/statusList/statusApi.ts";
import ScreenSpinner from "../components/ScreenSpinner.tsx";
import StatusList, {StatusInfo} from "../features/statusList/StatusList.tsx";
import useStatuses from "../features/queries/useStatuses.tsx";


type GrouppedStatuses = {
    // [K in keyof StateModel]: StatusModel[]
    PLANNED: StatusModel[]
    WATCHING: StatusModel[]
    WATCHED: StatusModel[]
    ABANDONED: StatusModel[]
}

function groupStatuses(statuses: StatusModel[]): GrouppedStatuses {
    const groupped: GrouppedStatuses = {
        PLANNED: [],
        ABANDONED: [],
        WATCHED: [],
        WATCHING: []
    }
    for (const status of statuses)
        groupped[status.state].push(status)
    return groupped
}


function getInfo(statuses: StatusModel[]): StatusInfo {
    return statuses.reduce((prev, cur) => {
        if (cur.video_type === "season")
            ++prev.seasons
        else if (cur.video_type === "movie")
            ++prev.movies
        return prev
    }, {
        movies: 0,
        seasons: 0
    } as StatusInfo)
}


const StatusListPage = () => {
    const {data, isLoading, isError} = useStatuses()
    if (isLoading)
        return <ScreenSpinner/>
    if (isError)
        return <div>Ошибка загрузки списка статусов</div>
    const groupped = groupStatuses(data)
    return (
        <div className='px-4 py-5 w-full max-w-[1024px] mx-auto flex flex-col gap-10'>
            <StatusList state='PLANNED' statuses={groupped.PLANNED} statusInfo={getInfo(groupped.PLANNED)}/>
            <StatusList state='WATCHING' statuses={groupped.WATCHING} statusInfo={getInfo(groupped.WATCHING)}/>
            <StatusList state='WATCHED' statuses={groupped.WATCHED} statusInfo={getInfo(groupped.WATCHED)}/>
            <StatusList state='ABANDONED' statuses={groupped.ABANDONED} statusInfo={getInfo(groupped.ABANDONED)}/>
        </div>
    );
};


export default StatusListPage;