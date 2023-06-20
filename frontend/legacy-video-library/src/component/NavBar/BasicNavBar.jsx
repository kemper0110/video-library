import {Link} from "react-router-dom";
import NavBarItem from "./NavBarItem";


const BasicNavBar = ({children}) => {
    console.log(children);
    return (
        <ul className="nav nav-pills">
            <NavBarItem>
                <Link to="/" className="nav-link">Каталог</Link>
            </NavBarItem>
            <NavBarItem>
                <Link to="/status" className="nav-link">Мой список</Link>
            </NavBarItem>
            {children}
        </ul>
    )
};

export default BasicNavBar;