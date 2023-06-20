import {useEffect, useMemo, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useParams} from "react-router-dom";
import VideoService from "../api/VideoService";
import ImageService from "../api/ImageRepository";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const UpdateImage = () => {
    const {id} = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        VideoService.getOne(id).then(res => setVideo(res.data));
    }, [id]);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        multiple: false,
        accept: {
            'image/*': ['.jpeg', '.jpg']
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    const updateImage = () => {
        ImageService.upload(id, acceptedFiles[0]).then(res => {
            // if(res.status === 200)
            //     alert.success("Изображение успешно загружено")
            // else
            //     alert.error("Ошибка загрузки изображения")
        })
    };

    return (
        <>
            {
                video === null ? <h3>Загрузка информации о видео</h3> :
                    <div>
                        <div className="container">
                            <div {...getRootProps({style})}>
                                <input {...getInputProps()} />
                                <p>Перетащите файл с изображением</p>
                            </div>
                            {
                                acceptedFiles && acceptedFiles.length !== 0 && <>
                                    <h4>Файл: {acceptedFiles[0].path} - {acceptedFiles[0].size} bytes</h4>
                                    <button className="btn btn-primary" onClick={updateImage}>Обновить изображение</button>
                                </>
                            }
                        </div>
                    </div>
            }
        </>
    )
};

export default UpdateImage;