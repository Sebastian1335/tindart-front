import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import { Link } from "react-router"
export const NavBar = ({profilePopoverOpen, setProfilePopoverOpen, handleOpenPublishModal}) => {
  
  return (
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
  )
}
