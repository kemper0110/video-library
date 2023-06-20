import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useMemo} from "react";
import {useUser} from "./store/user";
import {api} from "./api/api";
import Pages from "./page/Pages";
import Outlet from "./router/Outlet";
import Structure from "./component/Structure";


function App() {
    const {invalidateUser} = useUser();
    useMemo(() => {
        api.interceptors.response.use(
            response => response,
            error => {
                if(error.response) {
                    if (error.response.status === 401)
                        invalidateUser();
                }
                // else
                //     alert.error("Ошибка: " + error);
                return Promise.reject(error);
            }
        );
    }, [alert, invalidateUser]);

    return (
        <BrowserRouter>
            <Structure.Header/>
            <Structure.Main>
                <Routes>
                    <Route exact path="/login" element={<Pages.LogIn/>}/>
                    <Route exact path="/registration" element={<Pages.Registration/>}/>

                    <Route element={<Outlet.PrivateOutlet/>}>
                        <Route exact path="/" element={<Pages.Video/>}/>
                        <Route exact path="/video/:id" element={<Pages.VideoDetailed/>}/>
                        <Route exact path="/status" element={<Pages.Status/>}/>
                        <Route exact path="/logout" element={<Pages.LogOut/>}/>

                        <Route element={<Outlet.ModeratorOutlet/>}>
                            <Route exact path="/video/add" element={<Pages.VideoForm/>}/>
                            <Route exact path="/video/add/:id" element={<Pages.VideoUpdate/>}/>
                            <Route exact path="/video/update_image/:id" element={<Pages.UpdateImage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Structure.Main>
            <Structure.Footer/>
        </BrowserRouter>
    );
}

export default App;
