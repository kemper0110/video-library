

const Item = ({onChange, name, text, value}) => {
    return (
        <li>
            <input autoComplete="off" type="checkbox"
                   onChange={e => onChange(e.target.checked)}
                   checked={value}
                   name={name}
            />
            <span className="m-1">{text ? text : name}</span>
        </li>
    )
}

export default Item;