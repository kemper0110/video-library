const FilterItem = ({name, value, set}: {
    name: string,
    value: boolean,
    set: (checked: boolean) => void,
}) => {
    return (
        <li className='pl-1 flex items-center'>
            <input
                autoComplete='off' type="checkbox"
                onChange={e => set(e.target.checked)}
                checked={value}
                name={name}
            />
            <span className="ml-2 my-0.5">{name}</span>
        </li>
    );
};

export default FilterItem;