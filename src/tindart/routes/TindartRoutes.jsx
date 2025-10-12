import { Route, Routes } from "react-router"
import { MainLayout } from "../layout/MainLayout"
import { Feed } from "../pages/feed/feed"


export const TindartRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Feed/>}/>
        </Route>
    </Routes>
  )
}
