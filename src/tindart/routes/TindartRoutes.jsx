import { Route, Routes } from "react-router"
import { MainLayout } from "../layout/MainLayout"


export const TindartRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<h1>Muro</h1>}/>
        </Route>
    </Routes>
  )
}
