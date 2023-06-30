import {useQuery} from "@tanstack/react-query";
import {getAllStudios} from "../studioApi.ts";

const useStudiosQuery = () => (
    useQuery(["studios"], getAllStudios, {
        keepPreviousData: true,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 360_000
    })
)
export default useStudiosQuery