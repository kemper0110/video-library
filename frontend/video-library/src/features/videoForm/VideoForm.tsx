import {Input} from "./Input.tsx";
import StudioSelector from "./StudioSelector.tsx";
import TypeSelector from "./TypeSelector.tsx";
import GenreSelector from "./GenreSelector.tsx";
import {TextArea} from "./TextArea.tsx";
import ImageInput from "./ImageInput.tsx";
import {useFormik} from "formik";
import {validateVideoForm, VideoFormModel} from "./form.ts";

const VideoForm = ({initialForm, onSubmit}: { initialForm: VideoFormModel, onSubmit: (form: VideoFormModel) => void }) => {
    const formik = useFormik({
        initialValues: initialForm,
        validate: validateVideoForm,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: (values: VideoFormModel) => {
            onSubmit(values)
        }
    })
    return (
        <form className='p-4 flex flex-col gap-3 border' onSubmit={formik.handleSubmit}>
            <div className='flex gap-3'>
                <Input title='Название' placeholder='Евангелион' name='name'
                       value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                />
                <Input title='Рейтинг' placeholder='9.5' type='number' name='rating'
                       value={formik.values.rating} onChange={formik.handleChange} onBlur={formik.handleBlur}
                />
            </div>
            <div className='flex gap-3'>
                <StudioSelector value={formik.values.studio}
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                />
                <div className='flex gap-3'>
                    <TypeSelector value={formik.values.type}
                                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                    />
                    {
                        formik.values.type === "season" ?
                            <Input title='Количество эпизодов' placeholder='1' type='number' name='episodes' min={0}
                                   onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   value={formik.values.episodes}
                            /> : null
                    }
                </div>
            </div>
            <GenreSelector values={formik.values.genres} setValues={(genres: number[]) => formik.setValues({...formik.values, genres})}/>
            <TextArea title='Описание' maxLength={3000} name='description'
                      placeholder='Уложитесь в 3000 символов'
                      onChange={formik.handleChange} onBlur={formik.handleBlur}
                      value={formik.values.description}
            />
            <ImageInput file={formik.values.image}
                setFile={(file: File) => formik.setValues({...formik.values, image: file})}/>
            <button
                className='rounded-lg bg-blue-200 text-blue-600 text-center py-2.5 px-3 font-semibold hover:bg-blue-300'
                type='submit'
            >
                Отправить
            </button>
        </form>
    );
};

export default VideoForm;