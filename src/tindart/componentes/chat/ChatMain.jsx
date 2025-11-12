import { useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import "./ChatMain.css"

const ChatMain = () => {
  const [message, setMessage] = useState("")

  const messages = [
    {
      type: "image",
      src: "fondo perfil.png",
    },
    { type: "text", text: "LO AMO T_T" },
    { type: "text", text: "LO AMO T_T" },
    { type: "text", text: "LO AMO T_T" },
  ]

  const handleSend = () => {
    if (message.trim()) {
      console.log("Mensaje enviado:", message)
      setMessage("")
    }
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <div className="main-header-left">
          <div className="main-header-avatar">F</div>
          <span className="main-header-title">FloppaLoopie</span>
        </div>
        <button className="main-header-icon">
          <InfoOutlinedIcon />
        </button>
      </div>

      <div className="main-messages">
        {messages.map((msg, i) => (
          <div key={i} className="message-wrapper">
            {msg.type === "image" ? (
              <div className="message-image">
                <img src={msg.src || "/placeholder.svg"} alt="Drawing" />
              </div>
            ) : (
              <div className="message-bubble">
                <p className="message-text">{msg.text}</p>
              </div>
            )}
            <div className="message-avatar">F</div>
          </div>
        ))}
      </div>

      <div className="main-input-container">
        <div className="main-input-wrapper">
          <button className="main-input-button">
            <AttachFileIcon fontSize="small" />
          </button>
          <input
            type="text"
            className="main-input-field"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
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
