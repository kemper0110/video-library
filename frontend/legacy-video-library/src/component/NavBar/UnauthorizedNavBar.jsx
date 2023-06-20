import {Link} from "react-router-dom";
import NavBarItem from "./NavBarItem";
import BasicNavBar from "./BasicNavBar";

const UnauthorizedNavBar = () => {
    return (
        <BasicNavBar>
            <NavBarItem>
                <Link to="/login" className="nav-link">Вход</Link>
            </NavBarItem>
        </BasicNavBar>
    );
}
export default UnauthorizedNavBar;