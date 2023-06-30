import {useMutation, useQueryClient} from "@tanstack/react-query";
import {setStatusRating, StatusModel} from "../statusApi.ts";

const useRatingMutation = (video_id: number) => {
    const client = useQueryClient();
    return useMutation(
        (value: number) => setStatusRating(video_id, value),
        {
            onMutate: async (newrating) => {
                await client.cancelQueries({queryKey: ["status"]})
                const previousStatuses = client.getQueryData(['status'])
                client.setQueryData(['status'], (oldData) => {
                    const data = oldData as StatusModel[]
                    return data.map(s => s.video_id !== video_id ? s : {
                        ...s, rating: newrating
                    } as StatusModel)
                })
                return {previousStatuses}
            },
            onError: (_error, _rating, context) => {
                // console.log("error setRating")
                client.setQueryData(['status'], context?.previousStatuses)
            },
            onSuccess: () => {
                // console.log("success setRating")
            },
            onSettled: () => {
                // client.invalidateQueries(["status"])
            }
        })
};

export default useRatingMutation;