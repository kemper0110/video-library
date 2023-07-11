import React from "react";
import Headline from "../../../components/Headline.tsx";

interface FilterBlockProps extends React.InputHTMLAttributes<HTMLUListElement> {
    title: string
}
const FilterBlock = ({title, children, ...ulProps}: FilterBlockProps) => {
    return (
        <figure className='mt-3'>
            <Headline title={title} tag='figcaption'/>
            <ul className='list-none' {...ulProps}>
                {children}
            </ul>
        </figure>
    )
}

export default FilterBlock