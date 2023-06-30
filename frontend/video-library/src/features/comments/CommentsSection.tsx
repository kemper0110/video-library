import Headline from "../../components/Headline.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllByVideo, PreviewCommentModel} from "./commentApi.ts";
import ScreenSpinner from "../../components/ScreenSpinner.tsx";

const CommentsSection = ({video_id}: { video_id: number }) => {
    const {data, isLoading, isError} = useQuery(["comment", video_id],
        () => getAllByVideo(video_id), {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            staleTime: 30_000
        })
    if (isLoading)
        return <ScreenSpinner/>
    if (isError)
        return <div>Ошибка загрузки комментариев</div>
    return (
        <div className=''>
            <Headline title={`Комментарии (${data.length})`}/>
            <div className='flex flex-col divide-y border'>
                {
                    data.map(comment => <Comment key={comment.username + ' ' + comment.date} comment={comment}/>)
                }
            </div>
        </div>
    );
};

const Comment = ({comment}: { comment: PreviewCommentModel }) => {
    return (
        <div className='flex flex-col items-start p-3'>
            <div className='flex gap-2 items-center'>
                <div className=''>
                    {comment.username}
                </div>
                <div className='text-sm'>
                    {comment.date.toString()}
                </div>
            </div>
            <div>
                {comment.text}
            </div>
        </div>
    )
}


export default CommentsSection;