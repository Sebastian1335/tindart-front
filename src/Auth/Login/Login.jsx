import { useState } from "react"
import styles from "./Login.module.css"
import { Link } from "react-router"

const formValues = {
  usuario: "",
  password: "",
}


export const Login = () => {
  const [formState, setFormState] = useState(formValues)
  const [onLoading, setOnloading] = useState(false)
  const onInputChange = ({target}) => {
    const {name, value} = target;
    setFormState({
      ...formState,
      [name]: value
    })
  }
  const esperar = () => {setTimeout(() => {
      setOnloading(false)
  }, 1000)};

  const onSubmitForm = () => {
    event.preventDefault();
    setOnloading(true)
    esperar()
    console.log(formState)
  }


  return (
      <div className={styles.LoginPage}>
      <div className={styles.LoginBox}>
        <form>
          <h1>{onLoading == true ? "Cargando" : "Ingresar"}</h1>
          <h3>Correo Electrónico</h3>
          <input 
            type="text" 
            placeholder="usuario o correo electrónico"
            name="usuario"
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
