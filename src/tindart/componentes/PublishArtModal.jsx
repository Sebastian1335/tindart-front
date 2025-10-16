import { useState } from "react"
import { Modal, Box, IconButton } from "@mui/material"
import "./PublishArtModal.css"
import CloseIcon from "@mui/icons-material/Close"
import UploadIcon from "@mui/icons-material/Upload"
import DeleteIcon from "@mui/icons-material/Delete"

const PublishArtModal = ({ open, onClose }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => { setImage(null); setImagePreview(null) }

  const handlePublish = () => {
    console.log("Publishing:", { title, description, tags, image })
    onClose()
    setTitle(""); setDescription(""); setTags(""); setImage(null); setImagePreview(null)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="publish-modal-container">
        <div className="publish-modal-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="publish-modal-title">Publicar Arte</h2>
            <IconButton onClick={onClose} aria-label="Cerrar">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="publish-form-group">
            <label className="publish-label">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingresa el título de tu obra"
              className="publish-input"
            />
          </div>

          <div className="publish-form-group">
            <label className="publish-label">Media</label>
            <div
              className={`publish-upload-area ${isDragging ? "dragging" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="uploaded-image-container">
                  <img src={imagePreview} alt="Preview" className="uploaded-image-preview" />
                  <IconButton onClick={handleDeleteImage} className="delete-image-btn" aria-label="Eliminar imagen">
                    <DeleteIcon />
                  </IconButton>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  <UploadIcon />
                  <p className="upload-text">
                    Jala y suelta
                    <br />o presiona el botón
                  </p>
                </label>
              )}
            </div>
          </div>

          <div className="publish-form-group">
            <label className="publish-label">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu obra de arte"
              className="publish-textarea"
              rows={4}
            />
          </div>

          <div className="publish-form-group">
            <label className="publish-label">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ej: abstracto, colorido, moderno"
              className="publish-input"
            />
          </div>

          <button onClick={handlePublish} className="publish-submit-btn">
            Publicar
          </button>
        </div>
      </Box>
    </Modal>
  )
}

export default PublishArtModal
