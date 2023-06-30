import Label from "./Label.tsx";
import React, {useId} from "react";


interface TypeSelectorProps extends React.InputHTMLAttributes<HTMLSelectElement> {

}

const TypeSelector = ({...selectProps}: TypeSelectorProps) => {
    const id = useId()
    return (
        <div className='flex flex-col' >
            <Label htmlFor={id} title={'Тип'}/>
            <select id={id} className='bg-white border-2 border-gray-300 rounded-lg px-3 py-2'
                    {...selectProps}
                name='type'
            >
                <option value='season'>Сериал</option>
                <option value='movie'>Фильм</option>
            </select>
        </div>
    );
};

export default TypeSelector;