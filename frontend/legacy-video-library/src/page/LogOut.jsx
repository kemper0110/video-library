import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useUser} from "../store/user";
import UserService from "../api/UserService";


const LogOut = () => {
    const [done, setDone] = useState(false);
    const {invalidateUser} = useUser();

    useEffect(() => {
        UserService.signOut().then(() => {
            invalidateUser();
            setDone(true);
        });
    }, []);

    return (
        done ? <Navigate to={"/"}/> : <h1>Выход из системы...</h1>
    );
}
export default LogOut;