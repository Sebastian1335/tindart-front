import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate } from "react-router"
import { ProfilePopOver } from "../profilePopOver/ProfilePopOver"
import { useState } from "react"
import { SettingsPopOver } from "../settingsPopOver/SettingsPopOver"
import { useProfileStore } from "../../../store/profileStore";
import { useAuthStore } from "../../../../Auth/store/authStore";


export const NavBar = ({profilePopoverOpen, setProfilePopoverOpen, handleOpenPublishModal}) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const navigate = useNavigate()
  const fetchProfileData = useProfileStore((state) => state.fetchProfileData);
  const {user} = useAuthStore.getState()
  const setUserProfileData = useProfileStore((state) => state.setUserProfileData)

  const onClickProfile = () => {
    console.log(user)
    fetchProfileData(user.id)
    setUserProfileData(null)
    navigate("/feed/Profile");
  }
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
          <Link to={"/feed/dashboard"} className="nav-icon-btn dashboard-btn">Dashboard</Link>
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
          <div to="/feed/Profile" className="nav-icon-btn profile-btn" onClick={onClickProfile}>
            <img src="/icono.png" alt="Profile" />
            <span>Profile</span>
          </div>

          {profilePopoverOpen && <ProfilePopOver />}
</div>
        </div>
      </nav>
  )
}
