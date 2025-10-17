import { Route, Routes } from "react-router"
import { MainLayout } from "../layout/MainLayout"
import { Feed } from "../pages/feed/Feed"
import { Whiteboard } from "../pages/whiteboard/Whiteboard"
import Profile from "../pages/profile/Profile" 

export const TindartRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Feed/>}/>
          <Route path='/whiteboard' element={<Whiteboard/>}/>
          <Route path='profile' element={<Profile/>}/> 
        </Route>
    </Routes>
  )
}
