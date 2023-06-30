import React, {useId} from "react";
import {twMerge} from "tailwind-merge";
import Label from "./Label.tsx";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string
}

export const Input = ({title, className, ...inputProps}: InputProps) => {
    const id = useId();
    return (
        <div className='flex flex-col'>
            <Label htmlFor={id} title={title}/>
            <input id={id} {...inputProps}
                   className={twMerge('bg-white border-2 border-gray-300 rounded-lg px-3 py-1.5', className)}
            />
        </div>
    )
}