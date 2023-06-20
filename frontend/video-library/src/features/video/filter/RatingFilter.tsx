import FilterBlock from "./FilterBlock.tsx";
import FilterItem from "./FilterItem.tsx";

const RatingFilter = ({values, onChange}: {values: Set<string>, onChange: (value: string, checked: boolean) => void}) => {
    return (
        <FilterBlock title='Рейтинг'>
            <FilterItem name='6+' value={values.has('6')} set={(checked) => onChange('6', checked)}/>
            <FilterItem name='7+' value={values.has('7')} set={(checked) => onChange('7', checked)}/>
            <FilterItem name='8+' value={values.has('8')} set={(checked) => onChange('8', checked)}/>
        </FilterBlock>
    );
};

export default RatingFilter;