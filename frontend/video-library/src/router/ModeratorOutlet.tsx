import {Navigate, Outlet} from "react-router-dom";
import useUser from "../hooks/useUser.tsx";

const ModeratorOutlet = () => {
    const user = useUser(state => state.user);
    const invalidateUser = useUser(state => state.invalidateUser);
    if (user.role !== "ROLE_MODERATOR") {
        invalidateUser()
        return <Navigate to="/login" replace/>;
    }
    else
        return <Outlet/>;
};

export default ModeratorOutlet;