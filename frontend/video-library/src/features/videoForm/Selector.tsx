import React, {useId} from "react";
import Label from "./Label.tsx";

export interface OptionProps extends React.InputHTMLAttributes<HTMLOptionElement> {
    
}

export const Option = ({text}: { text: string }) => {
    return (
        <option className='bg-white py-2 px-3'>{text}</option>
    )
}


export interface SelectorProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    title: string
}

const Selector = ({title, children, ...selectProps}: SelectorProps) => {
    const id = useId();
    return (
        <div className='flex flex-col'>
            <Label htmlFor={id} title={title}/>
            <select id={id} className='bg-white border-2 border-gray-300 rounded-lg px-3 py-2'
                    {...selectProps}>
                {children}
            </select>
        </div>
    )
}

export default Selector