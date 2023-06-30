import {useEffect, useState} from "react";
import VideoService from "../api/VideoService";
import GenreService from "../api/GenreService";
import StudioService from "../api/StudioService";


const VideoForm = ({
                       videoform = {
                           id: null,
                           name: "",
                           type: "season",
                           description: "",
                           rating: "",
                           episodes: "",
                           genres: new Set(),
                           image: "null.jpg",
                           studio: ""
                       }
                   }) => {
    const [genres, setGenres] = useState([
        {name: "1", id: 1},
        {name: "2", id: 2},
        {name: "3", id: 3},
        {name: "4", id: 4},
    ])
    const [studios, setStudios] = useState([]);
    const [form, setForm] = useState(videoform);
    const [genreSelected, setGenreSelected] = useState("");


    // fetch genres
    // useEffect(() => {
    //     GenreService.getAll().then(res => {
    //         const genres = res.data;
    //         setGenres(genres);
    //         setGenreSelected(genres[0].name);
    //     });
    // }, []);
    // fetch studios
    // useEffect(() => {
    //     StudioService.getAll().then(res => {
    //         const studios = res.data;
    //         setStudios(studios);
    //         setForm(form => {
    //             return {...form, studio: studios[0].name};
    //         });
    //     });
    // }, []);

    const onFormChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onSubmit = () => {
        const video = {
            id: form.id,
            type: form.type,
            name: form.name,
            description: form.description,
            rating: form.rating,
            image: form.image,
            episodes: form.episodes,
            studio: {
                id: studios.find(studio => studio.name === form.studio).id,
            },
            genres:
                Array.from(form.genres).map(genre_name => {
                        return {
                            id: genres.find(genre => genre.name === genre_name).id
                        };
                    }
                )
        };
        console.log(JSON.stringify(video));
        VideoService.add(video).then(res => {
            // if(res.status === 200)
            //     alert.success("Видео успешно добавлено")
            // else
            //     alert.error("Ошибка добавления видео")
        });
    };

    const onGenreSelect = e => {
        setGenreSelected(e.target.value);
    };
    const onGenreAdd = () => {
        form.genres.add(genreSelected);
        setForm({...form});
    };
    const onGenreDelete = e => {
        form.genres.delete(e.target.name);
        setForm({...form});
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text">Название видео</span>
                <input type="text" className="form-control"
                       name="name" value={form.name} onChange={onFormChange}/>
            </div>
            <div className="input-group mb-3" style={{minHeight: 150}}>
                <span className="input-group-text">Описание</span>
                <textarea className="form-control"
                       name="description" value={form.description} onChange={onFormChange}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="typeSelect">Тип</label>
                <select className="form-select" id="typeSelect"
                        name="type" value={form.type} onChange={onFormChange}>
                    <option value="season" name="season">Сезон</option>
                    <option value="movie" name="movie">Фильм</option>
                    <option value="clip" name="clip">Клип</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="typeSelect">Студия</label>
                <select className="form-select" id="typeSelect"
                        name="studio" value={form.studio} onChange={onFormChange}>
                    {
                        studios.map(studio => <option key={studio.id} value={studio.name}
                                                      name={studio.name}>{studio.name}</option>)
                    }
                </select>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Рейтинг</span>
                <input type="number" className="form-control"
                       name="rating" value={form.rating} onChange={onFormChange}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Количество эпизодов</span>
                <input type="number" className="form-control"
                       name="episodes" value={form.episodes} onChange={onFormChange}/>
            </div>


            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="genreSelect">Жанр</label>
                <button onClick={onGenreAdd} className="btn btn-outline-secondary" type="button">Добавить</button>
                <select className="form-select" id="genreSelect"
                        name="type" value={genreSelected} onChange={onGenreSelect}>
                    {
                        genres.map(genre => <option key={genre.id} value={genre.name}
                                                    name={genre.name}>{genre.name}</option>)
                    }
                </select>
            </div>
            <div className="d-flex justify-content-center">
                {
                    Array.from(form.genres).map(
                        genre => <button className="m-1 p-2 btn btn-outline-secondary" onClick={onGenreDelete}
                                         name={genre} key={genre}>{genre}</button>
                    )
                }
            </div>

            <button className="btn btn-lg btn-primary" onClick={onSubmit}>Добавить видео</button>
        </>
    );
};

export default VideoForm;


