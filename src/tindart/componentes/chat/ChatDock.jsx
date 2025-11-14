import React, { useEffect, useRef, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";
import "./ChatDock.css";

const ChatDock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dockRef = useRef(null);

  // Permite abrir desde el NavBar
  useEffect(() => {
    const onToggle = () => setIsOpen((v) => !v);
    const onOpen = () => setIsOpen(true);
    window.addEventListener("toggle-chat-dock", onToggle);
    window.addEventListener("open-chat-dock", onOpen);
    return () => {
      window.removeEventListener("toggle-chat-dock", onToggle);
      window.removeEventListener("open-chat-dock", onOpen);
    };
  }, []);

  return (
    <div ref={dockRef} className={`chat-dock ${isOpen ? "open" : "minimized"}`}>
      {/* Header (siempre visible) */}
      <div className="dock-header">
        <span className="dock-title">Mensajes</span>
        <div className="dock-actions">
          <ChatBubbleOutlineIcon className="dock-msg-icon" />
          <button className="icon-btn" onClick={() => setIsOpen((v) => !v)} aria-label="Expandir/Minimizar">
            <ExpandMoreIcon className={`chev ${isOpen ? "up" : ""}`} />
          </button>
          <button className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Contenido cuando está abierto */}
      {isOpen && (
        <div className="dock-body">
          <aside className="dock-sidebar">
            <ChatSidebar />
          </aside>
          <section className="dock-main">
            <ChatMain />
          </section>
        </div>
      )}
    </div>
  );
};

export default ChatDock;
