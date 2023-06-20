import {Navigate, Outlet} from "react-router-dom";
import useUser from "../hooks/useUser.tsx";

const ModeratorOutlet = () => {
    const user = useUser(state => state.user);
    if (user.role !== "ROLE_MODERATOR")
        return <Navigate to="/login" replace/>;
    else
        return <Outlet/>;
};

export default ModeratorOutlet;