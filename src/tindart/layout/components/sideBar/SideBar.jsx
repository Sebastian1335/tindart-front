import { useEffect } from "react"
import { useWhiteboardStore } from "../../../store/whiteBoardStore"
import { useNavigate } from "react-router"

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


export const SideBar = ({sidebarOpen, setSidebarOpen}) => {

  const fetchWhiteBoardList = useWhiteboardStore((state) => state.fetchWhiteBoardList)
  const whiteboardList = useWhiteboardStore((state) => state.whiteboardList)
  const selectWhiteBoard = useWhiteboardStore((state) => state.selectWhiteBoard)
  const navigate = useNavigate()
  useEffect(() => {
    fetchWhiteBoardList()
  }, [sidebarOpen])
  
  const handleVerTodos = () => {
    navigate("/feed/whiteboardList")
  }

  const handleWhiteboard = (board) => {
    selectWhiteBoard(board)
    navigate("/feed/whiteboard")
  }

  return (
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
                  {whiteboardList.filter((c, i) => i < 3).map((board) => (
                    <li key={board.id} className="whiteboard-item" onClick={() => handleWhiteboard(board)}>
                      {board.title}
                    </li>
                  ))}
                </ul>
                <button className="ver-todos-btn" onClick={handleVerTodos}>Ver Todos</button>
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
  )
}
