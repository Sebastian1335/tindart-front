import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import "./Whiteboard.css";
import { useWhiteboardStore } from "../../store/whiteBoardStore";
import { useEffect, useRef } from "react";

export const Whiteboard = () => {
  const { saveWhiteBoard, selectedWhiteBoard, getSnapshot } = useWhiteboardStore();
  const excalidrawApiRef = useRef(null);

  useEffect(() => {
    if (selectedWhiteBoard?.id) {
      getSnapshot(selectedWhiteBoard.id);
    }
  }, [selectedWhiteBoard?.id]);

  useEffect(() => {
    if (
      selectedWhiteBoard?.snapshot &&
      excalidrawApiRef.current
    ) {
      try {
        const data = selectedWhiteBoard.snapshot;

        const safeAppState = {
          ...data.appState,
          collaborators: new Map(),
        };

        const normalizedData = {
          elements: data.elements || [],
          appState: safeAppState,
          files: data.files || {},
        };

        excalidrawApiRef.current.updateScene(normalizedData);
      } catch (error) {
        console.error("❌ Error al cargar snapshot:", error);
      }
    }
  }, [selectedWhiteBoard?.snapshot]);

  const handleSave = async () => {
    const api = excalidrawApiRef.current;
    if (!api) {
      console.warn("❗ API de Excalidraw no está lista aún.");
      return;
    }

    const elements = api.getSceneElements();
    const appState = api.getAppState();
    const files = api.getFiles();

    const cleanAppState = { ...appState, collaborators: {} };

    const snapshot = { elements, appState: cleanAppState, files };
    await saveWhiteBoard({ ...selectedWhiteBoard, snapshot });
    alert("Whiteboard guardado ✅");
  };

  return (
    <div className="whiteboard-container">
      <h1 className="watermark">Made with Excalidraw</h1>
      <h1 className="whiteboard-title">{selectedWhiteBoard?.title || "Sin título"}</h1>

      <div className="tldraw-wrapper">
        <Excalidraw
          theme="light"
          excalidrawAPI={(api) => (excalidrawApiRef.current = api)}
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        💾 Guardar
      </button>
    </div>
  );
};
