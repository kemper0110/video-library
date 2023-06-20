import NamedInput from "../component/Form/NamedInput";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import BasicForm from "../component/Form/BasicForm";
import {useUser} from "../store/user";
import UserService from "../api/UserService";


const Registration = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: '',
        password2: '',
    });
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Логин",
            label: "Логин",
            errorMessage: "Логин должен быть от 3 до 16 буков или цифор",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Пароль",
            label: "Пароль",
            errorMessage: "Пароль должен быть от 3 до 16 буков или цифор",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true
        },
        {
            id: 3,
            name: "password2",
            type: "password",
            placeholder: "Повторите пароль",
            label: "Повторите пароль",
            errorMessage: "Пароли должны совпадать",
            pattern: form.password,
            required: true
        }
    ];
    const onChange = e => {
        const name = e.target.name;
        setForm({...form, [name]: e.target.value});
    };
    const register = async () => {
        const registrationResult = await UserService.signUp(form.username, form.password);
        if (registrationResult.status !== 200)
            alert("username or password is bad");
        // const dataResult = await getUserDataRequest();
        // if (dataResult.status !== 200)
        //     alert("login data error");
        // setUser(dataResult.data);
        // console.log(dataResult.data);
    };
    const onSubmit = e => {
        register().then(() => navigate("/login"));
    };
    return (
        <BasicForm onChange={onChange} values={form} inputs={inputs} onSubmit={onSubmit} name={"Зарегистрироваться"}>
            <Link to={"/login"} className="form-text">Войти</Link>
        </BasicForm>
    );
}

export default Registration;
