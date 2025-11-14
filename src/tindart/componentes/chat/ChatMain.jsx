// src/tindart/componentes/chat/ChatMain.jsx
import { useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import "./ChatMain.css"

const ChatMain = ({ hideHeader = false }) => {
  const [message, setMessage] = useState("")
  const messages = [
    { sender: "other", type: "image", src: "fondo perfil.png" },
    { sender: "other", type: "text", text: "Bro mira esto XD" },
    { sender: "me", type: "text", text: "JAJSAJDJSAD lo amo T_T" },
    { sender: "me", type: "text", text: "Manda más fotos" },
  ]

  const handleSend = () => {
    if (message.trim()) {
      console.log("Mensaje enviado:", message)
      setMessage("")
    }
  }

  return (
    <div className="main-container">
      {/* Header SOLO si no está oculto */}
      {!hideHeader && (
        <div className="main-header">
          <div className="main-header-left">
            <div className="main-header-avatar">F</div>
            <span className="main-header-title">FloppaLoopie</span>
          </div>
          <button className="main-header-icon">
            <InfoOutlinedIcon />
          </button>
        </div>
      )}

      <div className="main-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message-wrapper ${msg.sender === "me" ? "me" : "other"}`}>
            {msg.sender === "other" && <div className="message-avatar">F</div>}
            {msg.type === "image" ? (
              <div className="message-image"><img src={msg.src} alt="msg" /></div>
            ) : (
              <div className={`message-bubble ${msg.sender}`}><p className="message-text">{msg.text}</p></div>
            )}
            {msg.sender === "me" && <div className="message-avatar me-avatar">Tú</div>}
          </div>
        ))}
      </div>

      <div className="main-input-container">
        <div className="main-input-wrapper">
          <button className="main-input-button"><AttachFileIcon fontSize="small" /></button>
          <input
            type="text"
            className="main-input-field"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
          />
          <button onClick={handleSend} disabled={!message.trim()} className="main-send-button">
            <SendIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatMain
