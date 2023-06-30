import FilterBlock from "./FilterBlock.tsx";
import FilterItem from "./FilterItem.tsx";
import useGenresQuery from "../../queries/useGenresQuery.tsx";

const GenresFilter = ({values, onChange}: {
    values: Set<number>,
    onChange: (value: number, checked: boolean) => void
}) => {
    const {data, isLoading, isError} = useGenresQuery()
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