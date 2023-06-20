import BasicForm from "../Form/BasicForm";
import {Link} from "react-router-dom";
import {useUser} from "../../store/user";
import NavBarItem from "./NavBarItem";
import BasicNavBar from "./BasicNavBar";


const UserNavBar = ({children}) => {
    const {user} = useUser();
    return (
        <BasicNavBar>
            <NavBarItem>
                <Link to="/logout" className="nav-link">Выход</Link>
            </NavBarItem>
            <NavBarItem>
                <h3 style={{float: "right"}} className="">{user.username}</h3>
            </NavBarItem>
            {children}
        </BasicNavBar>
    )
}

export default UserNavBar;