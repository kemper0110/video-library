import useUser from "../hooks/useUser.tsx";
import {Navigate} from "react-router-dom";

const Logout = () => {
    const invalidate = useUser(state => state.invalidateUser)
    invalidate()
    return <Navigate to={'/'}/>
};

export default Logout;