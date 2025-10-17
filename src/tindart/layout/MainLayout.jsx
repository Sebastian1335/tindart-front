import { useState } from "react"
import "./MainLayout.css"
import { Link, Outlet } from "react-router"
import PublishArtModal from "../componentes/PublishArtModal"
import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"

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
    avatar: "/icono.png",
    artwork: "/gato sidebar.png",
  },
  {
    id: 2,
    name: "Ana Gonzalez",
    verified: true,
    following: true,
    avatar: "/icono.png",
    artwork: "/gato sidebar.png",
  },
  {
    id: 3,
    name: "Ana Gonzalez",
    verified: true,
    following: true,
    avatar: "/icono.png",
    artwork: "/gato sidebar.png",
  },
]

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formState, setFormState] = useState(formValues)
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false)

  const handleOpenPublishModal = () => {
    setPublishModalOpen(true)
  }

  const handleClosePublishModal = () => {
    setPublishModalOpen(false)
  }

  return (
    <div className={`layout ${sidebarOpen ? "expanded" : "collapsed"}`}>
      {/* Navbar */}
      <nav className="navbar">
        <h2>
          <Link to={"/feed"}>
            TIND<span>ART</span>
          </Link>
        </h2>

        <div>
          <input type="text" placeholder="Buscar" />
        </div>

        <div className="nav-links">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleOpenPublishModal()
            }}
          >
            + Publicar arte
          </a>
          <Link to={"/feed/whiteboard"}>Whiteboard</Link>
          <a href="#">Tienda</a>
        </div>

        <div className="nav-icons">
          <button className="nav-icon-btn help-btn">
            <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
            <span>Ayuda</span>
          </button>

          <button className="nav-icon-btn notification-btn">
            <NotificationsNoneIcon sx={{ fontSize: 20 }} />
            <span className="notification-badge">2</span>
          </button>

          <button className="nav-icon-btn settings-btn">
            <SettingsIcon sx={{ fontSize: 20 }} />
          </button>

          <div
            className="profile-container"
            onMouseEnter={() => setProfilePopoverOpen(true)}
            onMouseLeave={() => setProfilePopoverOpen(false)}
          >
            <button className="nav-icon-btn profile-btn">
              <img src="/icono.png" alt="Profile" className="profile-avatar" />
              <Link to={"/feed/Profile"}>Profile</Link>
            </button>

            {profilePopoverOpen && (
              <div className="profile-popover">
                <div className="profile-popover-banner">
                  <img
                    src="/fondo perfil.png"
                    alt="Banner"
                  />
                </div>
                  {/* Aca seria ver como se le haria la logica de followers y demas */}
                <div className="profile-popover-content">
                  <h3 className="profile-popover-name">FloppaLoopie</h3>
                  <p className="profile-popover-handle">@FloppaLive</p>
                  <div className="profile-popover-stats">
                    <div className="stat">
                      <span className="stat-label">Seguidores</span>
                      <span className="stat-value">8345</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Me gusta</span>
                      <span className="stat-value">8345k</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Siguiendo</span>
                      <span className="stat-value">2345</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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

      <PublishArtModal open={publishModalOpen} onClose={handleClosePublishModal} />
    </div>
  )
}
