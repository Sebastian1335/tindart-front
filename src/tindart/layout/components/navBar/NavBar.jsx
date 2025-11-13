import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router"
import { ProfilePopOver } from "../profilePopOver/profilePopOver"
import { useState } from "react"
import { SettingsPopOver } from "../settingsPopOver/SettingsPopOver"
export const NavBar = ({profilePopoverOpen, setProfilePopoverOpen, handleOpenPublishModal}) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
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
          <Link to={"/feed/whiteboardList"}>Whiteboard</Link>
           <Link to={"/feed/tienda"}>Tienda</Link>
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

          <Link to="/feed/chat" className="nav-icon-btn chat-btn" aria-label="Chat">
            <EmailIcon sx={{ fontSize: 20 }} />
          </Link>
          
          <button 
            className="nav-icon-btn settings-btn"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <SettingsIcon sx={{ fontSize: 20 }} />
          </button>
          {settingsOpen && <SettingsPopOver/>}

          <div
            className="profile-container"
            onMouseEnter={() => setProfilePopoverOpen(true)}
            onMouseLeave={() => setProfilePopoverOpen(false)}
          >
            <button className="nav-icon-btn profile-btn">
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
