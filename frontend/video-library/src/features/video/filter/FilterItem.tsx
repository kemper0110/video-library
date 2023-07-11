import {useId} from "react";

const FilterItem = ({name, value, set}: {
    name: string,
    value: boolean,
    set: (checked: boolean) => void,
}) => {
    const id = useId()
    return (
        <li className='pl-1 flex items-center'>
            <input id={id}
                autoComplete='off' type="checkbox"
                onChange={e => set(e.target.checked)}
                checked={value}
                name={name}
            />
            <label htmlFor={id} className="ml-2 my-0.5">{name}</label>
        </li>
    );
};

export default FilterItem;