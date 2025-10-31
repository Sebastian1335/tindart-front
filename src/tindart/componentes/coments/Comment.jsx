import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchToggleLikeComment } from "../../api/postrequiest";
import { useFeed } from "../../store/feedStore";

export const Comment = ({ comment, index, token }) => {
    const toggleLikeComment = useFeed((state) => state.toggleLikeComment)
    return (
        <div key={index} className="comment-card">
            <div className="comment-header">
                <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.username}
                    className="comment-avatar"
                />
                <span className="comment-username">{comment.username}</span>
            </div>
            <p className="comment-text">{comment.content}</p>
            <div className="comment-actions">
                <button
                    className={`comment-action-button ${
                        comment.liked ? "active" : ""
                    }`}
                    onClick={() => {
                        fetchToggleLikeComment(token, comment.id);
                        toggleLikeComment(index);
                    }}
                >
                    <FavoriteIcon />
                    <span>{comment.countlikes}</span>
                </button>
            </div>
        </div>
    );
};
