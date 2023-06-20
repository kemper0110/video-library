import FilterBlock from "./FilterBlock.tsx";
import {getAllGenres} from "./filterApi.ts";
import {useQuery} from "@tanstack/react-query";
import FilterItem from "./FilterItem.tsx";

const GenresFilter = ({values, onChange}: {
    values: Set<number>,
    onChange: (value: number, checked: boolean) => void
}) => {
    const {data, isLoading, isError} = useQuery(["genres"], getAllGenres, {
        keepPreviousData: true
    })
    if (isLoading)
        return <FilterBlock title='Жанры'/>
    if (isError)
        return <span>Ошибка загрузки списка жанров</span>
    return (
        <FilterBlock title='Жанры'>
            {
                data.map(genre => <FilterItem key={genre.id} name={genre.name} value={values.has(genre.id)}
                                              set={checked => onChange(genre.id, checked)}/>)
            }
        </FilterBlock>
    );
};

export default GenresFilter;