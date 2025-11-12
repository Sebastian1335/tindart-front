import ChatSidebar from "../../componentes/chat/ChatSidebar"
import ChatMain from "../../componentes/chat/ChatMain"
import "../chat/Chat.css"

export const Chat = () => {
  return (
    <div className="chat-container">
      <ChatSidebar />
      <ChatMain />
    </div>
  )
}
