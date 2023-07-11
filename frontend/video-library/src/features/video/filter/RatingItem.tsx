export const RatingItem = ({name, value, set}: {
    name: string,
    value: number,
    set: (value: number) => void
}) => (
    <li className='pl-1 flex items-center'>
        <label className='flex items-center gap-2'>
            {value}+
            <input type="range"
                   className='w-[150px]'
                   autoComplete='off'
                   min={0} max={9} step={1}
                // onPointerUp={e => set(Number.parseInt(e.currentTarget.value))}
                   onChange={e => set(Number.parseInt(e.currentTarget.value))}
                   value={value}
                   name={name}
            />
        </label>
    </li>
)

export default RatingItem
