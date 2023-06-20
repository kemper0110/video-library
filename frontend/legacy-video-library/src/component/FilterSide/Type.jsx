import {useState} from "react";
import Item from "./Item";


const Type = ({onChange, value = new Set()}) => {

    const [typeFilter, setTypeFilter] = useState(value);

    const onTypeChange = name => {
        return checked => {
            if(checked)
                typeFilter.add(name);
            else
                typeFilter.delete(name);
            setTypeFilter(typeFilter);
            onChange(typeFilter);
        }
    };

    return (
        <div>
            <h3>Тип</h3>
            <ul style={{listStyleType: "none"}}>
                <Item name={"season"} text="Сериал" onChange={onTypeChange("season")} value={typeFilter.has("season")}/>
                <Item name={"movie"} text="Фильм" onChange={onTypeChange("movie")} value={typeFilter.has("movie")}/>
                <Item name={"clip"} text="Клип" onChange={onTypeChange("clip")} value={typeFilter.has("clip")}/>
            </ul>
        </div>
    );
}

export default Type;