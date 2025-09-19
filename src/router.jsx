import { Route, Routes } from "react-router"
import { Login } from "./Auth/Login/Login"
import { Register } from "./Auth/Register/Register"
import { AuthRoutes } from "./Auth/routes/AuthRoutes"
import { TindartRoutes } from "./tindart/routes/TindartRoutes"

export const Router = () => {
  return (
      <Routes>
          <Route path='/' element={<p>Hola</p>}/>
          <Route path="/auth/*" element={<AuthRoutes/>}/>
          <Route path="/feed/*" element={<TindartRoutes/>}/>
      </Routes>
  )
}


