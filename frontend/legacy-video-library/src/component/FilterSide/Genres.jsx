import {useEffect, useState} from "react";
import Item from "./Item";
import GenreService from "../../api/GenreService";


const Genres = ({onChange, value = new Set()}) => {
    const [genres, setGenres] = useState([]);

    // fetch genres
    useEffect(() => {
        GenreService.getAll().then(res => setGenres(res.data));
    }, [setGenres]);

    const [genreFilter, setGenreFilter] = useState(value);

    const onGenreChange = genre_id => {
        return checked => {
            if (checked)
                genreFilter.add(genre_id);
            else
                genreFilter.delete(genre_id);
            setGenreFilter(genreFilter);
            onChange(genreFilter);
        };
    };

    return (
        <div>
            <h3>Жанр</h3>
            <ul style={{listStyleType: "none"}}>
                {
                    genres.map(genre =>
                        <Item key={genre.id} name={genre.name} onChange={onGenreChange(genre.id)}
                              value={genreFilter.has(genre.id)}/>
                    )
                }
            </ul>
        </div>
    );
}

export default Genres;