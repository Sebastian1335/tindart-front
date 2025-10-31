import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import { Link } from "react-router"
import { ProfilePopOver } from "../profilePopOver/profilePopOver"
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
              <ProfilePopOver/>
            )}
          </div>
        </div>
      </nav>
  )
}
