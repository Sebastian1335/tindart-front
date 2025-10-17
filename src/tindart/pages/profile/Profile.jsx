import MainLayout from "../../components/MainLayout"
import "./profile.css"
import { useState } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import MailOutlineIcon from "@mui/icons-material/MailOutline"

// Mock artwork data for the portfolio grid
const portfolioItems = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1019",
    title: "Water Lilies",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1579783902915-f0b0de2c2eb3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    title: "Abstract Purple",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=690",
    title: "Colorful Art",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=755",
    title: "Blue Waves",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1580136579585-48a5311ee2f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1104",
    title: "Purple Dreams",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=755",
    title: "Artistic Vision",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("portfolio")

  return (
    <MainLayout>
      <div className="profile-container">
        {/* Main Profile Content */}
        <main className="profile-main">
          {/* Banner and Avatar */}
          <div className="profile-header">
            <div className="profile-banner">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wut8iIPMAOj2uTtAkRYLj7WTbCtQVL.png"
                alt="Profile Banner"
              />
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-large">
                  <img src="/icono.png" alt="Profile" />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info-section">
              <div className="profile-info-left">
                <h1 className="profile-username">FloppaLoopie</h1>
                <p className="profile-handle">@FloppaLive</p>

                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-label">Seguidores</span>
                    <span className="stat-value">8345</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Me gusta</span>
                    <span className="stat-value">8345k</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Siguiendo</span>
                    <span className="stat-value">2345</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="editar-perfil-btn">Editar Perfil</button>
                <button className="icon-btn">
                  <MoreVertIcon sx={{ fontSize: 20 }} />
                </button>
                <button className="icon-btn">
                  <MailOutlineIcon sx={{ fontSize: 20 }} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
              <button
                className={`tab-btn ${activeTab === "portfolio" ? "active" : ""}`}
                onClick={() => setActiveTab("portfolio")}
              >
                Portafolio
              </button>
              <button
                className={`tab-btn ${activeTab === "liked" ? "active" : ""}`}
                onClick={() => setActiveTab("liked")}
              >
                Liked
              </button>
              <button
                className={`tab-btn ${activeTab === "guardados" ? "active" : ""}`}
                onClick={() => setActiveTab("guardados")}
              >
                Mis guardados
              </button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="profile-bio-section">
            <p className="profile-bio">
              Artista digital apasionada por crear mundos imaginarios. Aquí comparto mis obras de arte y proyectos
              creativos.
            </p>
            <button className="seguir-btn">Seguir</button>
          </div>

          {/* Portfolio Grid */}
          <div className="portfolio-section">
            <div className="portfolio-grid">
              {portfolioItems.map((item) => (
                <div key={item.id} className="portfolio-item">
                  <img src={item.img || "/placeholder.svg"} alt={item.title} />
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Floating Messages Button */}
        <button className="floating-messages-btn">
          <MailOutlineIcon sx={{ fontSize: 18 }} />
          Mensajes
        </button>
      </div>
    </MainLayout>
  )
}
