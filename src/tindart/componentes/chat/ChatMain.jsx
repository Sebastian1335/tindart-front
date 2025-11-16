// src/tindart/componentes/chat/ChatMain.jsx
import { useEffect, useRef, useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import "./ChatMain.css"
import { useChatStore } from "../../store/chatStore"
import { useAuthStore } from "../../../Auth/store/authStore"

const ChatMain = ({ hideHeader = false }) => {
  const [text, setText] = useState("")
  const selectedUser = useChatStore((state) => state.selectedUser)
  const messages = useChatStore((state) => state.messages)
  const sendMessage = useChatStore((state) => state.sendMessage)
  const markRead = useChatStore((state) => state.markRead)
  const endRef = useRef(null)
  const { user } = useAuthStore.getState();
  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  const conversationMessages = messages.filter(
    (m) => m.conversationId === selectedUser?.conversationId
  );


  useEffect(() => {
    scrollToBottom()
  }, [conversationMessages])
  
  const handleSend = () => {
    if (!text.trim()) return
    sendMessage(text, selectedUser.conversationId)
    setText("")
    setTimeout(scrollToBottom, 50);
  }

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser]);

  useEffect(() => {
      if (selectedUser?.conversationId) {
        markRead(selectedUser.conversationId)
      }

    }, [selectedUser])

    if (!selectedUser) {
      return (
        <div className="main-no-chat">
          <p>Selecciona un contacto para empezar a chatear</p>
        </div>
      )
    }


  return (
    <div className="main-container">
      {/* Header SOLO si no está oculto */}
      {!hideHeader && (
        <div className="main-header">
          <div className="main-header-left">
            <div className="main-header-avatar">{selectedUser.userName[0].toUpperCase()}</div>
            <span className="main-header-title">{selectedUser ? selectedUser.userName:""}</span>
          </div>
          <button className="main-header-icon">
            <InfoOutlinedIcon />
          </button>
        </div>
      )}

      <div className="main-messages">        
        {conversationMessages.map((msg, i) => (
          <div 
            key={i} 
            className={`message-wrapper ${msg.fromId === user.id ? "me" : "other"}`}
          >
          {msg.fromId !== user.id && <div className="message-avatar">{selectedUser.userName[0].toUpperCase()}</div>}

          {msg.type === "image" ? (
            <div className="message-image"><img src={msg.src} alt="msg" /></div>
          ) : (
            <div className={`message-bubble ${msg.fromId === user.id ? "me" : "other"}`}>
              <p className="message-text">{msg.text}</p>
            </div>
          )}
          {msg.fromId === user.id && <div className="message-avatar me-avatar">Tú</div>}
          </div>
        ))}
        {/* <div ref={endRef}/> */}
      </div>
      <div className="main-input-container">
        <div className="main-input-wrapper">
          <button className="main-input-button"><AttachFileIcon fontSize="small" /></button>
          <input
            type="text"
            className="main-input-field"
            placeholder="Escribe tu mensaje..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
          />
          <button onClick={handleSend} disabled={!text.trim()} className="main-send-button">
            <SendIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatMain
