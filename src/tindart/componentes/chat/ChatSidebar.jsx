import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./ChatSidebar.css";

/**
 * onSelect(item): callback al hacer click en una conversación.
 * hideHeader: oculta el header cuando se usa dentro del dock.
 */
const ChatSidebar = ({ onSelect, hideHeader = false }) => {
    const conversations = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: "FloppaLoopie",
    preview: "GAGAGAGAGAGAGAGA...",
    avatar:
      "/icono.png",
  }));

  return (
    <div className="sidebar-container">
      {!hideHeader && (
        <div className="sidebar-header">
          <span className="sidebar-title">Mensajes</span>
          <ChatBubbleOutlineIcon className="sidebar-icon" />
        </div>
      )}

      <div className="sidebar-list">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="sidebar-list-item">
            <button
              className="sidebar-list-button"
              onClick={() =>
                onSelect &&
                onSelect({
                  id: conversation.id,
                  name: conversation.name,
                  avatar: conversation.avatar,
                })
              }
              type="button"
            >
              <div
                className="sidebar-avatar"
                style={{ backgroundImage: `url(${conversation.avatar})` }}
              />
              <div className="sidebar-content">
                <div className="sidebar-name">{conversation.name}</div>
                <div className="sidebar-preview">{conversation.preview}</div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
