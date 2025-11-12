import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import "./ChatSidebar.css"

const ChatSidebar = () => {
  const conversations = Array(10).fill({
    name: "FloppaLoopie",
    preview: "GAGAGAGAGAGAGAGA...",
  })

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <span className="sidebar-title">Mensajes</span>
        <ChatBubbleOutlineIcon className="sidebar-icon" />
      </div>

      <div className="sidebar-list">
        {conversations.map((conversation, i) => (
          <div key={i} className="sidebar-list-item">
            <button className="sidebar-list-button">
              <div className="sidebar-avatar">F</div>
              <div className="sidebar-content">
                <div className="sidebar-name">{conversation.name}</div>
                <div className="sidebar-preview">{conversation.preview}</div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
