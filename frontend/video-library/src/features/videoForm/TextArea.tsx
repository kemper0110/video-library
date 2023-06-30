import React, {useId} from "react";
import Label from "./Label.tsx";
import {twMerge} from "tailwind-merge";

export interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    title: string
}


export const TextArea = ({title, className, ...textareaProps}: TextAreaProps) => {
    const id = useId();
    return (
        <div className='flex flex-col'>
            <Label htmlFor={id} title={title}/>
            <textarea id={id} {...textareaProps}
                rows={12}
                      className={twMerge('bg-white border-2 border-gray-300 rounded-lg px-3 py-1.5', className)}
            />
        </div>
    )
}