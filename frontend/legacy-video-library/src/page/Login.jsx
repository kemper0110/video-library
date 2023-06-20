import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import BasicForm from "../component/Form/BasicForm";
import {useUser} from "../store/user";
import UserService from "../api/UserService";

const Login = () => {
    const {setUser} = useUser();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: ''
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
        }
    ];
    const onChange = e => {
        const name = e.target.name;
        setForm({...form, [name]: e.target.value});
    };
    const login = async () => {
        const loginResult = await UserService.signIn(form.username, form.password);
        if (loginResult.status !== 200)
            alert("username or password is bad");
        const dataResult = await UserService.data();
        if (dataResult.status !== 200)
            alert("login data error");
        setUser(dataResult.data);
    };
    const onSubmit = e => {
        login().then(() => navigate("/"));
    };

    return (
        <BasicForm onChange={onChange} onSubmit={onSubmit} inputs={inputs} values={form} name={"Войти"}>
            <Link to={"/registration"} className="form-text">Регистрация</Link>
        </BasicForm>
    );
}


export default Login;