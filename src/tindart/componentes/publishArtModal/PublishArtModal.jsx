import { useEffect, useState } from "react"
import { Modal, Box, IconButton } from "@mui/material"
import "./PublishArtModal.css"
import CloseIcon from "@mui/icons-material/Close"
import UploadIcon from "@mui/icons-material/Upload"
import DeleteIcon from "@mui/icons-material/Delete"
import { useForm } from "../../../hooks/useForm"
import { publishArt } from "../../store/feedStore"
import { useAuthStore } from "../../../Auth/store/authStore"

const initialForm = {
  title: "",
  file: null,
  description: "",
  tags: ""
}


const PublishArtModal = ({ open, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const {form, onInputChange, setForm} = useForm(initialForm)

  const publishPost = publishArt((state) => state.publishPost)
  useEffect(() => {
    if (!form.file) return // 👈 evita errores si no hay archivo

    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(form.file)

    return () => reader.abort()
    
  }, [form])

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setForm({...form, file: file})
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setForm({...form, file: null}) 
    setImagePreview(null) 
  }

  const handlePublish = () => {
    const formattedTags = JSON.stringify(
      String(form.tags).trim().split(",").map(tag => tag.trim())
    )

    const updatedForm = { ...form, tags: formattedTags }

    const data = new FormData()
    Object.entries(updatedForm).forEach(([key, value]) => {
      data.append(key, value)
    })

    publishPost(data)

    onClose()
    setForm(initialForm)
    setImagePreview(null)
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
              value={form.title}
              name="title"
              onChange={onInputChange}
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
                  <input type="file" accept="image/*" name="file" onChange={onInputChange} style={{ display: "none" }} />
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
              value={form.description}
              name="description"
              onChange={onInputChange}
              placeholder="Describe tu obra de arte"
              className="publish-textarea"
              rows={4}
            />
          </div>

          <div className="publish-form-group">
            <label className="publish-label">Tags</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={onInputChange}
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
