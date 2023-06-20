import {useUser} from "../../store/user";
import UserNavBar from "./UserNavBar";
import UnauthorizedNavBar from "./UnauthorizedNavBar";
import ModeratorNavBar from "./ModeratorNavBar";
import {ROLE} from "../../model/user";


class NavBar{
    static UnauthorizedNavBar = UnauthorizedNavBar;
    static UserNavBar = UserNavBar;
    static ModeratorNavBar = ModeratorNavBar;
    static NavBar = () => {
        const {user} = useUser();
        switch (user.role){
            case ROLE.ROLE_UNAUTHORIZED:
                return <NavBar.UnauthorizedNavBar/>;
            case ROLE.ROLE_USER:
                return <NavBar.UserNavBar/>;
            case ROLE.ROLE_MODERATOR:
                return <NavBar.ModeratorNavBar/>;
        }
    }
}
export default NavBar;