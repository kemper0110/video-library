const SlidingInput = () => {
    return (
        <div className='relative align-top border'>
            <input type='text' className='w-full h-[40px] py-1 px-3 peer' required/>
            <label className={'absolute pointer-events-none left-3 right-3 top-0 ' +
                'whitespace-nowrap overflow-hidden leading-10 transition-all duration-200 ' +
                'peer-focus:-top-3 peer-focus:text-[10px] ' +
                'peer-[&:not(:focus):valid]:-top-3 peer-[&:not(:focus):valid]:text-[10px] '
            }>
                Placeholder
            </label>
        </div>
    )
}
export default SlidingInput