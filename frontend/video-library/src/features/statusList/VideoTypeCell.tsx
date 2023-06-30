import {VideoTypeModel} from "../../models/video.ts";
import {localizeVideoType} from "../localize/localise.ts";

interface VideoTypeCellProps {
    video_type: VideoTypeModel
}

const VideoTypeCell = ({video_type}: VideoTypeCellProps) => {
    return (
        <td className='w-min px-3 py-1'>
            {localizeVideoType(video_type)}
        </td>
    );
};

export default VideoTypeCell;