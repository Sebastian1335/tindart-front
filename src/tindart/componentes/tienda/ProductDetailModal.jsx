"use client"

import CloseIcon from "@mui/icons-material/Close"

export const ProductDetailModal = ({ product, onClose, onStartOrder }) => {
  return (
    <div className="detail-modal">
      <button onClick={onClose} className="close-button">
        <CloseIcon className="close-icon" />
      </button>

      <div className="detail-content">
        <div className="detail-images">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="detail-image"
          />
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <div className="artist-header">
            <div className="artist-avatar">
              <img
                src="/icono.png"
                alt="Jgagaga"
                className="avatar-image"
              />
            </div>
            <span className="artist-name">gagag </span>
          </div>

          <h2 className="detail-title">{product.title}</h2>

          <div className="badge">NO AI ALLOWED</div>

          <div className="detail-description">
            <p>30 250x250px digital icono bases in CSP and PSD format.</p>
            <p>Supported for programs that can open CSP and PSD files.</p>
            <p>Simple understanding of the drawing software/layers is needed.</p>

            {product.included && (
              <>
                <h4>Included:</h4>
                <ul>
                  {product.included.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {product.notAllowed && (
              <>
                <h4>Not allowed:</h4>
                <ul>
                  {product.notAllowed.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            <p>
              Please remember to credit _Neapryo on twitter when using the
              bases!
            </p>
            <p>
              Thank you for purchasing! If you have any questions, feel free to
              contact me either on Etsy or Twitter and I will get back to you.
            </p>
          </div>

          <div className="detail-price">s/. {product.price.toFixed(2)}</div>

          <div className="detail-actions">
            <button className="detail-button primary" onClick={onStartOrder}>
              Empezar pedido
            </button>
            <button className="detail-button secondary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
