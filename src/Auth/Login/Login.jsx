import styles from "./Login.module.css"
import { Link } from "react-router"
import { useAuthStore } from "../store/authStore"
import { useForm } from "../../hooks/useForm"

const formValues = {
  email: "",
  password: "",
}


export const Login = () => {
  const loginUser = useAuthStore((state) => state.loginUser)
  const loading = useAuthStore((state) => state.loading)
  const {form, onInputChange, setForm} = useForm(formValues)
  const onSubmitForm = (e) => {
    e.preventDefault()
    loginUser(form)
  }
  return (
      <div className={styles.LoginPage}>
      <div className={styles.LoginBox}>
        <form>
          <h1>{loading == true ? "Cargando" : "Ingresar"}</h1>
          <h3>Correo Electrónico</h3>
          <input 
            type="text" 
            placeholder="correo electrónico"
            name="email"
            onChange={onInputChange}
          />
          <h3>Contraseña</h3>
          <input 
            type="password" 
            placeholder="contraseña"
            name="password"
            onChange={onInputChange}
          />
          <button type="submit" onClick={onSubmitForm}>Iniciar sesión</button>
        </form>
        <p className={styles.RegisterText}>
          ¿No tienes cuenta?{" "}
          <Link to={"/auth/register"} className={""}>
            Crea una aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
