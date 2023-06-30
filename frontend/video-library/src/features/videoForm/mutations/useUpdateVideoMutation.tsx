import {useMutation, useQueryClient} from "@tanstack/react-query";
import {VideoFormModel} from "../form.ts";
import {updateVideo} from "../../video/videoApi.ts";

const useUpdateVideoMutation = () => {
    const client = useQueryClient()
    return useMutation(
        (form: VideoFormModel) => updateVideo(form), {
            onSuccess: () => {
                client.invalidateQueries(['video'])
                console.log("success")
            }
        })
}
export default useUpdateVideoMutation