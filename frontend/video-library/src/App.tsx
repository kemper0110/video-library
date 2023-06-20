import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./structure/Header.tsx";
import Main from "./structure/Main.tsx";
import Footer from "./structure/Footer.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Registration from "./features/auth/Registration.tsx";
import PrivateOutlet from "./router/PrivateOutlet.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import VideoDetailedPage from "./pages/VideoDetailedPage.tsx";

//  exact={true}
function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Main>
              <Routes>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/registration" element={<Registration/>}/>

                  <Route element={<PrivateOutlet/>}>
                      <Route path="/" element={<VideoPage/>}/>
                      {/*<Route path="/" element={<TestMain/>}/>*/}
                      <Route path="/video/:id" element={<VideoDetailedPage/>}/>
                  {/*    <Route path="/status" element={<Status/>}/>*/}
                  {/*    <Route path="/logout" element={<LogOut/>}/>*/}

                      {/*<Route element={<Outlet.ModeratorOutlet/>}>*/}
                      {/*    <Route path="/video/add" element={<VideoForm/>}/>*/}
                      {/*    <Route path="/video/add/:id" element={<VideoUpdate/>}/>*/}
                      {/*    <Route path="/video/update_image/:id" element={<UpdateImage/>}/>*/}
                      {/*</Route>*/}
                  </Route>
              </Routes>
          </Main>
          <Footer/>
      </BrowserRouter>
  )
}

export default App
