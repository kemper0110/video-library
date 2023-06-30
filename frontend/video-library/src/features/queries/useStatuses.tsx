import {useQuery} from "@tanstack/react-query";
import {getAllStatuses} from "../statusList/statusApi.ts";

const useStatuses = () => (
    useQuery(["status"], getAllStatuses, {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60_000
    })
)

export default useStatuses