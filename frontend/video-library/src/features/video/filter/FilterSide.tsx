import {useEffect, useReducer} from "react";
import {useSearchParams} from "react-router-dom";
import TypeFilter from "./TypeFilter.tsx";
import RatingFilter from "./RatingFilter.tsx";
import GenresFilter from "./GenresFilter.tsx";

type State = {
    type: Set<string>
    genre: Set<number>
    rating: Set<string>
}

// type Actions = {
//     addType: (type: string) => void
//     removeType: (type: string) => void
//     addGenre: (genre: number) => void
//     removeGenre: (genre: number) => void
//     addRating: (rating: string) => void
//     removeRating: (rating: string) => void
// }
//
// const useFilterStore = create(
//     immer<State & Actions>((set) => ({
//         type: new Set<string>(),
//         genre: new Set<number>(),
//         rating: new Set<string>(),
//         addType: (type: string) => set(state => {
//             state.type.add(type)
//         }),
//         removeType: (type: string) => set(state => {
//             state.type.delete(type)
//         }),
//         addGenre: (genre: number) => set(state => {
//             state.genre.add(genre)
//         }),
//         removeGenre: (genre: number) => set(state => {
//             state.genre.delete(genre)
//         }),
//         addRating: (rating: string) => set(state => {
//             state.rating.add(rating)
//         }),
//         removeRating: (rating: string) => set(state => {
//             state.rating.delete(rating)
//         }),
//     }))
// )

const filtersFromSearchParams = (params: URLSearchParams) => {
    const state: State = {
        type: new Set(params.getAll("type")),
        genre: new Set(params.getAll("genre").map(Number)),
        rating: new Set(params.getAll("rating")),
    }
    console.log("from url", state)
    return state;
};

const searchParamsFromFilters = (filters: Readonly<State>) => {
    console.log("state", filters)
    const params = new URLSearchParams();
    for (const key in filters)
        { // @ts-ignore
            for (const element of filters[key])
                        params.append(key, element);
        }
    // params.append("type", filters.type)
    // params.append("genre", JSON.stringify(filters.genre))
    // params.append("rating", filters.rating)
    console.log(params.toString());
    return params;
};

type TypeAction = {
    type: "setType"
    checked: boolean
    value: string
}
type GenreAction = {
    type: "setGenre"
    checked: boolean
    value: number
}
type RatingAction = {
    type: "setRating"
    checked: boolean
    value: string
}

type Action = TypeAction | GenreAction | RatingAction
function reducer(state: State, action: Action): State {
    // mutable logic
    switch (action.type) {
        case "setType": {
            // const newset = new Set(state.type)
            // newset[action.checked ? "add" : "delete"](action.value)
            // return {...state, type: newset}
            state.type[action.checked ? "add" : "delete"](action.value)
            return {...state}
        }
        case "setGenre": {
            // const newset = new Set(state.genre)
            // newset[action.checked ? "add" : "delete"](action.value)
            // return {...state, genre: newset}
            state.genre[action.checked ? "add" : "delete"](action.value)
            return {...state}
        }
        case "setRating": {
            // const newset = new Set(state.rating)
            // newset[action.checked ? "add" : "delete"](action.value)
            // return {...state, rating: newset}
            state.rating[action.checked ? "add" : "delete"](action.value)
            return {...state}
        }
    }
    return state
}

const FilterSide = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const stateRef = useMemo(() => filtersFromSearchParams(searchParams), [])
    const [state, dispatch] = useReducer(reducer, searchParams, filtersFromSearchParams)
    console.log("rendered", state)
    useEffect(() => {
        setSearchParams(searchParamsFromFilters(state));
        console.log("updated")
    }, [state])
    // // const [filters, setFilters] = useState(filtersFromSearchParams(searchParams));
    // const handleChange = (filterName: string) => {
    //     return (value: string | number) => {
    //         const new_filters = {...filters, [filterName]: value};
    //         console.log(JSON.stringify(new_filters));
    //         setFilters(new_filters);
    //         setSearchParams(searchParamsFromFilters(new_filters));
    //     };
    // };
    return (
        <div className='h-[900px] bg-blue-50 hidden lg:block'>
            <TypeFilter values={state.type}
                        onChange={(value, checked) => {
                            dispatch({type: "setType", checked, value})
                        }}/>
            <RatingFilter values={state.rating}
                          onChange={(value, checked) => {
                              dispatch({type: "setRating", checked, value})
                          }}/>
            <GenresFilter values={state.genre}
                          onChange={(value, checked) => {
                              dispatch({type: "setGenre", checked, value})
                          }}/>
        </div>
    );
};


export default FilterSide;