import {Link} from "react-router-dom";
import useUser from "../hooks/useUser.tsx";

const Item = ({to, text}: { to: string, text: string }) => (
    <Link className='font-semibold text-2xl text-white' to={to}>
        {text}
    </Link>
)

const Header = () => {
    const user = useUser(state => state.user);
    return (
        <header className="shadow flex gap-8 px-14 py-4 bg-gray-700 sticky">
            <Item to="/" text='Каталог'/>
            {
                user.role !== "UNAUTHORIZED" ?
                    <Item to="/status" text='Собственный список'/> : null
            }
            {
                {
                    UNAUTHORIZED: null,
                    ROLE_USER: <h3 className='ml-auto font-semibold text-2xl text-white'>Пользователь {user.username}</h3>,
                    ROLE_MODERATOR: <h3 className='ml-auto font-semibold text-2xl text-white'>Модератор {user.username}</h3>
                }[user.role]
            }
            {
                user.role !== "UNAUTHORIZED" ?
                    <Item to="/logout" text='Выход'/> :
                    <Item to='/login' text='Войти'/>
            }
        </header>
    );
};

export default Header;