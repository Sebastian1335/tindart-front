import { ImageList, ImageListItem, Modal, Box } from "@mui/material"
import "./Feed.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  }
}

export const Feed = () => {
  const [open, setOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [postLiked, setPostLiked] = useState(false)
  const [postBookmarked, setPostBookmarked] = useState(false)
  const [commentLikes, setCommentLikes] = useState({})
  const [commentBookmarks, setCommentBookmarks] = useState({})

  const handleOpen = (post) => {
    setSelectedPost(post)
    setOpen(true)
    setPostLiked(false)
    setPostBookmarked(false)
    setCommentLikes({})
    setCommentBookmarks({})
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedPost(null)
  }

  const handleImageClick = (e) => {
    e.stopPropagation()
    setImageModalOpen(true)
  }

  const handleImageModalClose = () => {
    setImageModalOpen(false)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      console.log("New comment:", commentText)
      setCommentText("")
    }
  }

  const handlePostLike = () => {
    setPostLiked(!postLiked)
  }

  const handlePostBookmark = () => {
    setPostBookmarked(!postBookmarked)
  }

  const handleCommentLike = (index) => {
    setCommentLikes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleCommentBookmark = (index) => {
    setCommentBookmarks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <>
      {/* Lista de imágenes */}
      <ImageList
        sx={{
          width: "100%",
          height: "95%",
          overflowY: "auto",
          cursor: "pointer",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        variant="quilted"
        cols={6}
        rowHeight={250}
      >
        {itemData.map((item, index) => (
          <ImageListItem
            key={index}
            cols={item.cols || 1}
            rows={item.rows || 1}
            onClick={() => handleOpen(item)}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <img
              {...srcset(item.img, 500, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              style={{ borderRadius: "8px", padding: "4.5px" }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Modal de publicación completa */}
      <Modal open={open} onClose={handleClose}>
        <Box className="post-modal">
          <button className="close-button" onClick={handleClose}>
            <CloseIcon />
          </button>

          <div className="post-content">
            {/* Título */}
            <h1 className="post-title">{selectedPost?.title}</h1>

            <div className="post-main">
              {/* Imagen principal */}
              <div className="post-image-container">
                <img
                  src={selectedPost?.img || "/placeholder.svg"}
                  alt={selectedPost?.title}
                  className="post-image"
                  onClick={handleImageClick}
                  style={{ cursor: "pointer", borderRadius: "8px", padding: "4.5px" }}
                />
              </div>

              {/* Sidebar derecho */}
              <div className="post-sidebar">
                <p className="post-description">{selectedPost?.description}</p>

                {/* Tags */}
                <div className="tags-section">
                  <h3 className="tags-title">Tags</h3>
                  <div className="tags-container">
                    {selectedPost?.tags?.map((tag, index) => (
                      <button key={index} className="tag-button">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="post-actions">
                  <button className={`action-button ${postLiked ? "active" : ""}`} onClick={handlePostLike}>
                    <FavoriteIcon />
                  </button>
                  <button className="action-button">
                    <RepeatIcon />
                  </button>
                  <button className={`action-button ${postBookmarked ? "active" : ""}`} onClick={handlePostBookmark}>
                    <BookmarkIcon />
                  </button>
                  <button className="action-button">
                    <ShareIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Sección de comentarios */}
            <div className="comments-section">
              <h2 className="comments-title">Comentarios</h2>

              <form className="comment-input-form" onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Escribe un comentario..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="comment-submit-button">
                  <SendIcon />
                </button>
              </form>

              <div className="comments-list">
                {selectedPost?.comments?.map((comment, index) => (
                  <div key={index} className="comment-card">
                    <div className="comment-header">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.username}
                        className="comment-avatar"
                      />
                      <span className="comment-username">{comment.username}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                      <button
                        className={`comment-action-button ${commentLikes[index] ? "active" : ""}`}
                        onClick={() => handleCommentLike(index)}
                      >
                        <FavoriteIcon />
                      </button>
                      <button className="comment-action-button">
                        <RepeatIcon />
                      </button>
                      <button
                        className={`comment-action-button ${commentBookmarks[index] ? "active" : ""}`}
                        onClick={() => handleCommentBookmark(index)}
                      >
                        <BookmarkIcon />
                      </button>
                      <button className="comment-action-button">
                        <ShareIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* modal de imagen solo */}
      <Modal open={imageModalOpen} onClose={handleImageModalClose}>
        <Box className="image-modal">
          <button className="close-button" onClick={handleImageModalClose}>
            <CloseIcon />
          </button>
          <img
            src={selectedPost?.img || "/placeholder.svg"}
            alt={selectedPost?.title}
            className="image-modal-img"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Modal>
    </>
  )
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1019",
    title: "El baje de pepa que me desperto del sueño",
    description:
      "Yo tengo un caballo verde, que hace piruetas se sabe lavar los dientes, va en bicicleta tiene un rayón en la barriga, de andar echado y cuando lo lleva él no se mete en el agua y sale colorado cuando le lleno el no se mete en el agua y sale colorado",
    tags: ["Baje de pepa", "Baje de pepa", "Baje de pepa", "Baje de pepa", "Baje de pepa", "Baje de pepa"],
    comments: [
      {
        username: "FloppaLoopie",
        avatar: "https://i.pravatar.cc/150?img=1",
        text: "Que inspirador broer",
      },
      {
        username: "FloppaLoopie",
        avatar: "https://i.pravatar.cc/150?img=1",
        text: "Que inspirador broer",
      },
      {
        username: "FloppaLoopie",
        avatar: "https://i.pravatar.cc/150?img=1",
        text: "Que inspirador broer",
      },
    ],
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=748https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    description: "Una deliciosa hamburguesa gourmet con ingredientes frescos.",
    tags: ["Comida", "Gourmet"],
    comments: [
      {
        username: "FoodLover",
        avatar: "https://i.pravatar.cc/150?img=2",
        text: "Se ve delicioso!",
      },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1580136579585-48a5311ee2f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1104",
    title: "Camera",
    description: "Fotografía profesional con equipos de alta calidad.",
    tags: ["Fotografía", "Arte"],
    comments: [],
  },
  {
    img: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=755",
    title: "Coffee",
    description: "El mejor café artesanal de la ciudad.",
    tags: ["Café", "Bebidas"],
    comments: [],
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=690",
    title: "Hats",
    description: "Colección de sombreros vintage y modernos.",
    tags: ["Moda", "Accesorios"],
    comments: [],
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1579783902915-f0b0de2c2eb3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    title: "Honey",
    description: "Miel orgánica directamente de la colmena.",
    tags: ["Natural", "Orgánico"],
    comments: [],
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1515096788709-a3cf4ce0a4a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1058",
    title: "Basketball",
    description: "Deporte y pasión en cada jugada.",
    tags: ["Deportes", "Basketball"],
    comments: [],
  },
  {
    img: "https://plus.unsplash.com/premium_vector-1741788653302-b6883564bd02?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1051",
    title: "Fern",
    description: "La belleza de la naturaleza en cada hoja.",
    tags: ["Naturaleza", "Plantas"],
    comments: [],
  },
  {
    img: "https://plus.unsplash.com/premium_vector-1741095141020-f1732f8fed0f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1246",
    title: "Mushrooms",
    description: "Hongos silvestres en su hábitat natural.",
    tags: ["Naturaleza", "Hongos"],
    comments: [],
    rows: 2,
    cols: 2,
  },
  {
    img: "https://plus.unsplash.com/premium_vector-1714402562965-8126e4c4df8a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    title: "Tomato basil",
    description: "Ingredientes frescos para la cocina italiana.",
    tags: ["Comida", "Italiano"],
    comments: [],
  },
  {
    img: "https://plus.unsplash.com/premium_vector-1714402562950-f62d0d7ae83e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    title: "Sea star",
    description: "Vida marina en todo su esplendor.",
    tags: ["Mar", "Naturaleza"],
    comments: [],
  },
  {
    img: "https://plus.unsplash.com/premium_vector-1724266677450-55f3df77b34b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=708",
    title: "Bike",
    description: "Ciclismo urbano y aventura.",
    tags: ["Deportes", "Ciclismo"],
    comments: [],
    cols: 2,
  },
]
