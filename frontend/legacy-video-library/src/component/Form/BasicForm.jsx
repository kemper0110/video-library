import NamedInput from "./NamedInput";


const BasicForm = ({values, inputs, onSubmit, onChange, children, name}) => {
    return (
        <>
            {inputs.map(input => <NamedInput key={input.id} {...input} onChange={onChange}/>)}
            <button type="button" className="btn btn-primary" onClick={onSubmit}>{name}</button>
            <br/>
            {children}
        </>
    );
};

export default BasicForm;