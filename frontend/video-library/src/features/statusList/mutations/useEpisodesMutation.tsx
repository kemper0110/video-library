import {useMutation, useQueryClient} from "@tanstack/react-query";
import {setStatusEpisodes, StatusModel} from "../statusApi.ts";

const useEpisodesMutation = (video_id: number) => {
    const client = useQueryClient();
    return useMutation(
        (value: number) => setStatusEpisodes(video_id, value),
        {
            onMutate: async (newEpisodes) => {
                await client.cancelQueries({queryKey: ["status"]})
                const previousStatuses = client.getQueryData(['status'])
                client.setQueryData(['status'], (oldData) => {
                    const data = oldData as StatusModel[]
                    return data.map(s => s.video_id !== video_id ? s : {
                        ...s, episodes: newEpisodes
                    } as StatusModel)
                })
                return {previousStatuses}
            },
            onError: (_error, _episodes, context) => {
                // console.log("error setEpisodes")
                client.setQueryData(['status'], context?.previousStatuses)
            },
            onSuccess: () => {
                // console.log("success setEpisodes")
            },
            onSettled: () => {
                // client.invalidateQueries(["status"])
            }
        })
};

export default useEpisodesMutation;