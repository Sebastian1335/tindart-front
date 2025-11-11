import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Modal, Box } from "@mui/material";
import { postComment, useFeed } from "../../store/feedStore";
import { ImageModal } from "../image/ImageModal";
import { Comment } from "../coments/Comment";
import { useEffect } from "react";
import { useAuthStore } from "../../../Auth/store/authStore";
import { useForm } from "../../../hooks/useForm";
import { fetchToggleLike, fetchToggleSave, fetchToggleShare } from "../../api/postRequiest";

const initialValues = {
    content: ""
}

export const DetailModal = () => {
    const {form, onInputChange, setForm} = useForm(initialValues);


    const diselectPost = useFeed((state) => state.diselectPost);
    const image = useFeed((state) => state.image);
    const seeImage = useFeed((state) => state.seeImage);
    const selectedPost = useFeed((state) => state.selectedPost);
    const selectPost = useFeed((state) => state.selectPost);
    const postDetails =  useFeed((state) => state.postDetails)
    const toggleLike = useFeed((state) => state.toggleLike)
    const toggleSave = useFeed((state) => state.toggleSave)
    const toggleShare = useFeed((state) => state.toggleShare)

    const token = useAuthStore((state) => state.token)
    const publishComment = postComment((state) => (state.publishComment))
    const pushComment = useFeed((state) => state.pushComment)
    


    useEffect(() => {
        postDetails(selectedPost.id)
    }, [])
    
    const onClickComment = async (e) => {
        e.preventDefault();
        const data = new FormData()
        Object.entries(form).forEach(([key, value]) => {
            data.append(key, value)
        })
        const res = await publishComment(data, selectedPost.id)
        pushComment(res)
        setForm(initialValues)
    }

    return (
        <>
            <Modal open={!!selectPost} onClose={diselectPost}>
                <Box className="post-modal">
                    <button className="close-button" onClick={diselectPost}>
                        <CloseIcon />
                    </button>

                    <div className="post-content">
                        <h1 className="post-title">{selectedPost?.title}</h1>

                        <div className="post-main">
                            <div className="post-image-container">
                                <img
                                    src={
                                        selectedPost?.image || "/placeholder.svg"
                                    }
                                    alt={selectedPost?.title}
                                    className="post-image"
                                    onClick={seeImage}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        padding: "4.5px",
                                    }}
                                />
                            </div>

                            <div className="post-sidebar">
                                <p className="post-description">
                                    {selectedPost?.description}
                                </p>

                                <div className="tags-section">
                                    <h3 className="tags-title">Tags</h3>
                                    <div className="tags-container">
                                        {selectedPost?.tags?.map(
                                            (tag, index) => (
                                                <button
                                                    key={index}
                                                    className="tag-button"
                                                >
                                                    {tag}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="post-actions">
                                    <button
                                        className={`action-button ${
                                            selectedPost?.postDetails?.likedByUser ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            fetchToggleLike(selectedPost.id)
                                            toggleLike()
                                        }}
                                    >
                                        <FavoriteIcon />
                                        <span>{selectedPost?.postDetails?.count?.LikePost}</span>
                                    </button>
                                    <button 
                                        className={`action-button ${
                                            selectedPost?.postDetails?.sharedByUser ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            fetchToggleShare(selectedPost.id)
                                            toggleShare()
                                        }}
                                    >
                                        <RepeatIcon />
                                        <span>{selectedPost?.postDetails?.count?.SharePost}</span>
                                    </button>
                                    <button
                                        className={`action-button ${
                                            selectedPost?.postDetails?.savedByUser ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            fetchToggleSave(selectedPost.id)
                                            toggleSave()
                                        }}
                                    >
                                        <BookmarkIcon />
                                        <span>{selectedPost?.postDetails?.count?.SavePost}</span>
                                    </button>
                                    <button className="action-button">
                                        <ShareIcon />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="comments-section">
                            <h2 className="comments-title">Comentarios</h2>

                            <form className="comment-input-form">
                                <input
                                    name="content"
                                    type="text"
                                    onChange={onInputChange}
                                    className="comment-input"
                                    placeholder="Escribe un comentario..."
                                />
                                <button
                                    type="submit"
                                    className="comment-submit-button"
                                    onClick={onClickComment}
                                >
                                    <SendIcon />
                                </button>
                            </form>

                            <div className="comments-list">
                                {selectedPost?.comments?.map(
                                    (comment, index) => (
                                        <Comment comment={comment} index={index} key={index}/>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            {image !== false && (
                <ImageModal/>
            )}
        </>
    );
};
