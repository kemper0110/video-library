import FilterBlock from "./FilterBlock.tsx";

const RatingItem = ({name, value, set}: {
    name: string,
    value: number | null,
    set: (value: number) => void
}) => (
    <li className='pl-1 flex items-center'>
        <label className='flex items-center gap-2'>
            {value}+
            <input type="range"
                   autoComplete='off'
                   min={6} max={8} step={1}
                   onPointerUp={e => set(Number.parseInt(e.currentTarget.value))}
                   onChange={e => set(Number.parseInt(e.currentTarget.value))}
                   value={value || 0}
                   name={name}
            />
        </label>
    </li>
)

const RatingFilter = ({value, onChange}: {
    value: number | null,
    onChange: (value: number) => void
}) => {
    return (
        <FilterBlock title='Рейтинг'>
            <RatingItem name='rating' value={value} set={onChange}/>
        </FilterBlock>
    );
};

export default RatingFilter;