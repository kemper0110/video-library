import {VideoFormModel} from "./form.ts";
import VideoForm from "./VideoForm.tsx";
import useUpdateVideoMutation from "./mutations/useUpdateVideoMutation.tsx";

const VideoUpdateForm = ({initialForm}: { initialForm: VideoFormModel }) => {
    // const navigate = useNavigate()
    const updateVideoMutation = useUpdateVideoMutation()
    const onSubmit = (form: VideoFormModel) => {
        updateVideoMutation.mutate(form)
    }
    return (
        <VideoForm initialForm={initialForm} onSubmit={onSubmit}/>
    );
};

export default VideoUpdateForm;