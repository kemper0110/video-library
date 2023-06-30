import {addVideo} from "../features/video/videoApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {VideoFormModel} from "../features/videoForm/form.ts";
import VideoForm from "../features/videoForm/VideoForm.tsx";


const VideoAddPage = () => {
    // const navigate = useNavigate()
    const client = useQueryClient()
    const addVideoMutation = useMutation(
        (form: VideoFormModel) => addVideo(form), {
            onSuccess: () => {
                client.invalidateQueries(['video'])
                // navigate("/")
                console.log("success")
            }
        })
    const onSubmit = (values: VideoFormModel) => {
        addVideoMutation.mutate(values)
    }

    const initialForm: VideoFormModel = {
        name: "", rating: 8, studio: 1, type: "season", episodes: 0, genres: [], description: "", image: null
    }

    return <VideoForm initialForm={initialForm} onSubmit={onSubmit}/>
};


export default VideoAddPage;