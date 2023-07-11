import {useEffect, useReducer} from "react";
import {useSearchParams} from "react-router-dom";
import {RatingItem} from "./RatingItem.tsx";
import GenresFilter from "./GenresFilter.tsx";
import {VideoTypeModel} from "../../../models/video.ts";
import FilterBlock from "./FilterBlock.tsx";
import FilterItem from "./FilterItem.tsx";

type State = {
    type: Set<VideoTypeModel>
    genre: Set<number>
    rating: number
}
//
// type Actions = {
//     setType: (type: VideoTypeModel, checked: boolean) => void
//     setGenre: (genre: number, checked: boolean) => void
//     setRating: (rating: number) => void
// }
//
// const useFilterStore = create<State & Actions>(
//     set => ({
//         type: new Set<VideoTypeModel>(),
//         genre: new Set<number>(),
//         rating: null,
//         setGenre: (genre: number, checked: boolean) => set(state => {
//             state.genre[checked ? "add" : "delete"](genre)
//             return {...state}
//         }),
//         setRating: (rating: number) => set(state => {
//             return {...state, rating: rating}
//         }),
//         setType: (type: VideoTypeModel, checked: boolean) => set(state => {
//             state.type[checked ? "add" : "delete"](type)
//             return ({...state})
//         }),
//     })
// )

const filtersFromSearchParams = (params: URLSearchParams) => {
    const state: State = {
        type: new Set<VideoTypeModel>(params.getAll("type") as VideoTypeModel[]),
        genre: new Set(params.getAll("genre").map(Number)),
        rating: Number.parseInt(params.get('rating') || "0"),
    }
    // console.log("from url", state)
    return state;
};

const searchParamsFromFilters = (filters: Readonly<State>) => {
    console.log("state", filters)
    const params = new URLSearchParams();
    for (const element of filters.type)
        params.append("type", element)
    for (const element of filters.genre)
        params.append("genre", String(element))
    if (filters.rating !== 0)
        params.append("rating", String(filters.rating))
    // console.log(params.toString());
    return params;
};

type TypeAction = {
    type: "setType"
    checked: boolean
    value: VideoTypeModel
}
type GenreAction = {
    type: "setGenre"
    checked: boolean
    value: number
}
type RatingAction = {
    type: "setRating"
    value: number
}

type Action = TypeAction | GenreAction | RatingAction

function reducer(state: State, action: Action): State {
    // mutable logic
    switch (action.type) {
        case "setType":
            state.type[action.checked ? "add" : "delete"](action.value)
            return {...state}
        case "setGenre":
            state.genre[action.checked ? "add" : "delete"](action.value)
            return {...state}
        case "setRating":
            state.rating = action.value
            return {...state}
    }
    return state
}

const FilterSide = ({open}: {open: boolean}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, dispatch] = useReducer(reducer, searchParams, filtersFromSearchParams)
    useEffect(() => {
        setSearchParams(searchParamsFromFilters(state));
    }, [setSearchParams, state])
    return (
        <aside className={`lg:static lg:pt-0 lg:visible lg:max-w-[200px] pt-4 fixed w-full h-full top-0 bg-white z-40 transition-all ${
            open ? "right-0 visible" : "right-[-100vw] invisible"
        }`}>
            <FilterBlock title='Тип'>
                <FilterItem name='Сериал' value={state.type.has('season')} set={checked =>
                    dispatch({type: "setType", checked, value: "season"})
                }/>
                <FilterItem name='Фильм' value={state.type.has('movie')} set={checked =>
                    dispatch({type: "setType", checked, value: "movie"})
                }/>
            </FilterBlock>
            <FilterBlock title='Рейтинг'>
                <RatingItem name='rating' value={state.rating} set={(value: number) =>
                    dispatch({type: "setRating", value})
                }/>
            </FilterBlock>
            <GenresFilter values={state.genre}
                          onChange={(value, checked) => {
                              dispatch({type: "setGenre", checked, value})
                          }}/>
        </aside>
    );
};


export default FilterSide;