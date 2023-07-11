import {Link, useLocation} from "react-router-dom";
import useUser from "../hooks/useUser.tsx";
import {useEffect, useState} from "react";
import hamburgerIcon from '../assets/hamburger.svg';
import closeIcon from '../assets/close.svg';

const Item = ({to, text}: { to: string, text: string }) => (
    <li>
        <Link className='font-semibold text-3xl text-white' to={to}>
            {text}
        </Link>
    </li>
)

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    useEffect(() => setMobileOpen(false), [location])
    return (
        <header className="shadow px-3 py-2 md:px-14 md:py-4 bg-gray-700 sticky">
            <DesktopNav/>
            <img src={hamburgerIcon} alt='menu'
                 onClick={() => setMobileOpen(true)}
                 className='ml-auto w-[24px] h-[24px] text-3xl md:hidden right-3'
            />
            {
                mobileOpen ? (
                    <img src={closeIcon} alt='close'
                         onClick={() => setMobileOpen(false)}
                         className='w-[24px] h-[24px] text-3xl md:hidden fixed right-3 top-2 z-50'
                    />
                ) : null
            }
            <MobileNav open={mobileOpen}/>
        </header>
    );
};

const MobileNav = ({open}: { open: boolean }) => {
    const user = useUser(state => state.user)
    return (
        <nav className={`h-screen top-0 fixed w-full bg-gray-700 md:hidden z-40 transition-all duration-500 ${
            open ? "right-[0px] visible" : "right-[-100vw] invisible"
        }`}>
            <ul className='list-none mt-10 flex flex-col gap-8 items-center'>
                <Item to="/" text='Каталог'/>
                {
                    user.role !== "UNAUTHORIZED" ?
                        <Item to="/status" text='Собственный список'/> : null
                }
                {
                    {
                        UNAUTHORIZED: null,
                        ROLE_USER: <h3
                            className='font-semibold text-3xl text-white'>Пользователь {user.username}</h3>,
                        ROLE_MODERATOR: <h3
                            className='font-semibold text-3xl text-white'>Модератор {user.username}</h3>
                    }[user.role]
                }
                {
                    user.role !== "UNAUTHORIZED" ?
                        <Item to="/logout" text='Выход'/> :
                        <Item to='/login' text='Войти'/>
                }
            </ul>
        </nav>
    )
}

const DesktopNav = () => {
    const user = useUser(state => state.user)
    return (
        <nav className='hidden md:block'>
            <ul className='list-none flex gap-2 md:gap-8'>
                <Item to="/" text='Каталог'/>
                {
                    user.role !== "UNAUTHORIZED" ?
                        <Item to="/status" text='Собственный список'/> : null
                }
                {
                    {
                        UNAUTHORIZED: null,
                        ROLE_USER: <h3
                            className='ml-auto font-semibold text-3xl text-white'>Пользователь {user.username}</h3>,
                        ROLE_MODERATOR: <h3
                            className='ml-auto font-semibold text-3xl text-white'>Модератор {user.username}</h3>
                    }[user.role]
                }
                {
                    user.role !== "UNAUTHORIZED" ?
                        <Item to="/logout" text='Выход'/> :
                        <Item to='/login' text='Войти'/>
                }
            </ul>
        </nav>
    )
}


export default Header;