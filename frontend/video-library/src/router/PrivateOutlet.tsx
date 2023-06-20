import {Navigate, Outlet} from "react-router-dom";
import useUser from "../hooks/useUser.tsx";

const PrivateOutlet = () => {
    const user = useUser(state => state.user);
    console.log(user)
    if (user.role === "UNAUTHORIZED")
        return <Navigate to="/login" replace/>;
    else
        return <Outlet/>;
};

export default PrivateOutlet;