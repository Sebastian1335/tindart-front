import { useEffect, useState } from "react";

import "./WhiteboardList.css";
import { CreateWhiteboard } from "../../componentes/createWhiteboard/CreateWhiteboard";
import { useWhiteboardStore } from "../../store/whiteBoardStore";
import { useNavigate } from "react-router";

export const WhiteboardList = () => {
    const [open, setOpen] = useState(false);
    const whiteboards = useWhiteboardStore((state) => state.whiteboardList);
    const fetchWhiteBoardList = useWhiteboardStore((state) => state.fetchWhiteBoardList)
    const selectWhiteBoard = useWhiteboardStore((state) => state.selectWhiteBoard)

    const navigate = useNavigate();

    useEffect(() => {
      fetchWhiteBoardList()
    }, [open])
    
    
    const handleOpen = (e) => {
        e.currentTarget.blur(); // 👈 1️⃣ Quita el foco del botón antes de abrir el modal
        setOpen(true);
    };
    
    const onClickCard = (w) => {
        selectWhiteBoard(w)
        navigate("/feed/whiteboard")
    }

    return (
        <div className="whiteboard-page">
            <div className="whiteboard-header">
                <h2>Mis Whiteboards</h2>
                <button className="create-btn" onClick={handleOpen}>
                    + Crear Whiteboard
                </button>
            </div>

            <div className="whiteboard-grid">
                {whiteboards.map((w) => (
                    <div key={w.id} className="whiteboard-card" onClick={() => onClickCard(w)}>
                        <div className="whiteboard-thumbnail" />
                        <p className="whiteboard-name">{w.title}</p>
                        <p className="whiteboard-desc">{w.description}</p>
                    </div>
                ))}
            </div>

            <CreateWhiteboard open={open} setOpen={setOpen} />
            {/* Modal */}
        </div>
    );
};
