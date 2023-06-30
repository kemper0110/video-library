import {useQuery} from "@tanstack/react-query";
import {getOneVideo} from "../video/videoApi.ts";

const useVideoQuery = (video_id: number) => (
    useQuery(["video", video_id], () => getOneVideo(video_id), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 360_000
    })
)

export default useVideoQuery