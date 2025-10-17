import { useState } from "react"
import styles from "./Register.module.css"
import { Link } from "react-router"
import { useForm } from "../../hooks/useForm"
import { useAuthStore } from "../store/authStore"

const formValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: ""
}


export const Register = () => {

  const {form,onInputChange,setForm} = useForm(formValues)
  const registerUser = useAuthStore((state) => state.registerUser)
  const loading = useAuthStore((state) => state.loading)
  const onSubmitForm = (e) => {
    e.preventDefault()
    const {confirmPassword, ...body} = form
    registerUser(body)
  }
  return (
    <>
      <div className={styles.LoginPage}>
      <div className={styles.LoginBox}>
        <form>
          <h1>{loading == true ? "Cargando" : "Registro"}</h1>
          <h3>Correo Electronico</h3>
          <input 
            type="text" 
            placeholder="Correo electrónico"
            name="email"
            onChange={onInputChange}
            />
          <h3>Usuario</h3>
          <input 
            type="text" 
            placeholder="Usuario"
            name="name"
            onChange={onInputChange}
            />
          <h3>Contraseña</h3>
          <input 
            type="password" 
            placeholder="contraseña"
            name="password"
            onChange={onInputChange}
            />
          <h3>Confirmar Contraseña</h3>
          <input 
            type="password" 
            placeholder="confirmar contraseña"
            name="confirmPassword"
            onChange={onInputChange}
          />
          <button type="submit" onClick={onSubmitForm}>Registrarse</button>
          <p className={styles.RegisterText}>
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/auth"} className="">
              Inicia Sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}
