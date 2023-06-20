import FilterBlock from "./FilterBlock.tsx";
import FilterItem from "./FilterItem.tsx";

const TypeFilter = ({values, onChange}: {values: Set<string>, onChange: (value: string, checked: boolean) => void}) => {
    return (
        <FilterBlock title='Тип'>
            <FilterItem name='Сериал' value={values.has('season')} set={checked => onChange('season', checked)}/>
            <FilterItem name='Фильм' value={values.has('movie')} set={checked => onChange('movie', checked)}/>
            <FilterItem name='Клип' value={values.has('clip')} set={checked => onChange('clip', checked)}/>
        </FilterBlock>
    );
};

export default TypeFilter;