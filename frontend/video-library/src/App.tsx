import {Route, Routes} from "react-router-dom";
import Header from "./structure/Header.tsx";
import Main from "./structure/Main.tsx";
import Footer from "./structure/Footer.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Registration from "./features/auth/Registration.tsx";
import PrivateOutlet from "./router/PrivateOutlet.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import VideoDetailedPage from "./pages/VideoDetailedPage.tsx";
import StatusListPage from "./pages/StatusListPage.tsx";
import {useEffect} from "react";
import {api} from "./features/api/api.ts";
import useUser from "./hooks/useUser.tsx";
import VideoAddPage from "./pages/VideoAddPage.tsx";
import VideoUpdatePage from "./pages/VideoUpdatePage.tsx";
import Logout from "./pages/Logout.tsx";
import ModeratorOutlet from "./router/ModeratorOutlet.tsx";

//  exact={true}
function App() {
    console.log("root rendered")
    const invalidateUser = useUser(state => state.invalidateUser)
    useEffect(() => {
        const id = api.interceptors.response.use(response => {
            const url = response.request.responseURL
            const sub = url.substring(url.lastIndexOf('/'))
            if (sub === "/login") {
                console.log("invalidating")
                invalidateUser()
                throw new Error("Не авторизован")
            }
            return response
        })
        return () => api.interceptors.response.eject(id)
    }, [])

    return (
        <>
            <Header/>
            <Main>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/" element={<VideoPage/>}/>
                    <Route path="/video/:id" element={<VideoDetailedPage/>}/>

                    <Route element={<PrivateOutlet/>}>
                        <Route path="/status" element={<StatusListPage/>}/>
                        <Route path="/logout" element={<Logout/>}/>

                        <Route element={<ModeratorOutlet/>}>
                            <Route path='/video-add' element={<VideoAddPage/>}/>
                            <Route path='/video-update/:id' element={<VideoUpdatePage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Main>
            <Footer/>
        </>
    )
}

export default App
