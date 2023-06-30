import {getImagePath} from "../video/videoApi.ts";

import {VideoDetailedModel} from "../../models/video.ts";
import useUser from "../../hooks/useUser.tsx";
import {StateLoader} from "./StateSelect.tsx";
import {Link} from "react-router-dom";

// TODO: banner max-w-[225px]

const ManageVideo = ({video}: { video: VideoDetailedModel }) => {
    const user = useUser(state => state.user)
    return (
        <div className='grid-in-img bg-white'>
            <div>
                <img src={getImagePath(video.image)} alt={video.name}/>
            </div>
            {
                {
                    "UNAUTHORIZED": () => <UnauthorizedManage/>,
                    "ROLE_USER": () => <UserManage video={video}/>,
                    "ROLE_MODERATOR": () => <ModeratorManage video={video}/>
                }[user.role]()
            }
        </div>
    )
}

const UnauthorizedManage = () => (
    <div className={'mt-2 max-w-[225px] text-sm bg-yellow-100 px-3 py-1' +
        ' border-2 border-yellow-200'}>Вы можете запланировать просмотр видео,
        контролировать количество просмотренных серий и много еще чего, если зарегистрируетесь на
        Сервисе</div>
)

const UserManage = ({video}: { video: VideoDetailedModel }) => (
    <StateLoader video={video}/>
)

const ModeratorManage = ({video}: { video: VideoDetailedModel }) => (
    <div className='flex flex-col mt-3'>
        <Link to={`/video-update/${video.id}`}
              className={'bg-yellow-100 font-medium text-lg text-slate-600 px-3 py-1.5 text-center ' +
                  'border-2 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-300'}>
            Обновить
        </Link>
        <StateLoader video={video}/>
    </div>
)

export default ManageVideo;