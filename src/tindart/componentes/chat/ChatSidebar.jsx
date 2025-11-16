import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./ChatSidebar.css";
import {useChatStore} from "../../store/chatStore"
import { useEffect } from "react";
/**
 * onSelect(item): callback al hacer click en una conversación.
 * hideHeader: oculta el header cuando se usa dentro del dock.
 */
const ChatSidebar = ({ onSelect, hideHeader = false }) => {
    const getContacts = useChatStore((state) => state.getContacts)
    const contacts = useChatStore((state) => state.users)
    const selectChat = useChatStore((state) => state.selectChat)
    useEffect(() => {
      getContacts()
    }, [])
    const handleSelectChat = async (contact) => {
      await selectChat(contact);
      onSelect && onSelect(contact)
    }
    return (
      <div className="sidebar-container">
        {!hideHeader && (
          <div className="sidebar-header">
            <span className="sidebar-title">Mensajes</span>
            <ChatBubbleOutlineIcon className="sidebar-icon" />
          </div>
        )}

        <div className="sidebar-list">
          {contacts.map((conversation) => (
            <div key={conversation.id} className="sidebar-list-item">
              <button
                className="sidebar-list-button"
                onClick={() => handleSelectChat(conversation)}
                type="button"
              >
                <div
                  className="sidebar-avatar"
                  style={{ backgroundImage: `url(${conversation.avatar || "/icono.png"})` }}
                />
                <div className="sidebar-content">
                  <div className="sidebar-name">{conversation.userName}</div>
                  <div className="sidebar-preview">{conversation.lastMessage?.text || ""}</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default ChatSidebar;
