// src/tindart/componentes/chat/ChatSidebar.jsx
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import "./ChatSidebar.css"

const ChatSidebar = ({ onSelect, hideHeader = false }) => {
  const conversations = Array(15).fill({
    id: 1,
    name: "FloppaLoopie",
    preview: "GAGAGAGAGAGAGAGA...",
  })

  return (
    <div className="sidebar-container">
      {!hideHeader && (
        <div className="sidebar-header">
          <span className="sidebar-title">Mensajes</span>
          <ChatBubbleOutlineIcon className="sidebar-icon" />
        </div>
      )}

      <div className="sidebar-list">
        {conversations.map((conversation, i) => (
          <div key={i} className="sidebar-list-item">
            <button
              className="sidebar-list-button"
              onClick={() => onSelect && onSelect(conversation)}
              type="button"
            >
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
