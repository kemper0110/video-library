const Label = ({htmlFor, title}: { htmlFor: string, title: string }) => {
    return (
        <label htmlFor={htmlFor}
               className='font-medium text-lg text-gray-700'
        >
            {title}
        </label>
    )
}

export default Label