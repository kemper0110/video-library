import React from 'react';
import {Link} from "react-router-dom";
import RatingCell from "./RatingCell.tsx";
import EpisodeCell from "./EpisodeCell.tsx";
import VideoTypeCell from "./VideoTypeCell.tsx";
import {StatusModel} from "./statusApi.ts";

const StatusRow = ({status, id}: { status: StatusModel, id: number }) => {
    const onDragStart = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.dataTransfer.setData("application/json", JSON.stringify(status))
        e.dataTransfer.effectAllowed = "move"
    }

    return (
        <tr className='hover:bg-slate-100' draggable={true} onDragStart={onDragStart}>
            <td className='w-min text-center text-secondary_column px-0.5 py-1'>{id}</td>
            <td className='px-3 py-1 w-full'>
                <Link draggable={false} className='max-w-full  text-link whitespace-nowrap line-clamp-1 overflow-hidden text-ellipsis' to={`/video/${status.video_id}`}>{status.video_name}</Link>
            </td>
            <RatingCell {...status}/>
            <EpisodeCell {...status}/>
            <VideoTypeCell {...status}/>
        </tr>
    );
};

export default StatusRow;