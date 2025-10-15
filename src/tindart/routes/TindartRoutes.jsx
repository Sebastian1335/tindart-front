import { Route, Routes } from "react-router"
import { MainLayout } from "../layout/MainLayout"
import { Feed } from "../pages/feed/Feed"
import { Whiteboard } from "../pages/whiteboard/Whiteboard"


export const TindartRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Feed/>}/>
          <Route path='/whiteboard' element={<Whiteboard/>}/>
        </Route>
    </Routes>
  )
}
