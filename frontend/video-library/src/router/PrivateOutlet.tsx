import {Navigate, Outlet} from "react-router-dom";
import useUser from "../hooks/useUser.tsx";

const PrivateOutlet = () => {
    const user = useUser(state => state.user);
    const invalidateUser = useUser(state => state.invalidateUser);
    if (user.role === "UNAUTHORIZED") {
        invalidateUser()
        return <Navigate to="/login" replace/>;
    }
    else
        return <Outlet/>;
};

export default PrivateOutlet;