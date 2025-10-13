import React, { useState } from "react"
import "./MainLayout.css"
import { Outlet } from "react-router"

const formValues = {
  busqueda: "",
}

const mockWhiteboards = [
  { id: 1, name: "La hamburgueseria" },
  { id: 2, name: "La hamburgueseria" },
]

const mockArtists = [
  {
    id: 1,
    name: "Ana Gonzalez",
    verified: true,
    following: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    artwork: "/colorful-lion.jpg",
  },
  {
    id: 2,
    name: "Ana Gonzalez",
    verified: true,
    following: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana2",
    artwork: "/colorful-lion.jpg",
  },
  {
    id: 3,
    name: "Ana Gonzalez",
    verified: true,
    following: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana3",
    artwork: "/colorful-lion.jpg",
  },
]

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
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "«" : "»"}
          </button>

          {sidebarOpen && (
            <div className="sidebar-content">
              {/* Mis Whiteboard Section */}
              <section className="sidebar-section">
                <h3 className="section-title">Mis Whiteboard</h3>
                <ul className="whiteboard-list">
                  {mockWhiteboards.map((board) => (
                    <li key={board.id} className="whiteboard-item">
                      {board.name}
                    </li>
                  ))}
                </ul>
                <button className="ver-todos-btn">Ver Todos</button>
              </section>

              {/* Artistas Section */}
              <section className="sidebar-section">
                <h3 className="section-title">Artistas que quiza conozcas</h3>
                <div className="artists-list">
                  {mockArtists.map((artist) => (
                    <div key={artist.id} className="artist-card">
                      <div className="artist-header">
                        <div className="artist-info">
                          <img src={artist.avatar || "/placeholder.svg"} alt={artist.name} className="artist-avatar" />
                          <span className="artist-name">
                            {artist.name}
                            {artist.verified && (
                              <svg className="verified-badge" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                              </svg>
                            )}
                          </span>
                        </div>
                        <button className="siguiendo-btn">Siguiendo</button>
                      </div>
                      <div className="artist-artwork">
                        <img src={artist.artwork || "/placeholder.svg"} alt={`Artwork by ${artist.name}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
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
