import Item from "./Item";
import {useState} from "react";


const Rating = ({onChange, value = new Set()}) => {
    const [rating, setRating] = useState(value);

    const onRatingChange = name => {
        return checked => {
            if(checked)
                rating.add(name);
            else
                rating.delete(name);
            setRating(rating);
            onChange(rating);
        };
    };

    return (
        <div>
            <h3>Оценка</h3>
            <ul style={{listStyleType: "none"}}>
                <Item name={"6"} onChange={onRatingChange("6")} value={rating.has("6")} text={"6+"}/>
                <Item name={"7"} onChange={onRatingChange("7")} value={rating.has("7")} text={"7+"}/>
                <Item name={"8"} onChange={onRatingChange("8")} value={rating.has("8")} text={"8+"}/>
            </ul>
        </div>
    );
}

export default Rating;
