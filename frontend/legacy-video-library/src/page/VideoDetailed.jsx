import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Info from "../component/VideoDetailed/Info";
import Description from "../component/VideoDetailed/Description";
import Studio from "../component/VideoDetailed/Studio";
import {delocalizeStatus, localizeStatus} from "../util/status";
import {ROLE} from "../model/user";
import {useUser} from "../store/user";
import ImageCutter from "../component/CardContainter/ImageCutter";
import VideoService from "../api/VideoService";
import StatusService from "../api/StatusService";
import ImageService from "../api/ImageRepository";
import CommentService from "../api/CommentService";


const VideoDetailed = () => {
    const {user} = useUser();
    const {id} = useParams();
    const [video, setVideo] = useState(null);
    const [status, setStatus] = useState("DELETE");
    const navigate = useNavigate();

    // fetch video
    useEffect(() => {
        VideoService.getOne(id).then(res => {
            if (res.status !== 200) {
                console.log("video fetching error");
                return;
            }
            setVideo(res.data);
        })
    }, [id]);
    // fetch status
    useEffect(() => {
        StatusService.getByVideo(id).then(res => {
            if (res.status === 200)
                setStatus(res.data.state);
            else if (res.status === 500)
                setStatus("DELETE");
            else
                alert.error("Ошибка получения статуса видео");
        });
    }, [id]);

    const onStatusChange = e => {
        const state = delocalizeStatus(e.target.value);
        setStatus(state);
        if (state === "DELETE") {
            StatusService.deleteStatus(video.id).then(res => {
                // if (res.status === 200)
                //     alert.success("Успешное удаление видео из списка");
                // else
                //     alert.error("Ошибка удаления видео из списка");
            })
        } else {
            StatusService.setStateByVideo(video.id, state).then(res => {
                // if (res.status === 200)
                //     alert.success("Успешное добавление видео в список");
                // else
                //     alert.error("Ошибка добавления видео в список");
            })
        }
    };


    const forModerator = () => {
        const onDelete = () => {
            VideoService.delete(video.id).then(res => {
                if (res.status === 200)
                    navigate("/");
                // else
                //     alert.error("Ошибка удаления видео");
            })
        };
        return (
            <div className="input-group input-group-text mb-3">
                <div>
                    <Link role={"button"} className="btn btn-primary m-1" to={"/video/add/" + video.id}>Обновить
                        информацию</Link>
                </div>
                <div>
                    <button role={"button"} className="btn btn-danger m-1" onClick={onDelete}>Удалить видео</button>
                </div>
                <div>
                    <Link role={"button"} className="btn btn-secondary m-1" to={"/video/update_image/" + video.id}>Обновить
                        изображение</Link>
                </div>
            </div>
        )
    }

    return (video && <>
            <h1>{video.name}</h1>
            <div style={{display: "inline-block", width: "26%"}}>
                <div style={{margin: "5rem 2rem"}}>
                    <ImageCutter maxWidth="30%">
                        <img src={ImageService.getPath(video.image)} alt={video.name}/>
                    </ImageCutter>
                </div>
                {user.role === ROLE.ROLE_MODERATOR ? forModerator() : false}
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="typeSelect">Состояние</label>
                    <select className="form-select" id="typeSelect"
                            name="state" value={localizeStatus(status)} onChange={onStatusChange}>
                        <option value="Запланировано" name="">Запланировано</option>
                        <option value="Просмотрено" name="">Просмотрено</option>
                        <option value="Смотрю" name="">Смотрю</option>
                        <option value="Брошено" name="">Брошено</option>
                        <option value="Отсутствует в списке" name="">Отсутствует в списке</option>
                    </select>
                </div>
            </div>
            <div style={{display: "inline-block", width: "70%", marginLeft: 15}}>
                <div style={{width: "47%"}}>
                    <Info video={video}/>
                </div>
                <hr/>
                <div style={{width: "47%"}}>
                    <Studio studio={video.studio}/>
                </div>
                <hr/>
                <div style={{}}>
                    <Description text={video.description}/>
                </div>
            </div>
            <CommentBlock video_id={id}/>
        </>
    )
}

const CommentBlock = ({video_id}) => {
    const [comments, setComments] = useState([]);


    useEffect(() => {
        CommentService.getAllByVideo(video_id).then(res => {
            if (res.status === 200)
                setComments(res.data);
        });
    }, [video_id]);

    const onCommentAdd = text => {
        CommentService.add(video_id, text).then(res => {
            if (res.status === 200) {
                const comment = res.data;
                setComments(comments => [...comments, comment]);
            }
        })
    };

    return (
        <>
            <h1>Комментарии</h1>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Пользователь</th>
                    <th>Дата</th>
                    <th>Текст</th>
                </tr>
                </thead>
                <tbody>
                <CommentForm onCommentAdd={onCommentAdd}/>
                {
                    comments.map((comment, i) => <Comment key={i} comment={comment}/>)
                }
                </tbody>
            </table>
        </>
    )
}

const Comment = ({comment}) => {


    return (
        <tr>
            <td>
                {comment.user.username}
            </td>
            <td>
                {
                    new Date(Date.parse(comment.date)).toLocaleDateString("ru", {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })
                }
            </td>
            <td>
                {comment.text}
            </td>
        </tr>
    );
}

const CommentForm = ({video_id, onCommentAdd}) => {
    const {user} = useUser();
    const [text, setText] = useState("");

    const onTextChange = e => {
        setText(e.target.value);
    };

    const onSubmit = () => {
        onCommentAdd(text);
        setText("");
    };

    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                <button className="btn btn-primary" onClick={onSubmit}>Добавить</button>
            </td>
            <td>
                <textarea className="form-control m-1" onChange={onTextChange} value={text}/>
            </td>
        </tr>
    );
}

export default VideoDetailed;