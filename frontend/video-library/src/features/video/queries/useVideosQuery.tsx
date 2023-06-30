import {useQuery} from "@tanstack/react-query";
import {getAllVideo} from "../videoApi.ts";

const useVideosQuery = (searchParams: string) => (
    useQuery(['videos', searchParams], () => getAllVideo(searchParams), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        keepPreviousData: true,
        staleTime: 60_000,
    })
)
export default useVideosQuery