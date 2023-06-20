import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import Type from "./Type";
import Genres from "./Genres";
import Rating from "./Rating";


// hardcoded
const filtersFromSearchParams = params => {
    return {
        type: new Set(params.getAll("type")),
        genre: new Set(params.getAll("genre").map(Number)),
        rating: new Set(params.getAll("rating")),
    };
};
const searchParamsFromFilters = filters => {
    const params = new URLSearchParams();
    for (const key in filters)
        for (const element of filters[key])
            params.append(key, element);
    console.log(params.toString());
    return params;
};

const FilterSide = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(filtersFromSearchParams(searchParams));

    const handleChange = filterName => {
        return value => {
            const new_filters = {...filters, [filterName]: value};
            console.log(JSON.stringify(new_filters));
            setFilters(new_filters);
            setSearchParams(searchParamsFromFilters(new_filters));
        };
    };

    return (
        <aside style={{width: "20%", float: "left"}}>
            <Type value={filters.type} onChange={handleChange("type")}/>
            <Rating value={filters.rating} onChange={handleChange("rating")}/>
            <Genres value={filters.genre} onChange={handleChange("genre")}/>
        </aside>
    );
}


export default FilterSide;