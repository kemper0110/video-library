import {useMutation, useQueryClient} from "@tanstack/react-query";
import {setStateByVideo, StateModel, StatusModel} from "../statusApi.ts";

const useChangeStateMutation = (state: StateModel) => {
    const client = useQueryClient()
    return useMutation((video_id: number) => setStateByVideo(video_id, state),
        {
            onMutate: async (video_id) => {
                await client.cancelQueries({queryKey: ["status"]})
                const previousStatuses = client.getQueryData(['status'])
                client.setQueryData(['status'], (oldData) => {
                    const data = oldData as StatusModel[]
                    return data.map(s => s.video_id !== video_id ? s : {
                        ...s, state: state
                    } as StatusModel)
                })
                return {previousStatuses}
            },
            onError: (_error, _rating, context) => {
                client.setQueryData(['status'], context?.previousStatuses)
            },
            onSettled: () => {
                // client.invalidateQueries(["status"])
            }
        }
    )
}

export default useChangeStateMutation