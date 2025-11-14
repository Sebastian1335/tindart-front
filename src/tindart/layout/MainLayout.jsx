import { useState } from "react"
import "./MainLayout.css"
import { Outlet } from "react-router"
import PublishArtModal from "../componentes/publishArtModal/PublishArtModal"

import { NavBar } from "./components/navBar/NavBar"
import { SideBar } from "./components/sideBar/SideBar"
import ChatDock from "../componentes/chat/ChatDock"
const formValues = {
  busqueda: "",
}

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
      <NavBar 
        profilePopoverOpen={profilePopoverOpen} 
        setProfilePopoverOpen={setProfilePopoverOpen}
        handleOpenPublishModal={handleOpenPublishModal}
      />
      <div className="main-content">
        {/* Sidebar izquierda */}
        
        <SideBar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Contenido principal */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      <PublishArtModal open={publishModalOpen} onClose={handleClosePublishModal} />
       <ChatDock /> {/* flotante chat abajo--derecha */}
    </div>
  )
}
