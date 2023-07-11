import React, {useId} from "react";

interface NamedInputWithErrorProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error: string | undefined
}

const NamedInputWithError = ({label, error, ...inputProps}: NamedInputWithErrorProps) => {
    const id = useId();
    return (
        <p className='flex flex-col justify-start w-full mt-5 gap-1'>
            <label htmlFor={id} className='font-medium'>{label}</label>
            <input id={id} className='bg-white/40 px-2 py-3 rounded' {...inputProps}/>
            {
                error ?
                    <em className='text-red-500 text-sm h-[10px]'>{error}</em>
                    : null
            }
        </p>
    )
}
export default NamedInputWithError;