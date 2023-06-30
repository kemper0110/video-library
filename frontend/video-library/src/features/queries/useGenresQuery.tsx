import {useQuery} from "@tanstack/react-query";
import {getAllGenres} from "../video/filter/filterApi.ts";

const useGenresQuery = () => (
    useQuery(['genres'], getAllGenres, {
        keepPreviousData: true,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 360_000
    })
)
export default useGenresQuery