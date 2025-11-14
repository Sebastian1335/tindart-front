import React, { useEffect, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";
import "./ChatDock.css";

/**
 * Modos de visualización:
 *  - "min"  : barra pequeña (minimizado)
 *  - "list" : lista de conversaciones
 *  - "chat" : conversación activa
 *
 * NOTA: No modifica la pantalla de chat principal. Solo usa ChatSidebar/ChatMain
 * con hideHeader para que no dupliquen encabezados dentro del dock.
 */
export default function ChatDock() {
  const [mode, setMode] = useState("min"); 
  const [active, setActive] = useState(null); 

  // Permitir abrir/minimizar desde cualquier parte (NavBar)
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

  return (
    <div
      className={`chat-dock ${
        mode === "min" ? "minimized" : mode === "list" ? "list" : "convo"
      }`}
    >
      {/* Header del dock (único header visible) */}
      <div className="dock-header">
        <div className="dock-left">
          {mode === "chat" && (
            <button
              className="icon-btn"
              aria-label="Volver"
              onClick={() => setMode("list")}
              type="button"
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </button>
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
          <button
            className="icon-btn"
            aria-label="Cerrar"
            onClick={() => setMode("min")}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Vista LISTA (solo ChatSidebar) */}
      {mode === "list" && (
        <div className="dock-body only-list">
          <ChatSidebar
            hideHeader
            onSelect={(item) => {
              // item puede traer más campos según lo conectes a tu store
              setActive(item);
              setMode("chat");
            }}
          />
        </div>
      )}

      {/* Vista CONVERSACIÓN (solo ChatMain) */}
      {mode === "chat" && (
        <div className="dock-body only-chat">
          <ChatMain hideHeader />
        </div>
      )}
    </div>
  );
}
