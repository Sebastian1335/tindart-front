import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchToggleLikeComment } from "../../api/postRequiest";
import { useFeed } from "../../store/feedStore";

export const Comment = ({ comment, index, onClickAuthorProfile}) => {
    const toggleLikeComment = useFeed((state) => state.toggleLikeComment)
    return (
        <div key={index} className="comment-card">
            <div className="comment-header">
                <img
                    src={ "/icono.png"}
                    alt={comment.authorName}
                    className="comment-avatar"
                    onClick={onClickAuthorProfile}
                />
                <span className="comment-username">{comment.authorName}</span>
            </div>
            <p className="comment-text">{comment.content}</p>
            <div className="comment-actions">
                <button
                    className={`comment-action-button ${
                        comment.liked ? "active" : ""
                    }`}
                    onClick={() => {
                        fetchToggleLikeComment(comment.id);
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
