import React, {memo, useEffect, useId, useState} from "react";
import {getImagePath} from "../video/videoApi.ts";


const ImageInput = ({setFile, file}: { file: File | string | null, setFile: (file: File) => void }) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (!files || files.length !== 1)
            return
        const file = files[0]
        if (!file.type.startsWith('image/'))
            return
        setFile(file)
    }
    const id = useId();
    return (
        <div className='flex flex-col'>
            <label htmlFor={id}>
                Выберите изображение для видео
            </label>
            <input id={id} type='file' className={'text-sm text-slate-600 ' +
                'file:px-4 file:py-2 file:mr-2 file:rounded-lg file:border-none ' +
                'file:text-sm file:transition-colors ' +
                'file:bg-gray-200 hover:file:bg-gray-300 '}
                   onChange={onInputChange}
                   multiple={false}
            />
            {
                file ? (
                    <div className='mt-4 rounded-lg'>
                        {
                            file instanceof File ?
                                <UploadedImage file={file}/>
                                : <img src={getImagePath(file)} alt='Предыдущее изображение'/>
                        }
                    </div>
                ) : null
            }
        </div>
    );
};

/*
    Мемоизируем, потому что в useEffect идет загрузка изображения;
    возможно и не долгая, но при каждом изменении формы может быть ощутимо
 */
const UploadedImage = memo(
    ({file}: { file: File }) => {
        const [src, setSrc] = useState<string | null>(null)
        useEffect(() => {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (!e.target) {
                    console.error("target is undefined")
                    return
                }
                const src = e.target.result
                if (!(typeof src === 'string')) {
                    console.error("src is not string: ", typeof src)
                    return
                }
                setSrc(src)
            }
            reader.readAsDataURL(file)
        }, [file])
        return (
            src ? (
                <img src={src} className='rounded-lg' alt='Загруженное изображение'/>
            ) : null
        )
    }
)


export default ImageInput;