const Headline = ({title}: { title: string }) => {
    return (
        <h4 className='bg-headline_bg border-l-8 border-headline_border pl-2 py-0.5 font-medium text-lg'>{title}</h4>
    );
};

export default Headline;