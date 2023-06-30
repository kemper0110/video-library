import Label from "./Label.tsx";
import React, {useId} from "react";
import useStudiosQuery from "./queries/useStudioQuery.tsx";

interface StudioSelectorProps extends React.InputHTMLAttributes<HTMLSelectElement> {

}

const StudioSelector = ({...selectProps}: StudioSelectorProps) => {
    const {data, isLoading, isError} = useStudiosQuery()
    const id = useId();

    if (isLoading)
        return <>Studios loading</>
    if (isError)
        return <>Studio error</>

    return (
        <div className='flex flex-col'>
            <Label htmlFor={id} title='Студия'/>
            <select className='bg-white border-2 border-gray-300 rounded-lg px-3 py-2'
                    value={0}
                    {...selectProps}
                name='studio'
            >
                {
                    data.map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                }
            </select>
        </div>
    );
};

export default StudioSelector;