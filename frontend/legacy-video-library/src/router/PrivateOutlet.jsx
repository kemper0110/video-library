import {ROLE} from "../model/user";
import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "../store/user";


export const PrivateOutlet = () => {
    const {user} = useUser();
    if (user.role === ROLE.ROLE_UNAUTHORIZED)
        return <Navigate to="/login" replace/>;
    else
        return <Outlet/>;
}

export const PrivateRoute = ({children}) => {
    const {user} = useUser();

    if (user.role === ROLE.ROLE_UNAUTHORIZED)
        return <Navigate to={"/login"}/>;
    else
        return children;
}
