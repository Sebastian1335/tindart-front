import { useState } from "react"
import { ProductCard } from "../../componentes/tienda/ProductCard"
import { PurchaseModal } from "../../componentes/tienda/PurchaseModal"
import { ProductDetailModal } from "../../componentes/tienda/ProductDetailModal"
import "./Tienda.css"

const PRODUCTS = [
  {
    id: 1,
    image: "/comision.png",
    price: 120.0,
    title: "Icon para perfil personalizado",
    description:
      "NO AI ALLOWED\n30 250x250px digital icono bases in CSP and PSD format.\nSupported for programs that can open CSP and PSD files.\nSimple understanding of the drawing software/layers is needed.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
    included: [
      "File in CSP and PSD format",
      "3 minute speedpaint of me using a base with visible layers",
      "Finished example emote in CSP and PSD format",
      "Written .",
      "Emotes",
      "Using the bases for emotes for yourself",
      "Using the bases to make emotes to then sell them on kofi/etsy/etc",
      "Using the bases for commissions",
      "Edit the base however you like feel free to delete my shading if you don't want it",
    ],
    notAllowed: [
      "Sharing the bases with other people",
      "Reselling the bases but edited",
      "Sharing the bases with other people, please buy multiple copies",
    ],
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
  {
    id: 8,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 9,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 10,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 11,
    image: "/comision.png",
    price: 120.0,
    title: "Icono de perfil",
    description:
      "Hermoso icono de perfil de estilo anime con tonos rosados y detalles mágicos. Perfecto para redes sociales y perfiles personalizados.",
    tags: ["anime", "rosa", "kawaii", "perfil"],
  },
  {
    id: 12,
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
  const [modalView, setModalView] = useState("detail")

  const openModal = (product) => {
    setSelectedProduct(product)
    setModalView("detail")
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  const proceedToPurchase = () => {
    setModalView("purchase")
  }

  return (
    <>
      <div className="tienda-container">
        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => openModal(product)}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="product-modal-overlay">
          {modalView === "detail" ? (
            <ProductDetailModal 
              product={selectedProduct} 
              onClose={closeModal}
              onStartOrder={proceedToPurchase}
            />
          ) : (
            <PurchaseModal
              product={selectedProduct}
              onClose={closeModal}
            />
          )}
        </div>
      )}
    </>
  )
}
