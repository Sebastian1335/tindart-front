import React, { useState } from "react"
import "./MainLayout.css"
import { Outlet } from "react-router"

const formValues = {
  busqueda: ""
}


export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formState, setFormState] = useState(formValues)

  return (
    <div className={`layout ${sidebarOpen ? "expanded" : "collapsed"}`}>
      {/* Navbar */}
      <nav className="navbar">
        <h2>
          TIND<span>ART</span>
        </h2>

        <div>
          <input type="text" placeholder="Buscar" />
        </div>

        <div className="nav-links">
          <a href="#">+ Publicar arte</a>
          <a href="#">Whiteboard</a>
          <a href="#">Tienda</a>
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar izquierda */}
        <aside className={`sidebar left ${sidebarOpen ? "open" : "closed"}`}>
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "«" : "»"}
          </button>

          {sidebarOpen && (
            <ul>
              <li>🏠 <span>Inicio</span></li>
              <li>👥 <span>Amigos</span></li>
              <li>📨 <span>Mensajes</span></li>
              <li>⚙️ <span>Configuración</span></li>
            </ul>
          )}
        </aside>

        {/* Contenido principal */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )

}
