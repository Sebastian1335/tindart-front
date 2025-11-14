import React, { useEffect, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";
import "./ChatDock.css";

export default function ChatDock() {
  const [mode, setMode] = useState("min");  
  const [active, setActive] = useState(null); 
  useEffect(() => {
    const onOpen = () => setMode("list");
    const onToggle = () => setMode((m) => (m === "min" ? "list" : "min"));
    window.addEventListener("open-chat-dock", onOpen);
    window.addEventListener("toggle-chat-dock", onToggle);
    return () => {
      window.removeEventListener("open-chat-dock", onOpen);
      window.removeEventListener("toggle-chat-dock", onToggle);
    };
  }, []);

  const title = mode === "chat" && active?.name ? active.name : "Mensajes";
  const initial = (active?.name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className={`chat-dock ${mode === "min" ? "minimized" : mode === "list" ? "list" : "convo"}`}>
      <div className="dock-header">
        <div className="dock-left">
          {mode === "chat" && (
            <button className="icon-btn" aria-label="Volver" onClick={() => setMode("list")} type="button">
              <ArrowBackIosNewIcon fontSize="small" />
            </button>
          )}

          {mode === "chat" && (
            <div className="dock-peer">
              {active?.avatar ? (
                <img src={active.avatar} alt={active.name} />
              ) : (
                <span className="dock-peer-initial">{initial}</span>
              )}
            </div>
          )}

          <span className="dock-title">{title}</span>
        </div>

        <div className="dock-actions">
          <ChatBubbleOutlineIcon className="dock-msg-icon" />
          <button
            className="icon-btn"
            aria-label={mode === "min" ? "Expandir" : "Minimizar"}
            onClick={() => setMode((m) => (m === "min" ? "list" : "min"))}
            type="button"
          >
            <ExpandMoreIcon className={`chev ${mode !== "min" ? "up" : ""}`} />
          </button>
          {/* Botón de cerrar eliminado */}
        </div>
      </div>

      {mode === "list" && (
        <div className="dock-body only-list">
          <ChatSidebar
            hideHeader
            onSelect={(item) => {
              setActive(item);
              setMode("chat");
            }}
          />
        </div>
      )}

      {mode === "chat" && (
        <div className="dock-body only-chat">
          <ChatMain hideHeader />
        </div>
      )}
    </div>
  );
}
