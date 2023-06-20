import {useState} from "react";
import "./form.css";

const NamedInput = (props) => {
    const {id, label, value, onChange, errorMessage, ...inputProps} = props;
    const [focused, setFocused] = useState(false);

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input className="form-control"
                   id={id} onChange={onChange} value={value}
                   onBlur={() => setFocused(true)} focused={focused.toString()}
                   {...inputProps}
            />
            <span className="form-text error-span">{errorMessage}</span>
        </div>
    );
}

export default NamedInput;