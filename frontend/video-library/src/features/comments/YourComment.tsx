import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addComment} from "./commentApi.ts";
import Headline from "../../components/Headline.tsx";
import {useState} from "react";

const YourComment = ({video_id}: { video_id: number }) => {
    const [text, setText] = useState("")
    const client = useQueryClient();
    const addCommentMutation = useMutation((text: string) => addComment(video_id, text),
        {
            onSuccess: () => {
                client.invalidateQueries(["comment", video_id])
            }
        }
    )
    const onClick = () => {
        addCommentMutation.mutate(text)
        setText("")
    };
    return (
        <div className='mt-3'>
            <Headline title='Твой комментарий'/>
            <div>
                <textarea
                    className='w-full resize-none h-[80px] px-3 py-2 border'
                    placeholder='Текст комментария'
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div className='flex gap-5 mt-3'>
                <button className='px-3 py-1 bg-blue-950 text-white' onClick={onClick}>Написать</button>
                <button className='px-3 py-1 bg-blue-950 text-white hidden' >Предпросмотр</button>
            </div>
        </div>
    )
}
export default YourComment;