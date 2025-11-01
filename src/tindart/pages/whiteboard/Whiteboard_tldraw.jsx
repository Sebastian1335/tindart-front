// import { Tldraw } from 'tldraw'
// import 'tldraw/tldraw.css'
// import './Whiteboard.css'
// import { useWhiteboardStore } from '../../store/whiteBoardStore';
// import { useEffect, useRef } from 'react';

// export const Whiteboard = () => {
//   const { saveWhiteBoard, selectedWhiteBoard, getSnapshot } = useWhiteboardStore()
//   const editorRef = useRef(null)
//   const handleMount = (editor) => {
//     editorRef.current = editor
//     getSnapshot(selectedWhiteBoard.id)
//   }
//   useEffect(() => {
//     const editor = editorRef.current
//     console.log(selectedWhiteBoard)
//     if (editor && !!selectedWhiteBoard?.snapshot.schema){
//       try {
//         editor.store.loadStoreSnapshot(selectedWhiteBoard.snapshot)
//       } catch (error) {
//         console.error('❌ Error al cargar snapshot:', error)
//       }
//     }
//   }, [selectedWhiteBoard?.snapshot])

//   const handleSave = async () => {
//     const editor = editorRef.current
//     if (!editor) return

//     const snapshot = editor.store.getStoreSnapshot()
//     await saveWhiteBoard({...selectedWhiteBoard, snapshot})
//     alert('Whiteboard guardado ✅')
//   }


//   return (
//     <div className="whiteboard-container">
//       <h1 className="watermark">Made with TLDRAW</h1>
//       <h1 className="whiteboard-title">{selectedWhiteBoard.title}</h1>
      
//       <div className="tldraw-wrapper">
//         <Tldraw 
//           onMount={handleMount}
//         />
//       </div>
//       <button className="save-button" onClick={handleSave}>
//         💾 Guardar
//       </button>
//     </div>
//   )
// }