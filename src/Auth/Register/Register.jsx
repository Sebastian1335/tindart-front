import { useState } from "react"
import styles from "./Register.module.css"
import { Link } from "react-router"

const formValues = {
  usuario: "",
  password: "",
  confirmPassword: ""
}


export const Register = () => {
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
    <>
      <div className={styles.LoginPage}>
      <h1>{onLoading == true ? "Cargando" : "Login"}</h1>
      <div className={styles.LoginBox}>
        <form>
          <input 
            type="text" 
            placeholder="usuario o correo electrónico"
            name="usuario"
            onChange={onInputChange}
          />
          <input 
            type="password" 
            placeholder="contraseña"
            name="password"
            onChange={onInputChange}
          />
          <input 
            type="password" 
            placeholder="confirmar contraseña"
            name="confirmPassword"
            onChange={onInputChange}
          />
          <button type="submit" onClick={onSubmitForm}>Registrarse</button>
          <p className={styles.RegisterText}>
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/auth/login"}>
              Inicia Sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}
