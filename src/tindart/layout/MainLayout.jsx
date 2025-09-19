import React from "react"
import "./MainLayout.css"
import { Outlet } from "react-router"

export const MainLayout = () => {
  return (
    <div className="layout">
      {/* Navbar */}
      <nav className="navbar">
        <h2>MiRedSocial</h2>
        <div className="nav-links">
          <a href="#">Inicio</a>
          <a href="#">Mensajes</a>
          <a href="#">Perfil</a>
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar izquierda */}
        <aside className="sidebar left">
          <ul>
            <li>🏠 Inicio</li>
            <li>👥 Amigos</li>
            <li>📨 Mensajes</li>
            <li>⚙️ Configuración</li>
          </ul>
        </aside>

        {/* Contenido central */}
        <Outlet/>
        {/* <section className="feed">
          <header className="feed-header">
            <h3>Bienvenido a tu muro</h3>
          </header>

          <div className="post">
            <h4>Usuario 1</h4>
            <p>Este es mi primer post 🎉</p>
          </div>
          <div className="post">
            <h4>Usuario 2</h4>
            <p>¡Qué buen día para programar! 💻</p>
          </div>
        </section> */}

        {/* Sidebar derecha */}
        <aside className="sidebar right">
          <h4>Amigos en línea</h4>
          <ul>
            <li>🟢 Ana</li>
            <li>🟢 Luis</li>
            <li>🟢 María</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
