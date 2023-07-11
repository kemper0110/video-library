// import clsx, {ClassValue} from "clsx";
import {ReactHTML} from "react";
import {ClassNameValue, twMerge} from "tailwind-merge";

const Headline = ({title, className = "", tag: Tag = 'div'}: { title: string, className?: ClassNameValue, tag?: keyof ReactHTML }) => {
    return (
        <Tag className={twMerge(
            'bg-headline_bg border-l-8 border-headline_border pl-2 pr-2 py-0.5 font-medium text-lg text-left',
            className
        )}>{title}</Tag>
    );
};

export default Headline;