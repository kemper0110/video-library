import {useUser} from "../store/user";
import {ROLE} from "../model/user";
import {Navigate, Outlet} from "react-router-dom";


const ModeratorOutlet = () => {
    const {user} = useUser();
    if (user.role !== ROLE.ROLE_MODERATOR)
        return <Navigate to="/login" replace/>;
    else
        return <Outlet/>;
}

export default ModeratorOutlet;