"use client"

import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { PriceBreakdown } from "./PriceBreakdown"

export const PurchaseModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: 1,
    additionalInfo: "",
  })

  const handlePayment = () => {
    console.log("Processing payment with data ga:", formData)
    // aqui va la logica
  }

  return (
    <div className="purchase-modal">
      <button onClick={onClose} className="close-button">
        <CloseIcon className="close-icon" />
      </button>

      <div className="purchase-content">
        <div className="purchase-images">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="purchase-image"
          />
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="purchase-image"
          />
        </div>

        <div className="purchase-form">
          <h2 className="purchase-title">Comprar Ahora</h2>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Tu nombre*
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo de contacto*
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              className="form-input"
              min="1"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value) || 1,
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Imágenes referenciales</label>
            <button className="upload-button">Subir referencias</button>
          </div>

          <div className="form-group">
            <label htmlFor="info" className="form-label">
              Información adicional
            </label>
            <textarea
              id="info"
              className="form-textarea"
              rows="3"
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  additionalInfo: e.target.value,
                })
              }
            />
          </div>

          <PriceBreakdown basePrice={product.price} quantity={formData.quantity} />

          <button className="pay-button" onClick={handlePayment}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  )
}
