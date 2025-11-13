"use client"

import { useState } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CloseIcon from "@mui/icons-material/Close"
import "./Tienda.css"

const PRODUCTS = [
  {
    id: 1,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 2,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 3,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 4,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 5,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 6,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 7,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  
]

export const Tienda = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [likedProducts, setLikedProducts] = useState(new Set())

  const toggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newLikes = new Set(prev)
      if (newLikes.has(productId)) {
        newLikes.delete(productId)
      } else {
        newLikes.add(productId)
      }
      return newLikes
    })
  }

  return (
    <>
      <div className="tienda-container">
        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <div className="product-image-wrapper">
                <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(product.id)
                  }}
                  className="like-button"
                >
                  <FavoriteIcon className={likedProducts.has(product.id) ? "heart-icon active" : "heart-icon"} />
                </button>
              </div>
              <div className="product-info">
                <p className="product-price">PEN {product.price.toFixed(2)}</p>
                <p className="product-title">{product.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="product-modal-overlay">
          <div className="product-modal">
            <button onClick={() => setSelectedProduct(null)} className="close-button">
              <CloseIcon className="close-icon" />
            </button>

            <div className="modal-content">
              <h2 className="modal-title">{selectedProduct.title}</h2>

              <div className="modal-main">
                <div className="modal-image-container">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.title}
                    className="modal-image"
                  />
                </div>

                <div className="modal-sidebar">
                  <div className="modal-description">
                    <p>{selectedProduct.description}</p>
                  </div>

                  <div className="modal-tags-section">
                    <h3 className="tags-title">Tags</h3>
                    <div className="tags-container">
                      {selectedProduct.tags.map((tag) => (
                        <span key={tag} className="tag-button">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <div className="price-box">
                      <p className="price-label">Precio</p>
                      <p className="price-value">PEN {selectedProduct.price.toFixed(2)}</p>
                    </div>

                    <div className="action-buttons">
                      <button onClick={() => toggleLike(selectedProduct.id)} className="action-button like-action">
                        <FavoriteIcon
                          className={likedProducts.has(selectedProduct.id) ? "action-icon active" : "action-icon"}
                        />
                        Me gusta
                      </button>
                      <button className="action-button buy-action">
                        <ShoppingCartIcon className="action-icon" />
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
