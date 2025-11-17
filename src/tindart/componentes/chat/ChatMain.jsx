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
  const messagesContainerRef = useRef(null)
  const { user } = useAuthStore.getState();
  
  const conversationMessages = messages.filter(
    (m) => m.conversationId === selectedUser?.conversationId
  );

  // Función para hacer scroll al final
  const scrollToBottom = (smooth = true) => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      // Usar scrollTop directamente para mayor control
      if (smooth) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth"
        })
      } else {
        container.scrollTop = container.scrollHeight
      }
    } else if (endRef.current) {
      // Fallback: usar scrollIntoView
      endRef.current.scrollIntoView({ 
        behavior: smooth ? "smooth" : "auto",
        block: "end",
        inline: "nearest"
      })
    }
  }
  
  // Scroll automático cuando cambian los mensajes (nuevo mensaje enviado o recibido)
  useEffect(() => {
    if (conversationMessages.length > 0 && selectedUser?.conversationId) {
      // Pequeño delay para asegurar que el DOM se haya actualizado
      const timeoutId = setTimeout(() => {
        scrollToBottom(true)
      }, 100)
      
      return () => clearTimeout(timeoutId)
    }
  }, [conversationMessages.length, selectedUser?.conversationId])
  
  // Scroll automático al cambiar de conversación o cargar inicialmente
  useEffect(() => {
    if (selectedUser?.conversationId && conversationMessages.length > 0) {
      // Scroll inmediato (sin smooth) al cambiar de conversación para que sea instantáneo
      const timeoutId = setTimeout(() => {
        scrollToBottom(false)
      }, 200)
      
      return () => clearTimeout(timeoutId)
    }
  }, [selectedUser?.conversationId])

  const handleSend = () => {
    if (!text.trim()) return
    sendMessage(text, selectedUser.conversationId)
    setText("")
    // Scroll inmediato después de enviar
    setTimeout(() => {
      scrollToBottom(true)
    }, 50)
  }

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

      <div className="main-messages" ref={messagesContainerRef}>        
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
        <div ref={endRef} className="scroll-anchor" />
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
