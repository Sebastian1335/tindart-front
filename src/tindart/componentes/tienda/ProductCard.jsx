"use client"

export const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image-wrapper">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <p className="product-price">PEN {product.price.toFixed(2)}</p>
        <p className="product-title">{product.title}</p>
      </div>
    </div>
  )
}
