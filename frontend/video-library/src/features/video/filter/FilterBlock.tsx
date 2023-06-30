import React from "react";
import Headline from "../../../components/Headline.tsx";

interface FilterBlockProps extends React.InputHTMLAttributes<HTMLUListElement> {
    title: string
}
const FilterBlock = ({title, children, ...ulProps}: FilterBlockProps) => {
    return (
        <div className='mt-3'>
            <Headline title={title}/>
            <ul className='list-none' {...ulProps}>
                {children}
            </ul>
        </div>
    )
}

export default FilterBlock